import Head from 'next/head';
import {PostType} from "../../type";
import {getAllPosts, getPostByFileName} from "../../lib/api";
import mdToHtml from "../../lib/mdToHtml";
import Link from 'next/link';

type Props = {
    post: PostType
}

const Post = ({post}: Props) => {
    return (
        <>
            <Head>
                <title>{post.title}</title>
            </Head>
            <article>
                <h1>{post.title}</h1>
                <div>
                </div>
                <div dangerouslySetInnerHTML={{__html: post.content}}/>
            </article>
            <div>
                <Link href="/">
                    <a>← Back to home</a>
                </Link>
            </div>
        </>
    )
}

export default Post;

export const getStaticPaths = async () => {
    const posts = getAllPosts()

    return {
        paths: posts.map((post) => ({
            params: {
                id: post.id,
            }
        })),
        fallback: false,
    }
}

type Params = {
    params: {
        id: string
    }
}

export const getStaticProps = async ({params}: Params) => {
    const post = await getPostByFileName(params.id)
    const content = await mdToHtml(post.content || '');
    return {
        props: {
            post: {
                ...post,
                content,
            }
        }
    }
}