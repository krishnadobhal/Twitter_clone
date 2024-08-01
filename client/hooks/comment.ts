import { useMutation, useQueryClient } from '@tanstack/react-query';
import { graphqlClient } from '../clientgrahql/api';
import { createCommentMutation } from '../graphql/mutation/comment';
import toast from 'react-hot-toast';
import { CreateCommentData } from '../gql/graphql';


export const useCreateComment =()=>{
       
      const queryClient=useQueryClient();
      const mutation=useMutation({
        mutationFn:(payload:CreateCommentData)=>
            graphqlClient.request(createCommentMutation,{payload}),
        onMutate:(payload)=>toast.loading("Posting Coment",{id:"1"}),
        onSuccess:async()=>{
            queryClient.invalidateQueries({queryKey:["Tweet-by-id"]})
            toast.success("Comment Posted",{id:"1"}) 
        },
        onError:()=>toast.error('Not authorized',{id:'1'})

        
      })
      return mutation;
}