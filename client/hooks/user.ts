import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "../clientgrahql/api"
import { graphql } from "../gql"
import { getCurrentUserQuery, getUserByidQuery } from "../graphql/query/user"

export const useCurrentUser= () =>{
    const query =useQuery({
        queryKey:["current_user"],
        queryFn:()=> graphqlClient.request(getCurrentUserQuery)
    });
    return { ...query, user:query?.data?.getCurrentUser };
}

export const useGetUserById=(id:any)=>{
    const query =useQuery({
        queryKey:["User-ID"],
        queryFn:()=> graphqlClient.request(getUserByidQuery,{id})
    });
    return { ...query, user:query?.data?.getUserByid };
}