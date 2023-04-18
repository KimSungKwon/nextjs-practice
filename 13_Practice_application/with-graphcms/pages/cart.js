import { useContext, useEffect, useState } from "react";
import { Box, Divider, Text, Flex, Button } from "@chakra-ui/react";
import CartContext from "@/lib/context/Cart";
import getProductById from "@/lib/graphql/queries/getProductById";
import graphql from "@/lib/graphql";
import Link from "next/link";
import loadStripe from '../lib/stripe';

export default function Cart() {
    const { items } = useContext(CartContext);
    const [products, setProducts] = useState([]); // 장바구니에 있는 아이템들을 할당받음
    const hasProducts = Object.keys(items).length

    useEffect(() => {
        // 장바구니가 비어있으면 안함
        if (!hasProducts) return;

        // 장바구니에 있는 아이템들을 ID로 불러옴
        graphql.request(getProductById, {
            ids: Object.keys(items),
        })
            // 불러온 아이템들을 products에 할당
            .then((data) => {
                setProducts(data.products)
            })
            .catch((err) => console.error(err));
    }, [JSON.stringify(products)]);

    async function handlePayment() {
        const stripe = await loadStripe();
        const res = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items,
            }),
        });

        const { session } = await res.json();
        await stripe.redirectToCheckout({
            sessionId: session.id,
        });
    };

    // 장바구니에 담은 제품들의 최종 가격 계산
    function getTotal() {
        if (!products.length) return 0;

        // 장바구니의 아이템들을 불러옴
        return Object.keys(items)
            // 
            .map((id) => 
                products.find((product) => product.id === id).price * (items[id] / 100)
            )
            .reduce((x, y) => x + y)
            .toFixed(2);
    }

    return (
        <Box rounded="xl" boxShadow="2xl" w="container.lg" p="16" bgColor="white">
            <Text as="h1" fontSize="2xl" fontWeight="bold">
                Cart
            </Text>
            <Divider my="10" />
            <Box>
                {!hasProducts ? (
                    <Text>The cart is empty.</Text>
                ) : (
                    <>
                        {products.map((product) => (
                            <Flex key={product.id} justifyContent="space-between" mb="4">
                                <Box>
                                    <Link href={`/product/${product.slug}`} passHref>
                                        <Text 
                                            fontWeight="bold" 
                                            _hover={{ textDecoration: 'underline', color: 'blue.500' }}>
                                            {product.name}
                                        </Text>
                                        <Text as="span" color="gray.500">
                                            {''}x{items[product.id]}
                                        </Text>
                                    </Link>
                                </Box>
                                <Box>
                                    ${(items[product.id] * (product.price / 100)).toFixed(2)}
                                </Box>
                            </Flex>
                        ))}
                        <Divider my="10" />
                        <Flex alignItems="center" justifyContent="space-between">
                            <Text fontSize="xl" fontWeight="bold">
                                Total: ${getTotal()}
                            </Text>
                            <Button colorScheme="blue" onClick={handlePayment}>Pay now</Button>
                        </Flex>
                    </>
                )}
            </Box>
        </Box>
    );
}