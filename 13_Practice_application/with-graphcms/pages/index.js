import { Grid } from '@chakra-ui/layout';
import ProductCard from "@/components/ProductCard";
import graphql from "@/lib/graphql";
import getAllProducts from "@/lib/graphql/queries/getAllProducts";

export const getStaticProps = async () => {
  const { products } = await graphql.request(getAllProducts)

  return {
    props: {
      revalidate: 60, // 증분 정적 재생성 방식. 60초마다
      products,
    },
  }
}

export default function Home(props) {
  return (
    <Grid gridTemplateColumns="repeat(4, 1fr)" gap="5">
      {props.products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </Grid>
  )
}
