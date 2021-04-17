import mergeResolvers from "graphql-merge-resolvers"

import { Query as SA_User_Query, Mutation as SA_User_Mutation } from "../../schemas/SA/User"

export default mergeResolvers.merge([SA_User_Query, SA_User_Mutation])
