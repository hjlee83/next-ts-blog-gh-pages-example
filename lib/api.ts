import {join} from "path";
import fs from "fs";
import matter from "gray-matter";
import {PostType} from "../type";

const postsDirectory = join(process.cwd(), '_posts');

const getPostFileNames = () => {
    return fs.readdirSync(postsDirectory)
}

const getPostByFileName = (fileName: string) => {
    const id: string = fileName.replace(/\.md$/, '');
    const fullPath = join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const {data: {date, title}, content} = matter(fileContents);

    let post : PostType;

    post = {id, date, title, content};
    return post;
}


const getAllPosts = () => {
    let postFileNames = getPostFileNames();

    return postFileNames
        .map(fileName => getPostByFileName(fileName))
        .sort((post1: PostType, post2: PostType) => (post1?.date > post2?.date ? -1 : 1))

}

export {getAllPosts, getPostByFileName};