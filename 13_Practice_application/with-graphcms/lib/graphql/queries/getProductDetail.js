import { gql } from "graphql-request";

// 제품의 slug값이 $slug와 일치하는 모든 제품 정보를 가져옴
export default gql`
    query GetProductBySlug($slug:String!){
        products(where: { slug: $slug }) {
            id
            images(first: 1) {
                id
                url
            }
            name
            price
            slug
            description
        }
    }
`;