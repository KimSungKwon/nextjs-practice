import { loadStripe } from "@stripe/stripe-js";

const key = process.env.NEXT_PUBLIC_STRIPE_SHARABLE_KEY;

let stripePromise;

const getStripe = () => {
    // 장바구니 페이지를 여러 번 방문해도 Stripe를 딱 한번만 불러옴
    if (!stripePromise) {
        stripePromise = loadStripe(key);
    }
    return stripePromise;
}

export default getStripe;