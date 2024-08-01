import { TwitterLayout } from '@/app/components/Layout/TwitterLayout'
import PostComment from '@/app/components/PostComment'
import React from 'react'
import { graphqlClient } from '../../../../clientgrahql/api';
import { getAllTweetsQuery } from '../../../../graphql/query/tweet';

export default function CommentPage({params}:{params:{postId:String}}) {
  return (
        
     <>
       <TwitterLayout>
        <PostComment id={params.postId }/>
       </TwitterLayout>
     </>
  )
}
