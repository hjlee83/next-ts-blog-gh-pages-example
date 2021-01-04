import {getAllPosts} from "../lib/api";
import {PostType} from "../type";
import Link from 'next/link';

type Props = {
    allPosts: PostType[]
};

const Home = ({allPosts}: Props) => {
    return (
        <>
            <ul>
                {allPosts.map(({id, title}) => (
                    <li key={id}>
                        <Link href={`/posts/${id}`}>
                            <a className="hover:underline">{title}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
};

export default Home;

export const getStaticProps = async () => {
    const allPosts = getAllPosts();
    return {
        props: {allPosts}
    };
}