import { gql } from "apollo-server-express"
import { mergeTypes } from "merge-graphql-schemas"

import SA_TypeDefs from "./SA/SA_TypeDefs"

export default gql`
  ${mergeTypes([SA_TypeDefs])}
`
