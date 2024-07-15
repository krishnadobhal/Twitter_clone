"use client"
import { Tweet, User } from "../../../gql/graphql";
import Image from "next/image";
import { useCurrentUser, useGetUserById } from "../../../hooks/user";
import { FeedCard } from "../components/FeedCard";
import { graphqlClient } from "../../../clientgrahql/api";
import { getUserByidQuery } from "../../../graphql/query/user";
import { TwitterLayout } from "../components/Layout/TwitterLayout";
import { useSearchParams } from "next/navigation";
import { Any, ID } from "graphql-request/alpha/schema/scalars";
import { useQueryClient } from "@tanstack/react-query";
import { FC } from "react";

interface UserInfoprops{
    IDs:string,
    usersInfomation:User
    }

export const UserInfos:FC<UserInfoprops> =(props)=> {
    // console.log(IDs);
    const {usersInfomation}=props
    console.log(`user-> ${usersInfomation}`);
    
    // const { user } = useGetUserById(props.IDs)
    // console.log("hii");

    return (
        <div>
            <div className="p-4 border">
                {usersInfomation && usersInfomation.profileImageURL && (
                    <Image
                        className="rounded-full"
                        src={usersInfomation.profileImageURL}
                        alt="profile image"
                        width={100}
                        height={100}
                    />
                )}
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