import { gql } from "graphql-request";

export default gql`
  query GetProductById($ids: [ID!]) {
    products(where: { id_in: $ids }) {
        id
        name
        price
        slug 
    }
  }
`;