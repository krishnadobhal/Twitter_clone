import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "../clientgrahql/api"
import { graphql } from "../gql"
import { getCurrentUserQuery } from "../graphql/query/user"

export const useCurrentUser= () =>{
    const query =useQuery({
        queryKey:["current_user"],
        queryFn:()=> graphqlClient.request(getCurrentUserQuery)
    });
    return { ...query, user:query?.data?.getCurrentUser };
}