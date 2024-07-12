import toast from "react-hot-toast";
import { graphqlClient } from "../clientgrahql/api";
import { CreateTweetData } from "../gql/graphql";
import { createTweetMutation } from "../graphql/mutation/tweet";
import { getAllTweetsQuery } from "../graphql/query/tweet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateTweet =()=>{
    const queryClient=useQueryClient();

    const mutation=useMutation({
        mutationFn:(payload:CreateTweetData)=>
            graphqlClient.request(createTweetMutation,{payload}),
        onMutate:(payload)=>toast.loading("Creating Tweet",{id:'1'}),
        onSuccess:async()=>{
            await queryClient.invalidateQueries({queryKey:["all-tweets"]});
            toast.success('Created Success',{id:'1'})
        },
        onError:()=>toast.error('Not authorized',{id:'1'})
    })
    return mutation;
}

export const useGetAllTweets = ()=>{
    const query=useQuery({
        queryKey: ["all-tweets"],
        queryFn: () => graphqlClient.request(getAllTweetsQuery)
    });
    return {...query,tweets:query.data?.getAllTweets};
};
