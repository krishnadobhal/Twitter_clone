import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "../clientgrahql/api";
import { getLikesQuery } from "../graphql/query/Like";

export const usegetLikes = (tweetId:string)=>{
    const query=useQuery({
        queryKey: ["Likes"],
        queryFn: () => graphqlClient.request(getLikesQuery,{tweetId})
    });
    return {...query,tweets:query.data?.getLikes};
};
