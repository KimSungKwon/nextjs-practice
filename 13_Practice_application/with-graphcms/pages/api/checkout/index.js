import Stripe from "stripe";
import getProductDetailsById from "@/lib/graphql/queries/getProductDetailsById";
import graphql from "@/lib/graphql";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    // 장바구니의 모든 제품들을 가져옴
    const { items } = req.body;
    // 장바구니 모든 제품들의 제품 관련 정보들을 가져옴
    const { products } = await graphql.request(getProductDetailsById, {
        ids: Object.keys(items)
    });

    // Stripe는 line_items라는 속성을 갖는 설정 객체를 필요로 함. 구매할 모든 제품의 정보가 포함됨
    const line_items = products.map((product) => ({
        // 사용자가 결제 과정에서 수량을 변경할 수 있게
        adjustable_quantity: {
            enabled: true,
            minimum: 1,
        },
        // 원하는 화폐 단위 지정
        price_data: {
            currency: 'EUR',
            product_data: {
                name: product.name,
                images: product.images.map((img) => img.url),
            },
            // $4.99 => stripe에 499 라고 알려줌
            unit_amount: product.price,
        },
        quantity: items[product.id],
    }))

    // line_items를 써서 Stripe 결제 세션을 요청
    const session = await stripe.checkout.sessions.create({
        mode: 'payment', // subscription 또는 setup을 지정가능
        line_items,
        payment_method_types: ['card', 'sepa_debit'],
        shipping_address_collection,
        shipping_options,
        // 서버가 현재 URL을 모르기 때매 현재 환경에 따라 환경변수에 URL을 지정해야함
        // 로컬일 시 http://localhost:3000
        success_url: `${process.env.URL}/success`,
        cancel_url: `${process.env.URL}/cancel`,
    });
    
    res.status(201).json({ session });
}

export const shipping_address_collection = {
    allowed_countries: ['IT', 'US'],  // 전세계 배송가능하면 이 속성 안 넣음 
};

// 배송 옵션 [공짜로 늦게받기, 돈내고 빨리받기]
export const shipping_options = [
    {
        shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
                amount: 0,
                currency: 'EUR',
            },
            display_name: 'Free Shipping',
            delivery_estimate: {
                minimum: {
                    unit: 'business_day',
                    value: 5,
                },
                maximum: {
                    unit: 'business_day',
                    value: 5,
                },
            },
        },
        shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
                amount: 499,
                currency: 'EUR',
            },
            display_name: 'Next day air',
            delivery_estimate: {
                minimum: {
                    unit: 'business_day',
                    value: 1,
                },
                maximum: {
                    unit: 'business_day',
                    value: 1,
                },
            },
        },
    },
    {

    }
]