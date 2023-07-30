import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
query GET_PRODUCTS {
    getAllProducts {
      id
      name
      mainImg
      price
      Category {
        id
        name
      }
    }
  }
  
`;

export const GET_PRODUCT_DETAIL = gql`
query Query($getProductByIdId: ID!) {
    getProductById(id: $getProductByIdId) {
      id
      mainImg
      name
      description
      price
      Category {
        id
        name
      }
      Images {
        id
        imgUrl
      },
    }
  }
`

export const GET_CATEGORY = gql`
query Query {
  getAllCategories {
    id
    name
    image
  }
}
`
