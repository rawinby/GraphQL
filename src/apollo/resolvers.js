import mergeResolvers from "graphql-merge-resolvers"

import SA_Resolvers from "./SA/SA_Resolvers"

export default mergeResolvers.merge([SA_Resolvers])
