import { gql } from "apollo-server-express"
import { mergeTypes } from "merge-graphql-schemas"

import { Schema as SA_User } from "../../schemas/SA/User"

export default gql`
  ${mergeTypes([SA_User])}
`
