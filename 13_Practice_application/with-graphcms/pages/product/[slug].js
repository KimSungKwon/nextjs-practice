import { Box, Flex, Grid, Text, Image, Divider, Button, Select } from "@chakra-ui/react";
import graphql from "@/lib/graphql";
import getAllProducts from "@/lib/graphql/queries/getAllProducts";
import getProductDetail from "@/lib/graphql/queries/getProductDetail";

// 모든 product를 불러와서 페이지 다 만듬
export async function getStaticPaths() {
    const { products } = await graphql.request(getAllProducts);

    const paths = products.map((product) => ({
        params: {
            slug: product.slug,
        },
    }));

    return {
        paths,
        fallback: false, // 빌드 시점에 생성되지 않은 경로에 접근 시 404
    };
}

// slug에 맞는 product 정보를 가져옴
export async function getStaticProps({ params }) {
    const { products } = await graphql.request(getProductDetail, {
        slug: params.slug,
    });

    return {
        props: {
            product: products[0],
        },
    };
}

function SelectQuantity(props) {
    const quantity = [...Array.from({ length: 10 })];
    return (
        <Select placeholder="Quantity">
            {quantity.map((_, i) => (
                <option key={i + 1} value={i + 1}>
                    {i + 1}
                </option>
            ))}
        </Select>
    );
}

export default function ProductPage(props) { // == ProductPage({ product }) {}
    return (
        <Flex rounded="xl" boxShadow="2xl" w="full" p="16" bgColor="white">
            <Image height="96" width="96" src={props.product.images[0].url} />
            <Box ml="12" width="container.xs">
                <Text as="h1" fontSize="4xl" fontWeight="bold">
                    {props.product.name}
                </Text>
                <Text lineHeight="none" fontSize="xl" my="3" fontWeight="bold" textColor="blue.500">
                    ${props.product.price / 100}
                </Text>
                <Text maxW="96" textAlign="justify" fontSize="sm">
                    {props.product.description}
                </Text>
                <Divider my="6" />
                <Grid gridTemplateColumns="2fr 1fr" gap="5" alignItems="center">
                    <SelectQuantity onChange={() => {}} />
                    <Button colorScheme="blue">
                        Add to cart
                    </Button>
                </Grid>
            </Box>
        </Flex>
    )
}