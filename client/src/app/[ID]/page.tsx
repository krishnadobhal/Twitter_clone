export const revalidate = 0;
import { FaArrowLeft } from "react-icons/fa6";
import Image from "next/image";
import { TwitterLayout } from "../components/Layout/TwitterLayout";
import { useCurrentUser } from "../../../hooks/user";
import { FeedCard } from "../components/FeedCard";
import { Tweet, User } from "../../../gql/graphql";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { graphqlClient } from "../../../clientgrahql/api";
import { getCurrentUserQuery, getUserByidQuery } from "../../../graphql/query/user";
import { notFound } from "next/navigation";
import { DiVim } from "react-icons/di";
import { useGetAllTweets } from "../../../hooks/tweet";
import Link from "next/link";
import UserInfos from "./Client-side";
import { getAllTweetsQuery, GetTweetsByAuthorIDQuery } from "../../../graphql/query/tweet";

const AboutPage = async ({ params }: { params: { ID: string } }) => {

    //Here We can Write SSR funtions
    const id = params.ID as string | undefined;
    if (!id) return { notFound: true };
    // console.log(id)
    const userInfo = await graphqlClient.request(getUserByidQuery, { id });
    const userTweet = await graphqlClient.request(GetTweetsByAuthorIDQuery,{id})
    const usersInfomation= userInfo.getUserByid
    
    if (!userInfo.getUserByid)
        return (
            <TwitterLayout >
                <div>Not found</div>
            </TwitterLayout>
        );
       
    return (
        <TwitterLayout >
            <div>
                <nav className="flex items-center gap-3 px-3 py-3">
                    <Link href="/">
                        <FaArrowLeft className="text-1xl" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">{usersInfomation?.firstName}</h1>
                        <h1 className="text-1xl font-bold text-slate-500">{usersInfomation?.tweets?.length}</h1>
                    </div>
                </nav>
                {/* <div className="p-4 border">
                    {userInfo.getUserByid && userInfo.getUserByid.profileImageURL && (
                        <Image
                            className="rounded-full"
                            src={userInfo.getUserByid.profileImageURL}
                            alt="profile image"
                            width={100}
                            height={100}
                        />
                    )}
                </div>
                <div>
                    {userInfo.getUserByid?.tweets?.map((tweet) =>
                        tweet ? <FeedCard key={tweet.id} data={tweet as Tweet} /> : null
                    )}
                </div> */}
            </div>
            <UserInfos IDs={params.ID} usersInfomation={usersInfomation as User} userTweet={userTweet.getTweetsByauthorID as Tweet[]} />
        </TwitterLayout>
    );
};

export default AboutPage;
