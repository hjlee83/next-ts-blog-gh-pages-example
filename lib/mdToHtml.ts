import remark from 'remark';
import html from 'remark-html';

export default async (markdown: string) => {
    let resultMarkdown = markdown.replace(/..\/public/gi, '');
    const result = await remark().use(html).process(resultMarkdown);
    return result.toString();
};