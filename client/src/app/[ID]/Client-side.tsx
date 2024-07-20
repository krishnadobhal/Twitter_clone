"use client"
import { Tweet, User } from "../../../gql/graphql";
import Image from "next/image";
import { FeedCard } from "../components/FeedCard";
import { FC, useCallback, useMemo } from "react";
import { useCurrentUser } from "../../../hooks/user";
import { graphqlClient } from "../../../clientgrahql/api";
import { followUserMutation, unfollowUserMutation } from "../../../graphql/mutation/user";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

interface UserInfoprops{
    IDs:string,
    usersInfomation:User
    }

export const UserInfos:FC<UserInfoprops> =(props)=> {
    // console.log(IDs);
    const {usersInfomation}=props
   // console.log(`user-> ${JSON.stringify(usersInfomation)}`);
    
    // const { user } = useGetUserById(props.IDs)
    
   const {user:currentUser}=useCurrentUser();
   const queryClient=useQueryClient();


    const amIFollowing =useMemo(()=>{
    if(!props.usersInfomation) return false;
    return(
        (currentUser?.following?.findIndex((element)=>element?.id === props.usersInfomation.id) ?? -1)>=0
        );
    },[currentUser?.following,props.usersInfomation])

    const handleFollowUser=useCallback(async()=>{
     if(!props.usersInfomation?.id) return;
     await graphqlClient.request(followUserMutation,{to:props.usersInfomation?.id})
     await queryClient.invalidateQueries({queryKey: ["current_user"]})
    },[props.usersInfomation.id ,queryClient])

    const handleUnFollowUser=useCallback(async()=>{
     if(!props.usersInfomation?.id) return;
     await graphqlClient.request(unfollowUserMutation,{to:props.usersInfomation?.id})
     await queryClient.invalidateQueries({queryKey: ["current_user"]})
    },[props.usersInfomation.id ,queryClient])

    return (
        <div>
            <div className="p-4 ">
                {usersInfomation && usersInfomation.profileImageURL && (
                    <Image
                        className="rounded-full"
                        src={usersInfomation.profileImageURL}
                        alt="profile image"
                        width={100}
                        height={100}
                    />
                )}

                <div className=" flex flex-col sm:flex-row items-start sm:justify-between sm:items-center py-2 sm:py-0 px-2">
                    <div className="flex gap-2  text-gray-500 ">
                    <span>{usersInfomation?.follower?.length +" "}Followers</span>
                    <span>{usersInfomation?.following?.length +" "}Following</span>
                     </div>
                     { currentUser?.id!== props.usersInfomation?.id &&(
                     <>
                       { (amIFollowing) ?
                        (
                        <button onClick={handleUnFollowUser} className="text-sm font-bold bg-white text-black rounded-3xl px-5 py-2">UnFollow</button>
                        ):(
                            <button onClick={handleFollowUser} className="text-sm font-bold bg-white text-black rounded-3xl px-5 py-2">Follow</button>
                        )}
                     </>
                     )

                     }
                </div>
            </div>

            <div>
                {usersInfomation?.tweets?.map((tweet) =>
                    tweet ? <FeedCard key={tweet.id} data={tweet as Tweet} /> : null
                )}
            </div>
        </div>
    );
};



export default UserInfos