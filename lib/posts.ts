import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { globbySync } from 'globby';

export interface IPost {
  title?: string;
  slug: string[];
}

const postDirectory = path.join(process.cwd(), 'posts');

const posts = globbySync('**/*.mdx', {
  cwd: postDirectory,
})
    .map((fileName) => ({
      fullPath: path.join(postDirectory, fileName),
      slug: fileName.replace(/\.mdx?$/, '').split(/[/\\]/),
    }))
    .map(({ fullPath, slug }) => {
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        ...data,
      };
    });

/**
 * 获取文章列表。
 * @return {Array} 文章列表。
 */
export const getPosts = (): Array<IPost> => posts;

/**
 * 从文章列表中获取指定 slug 的文章。
 * @param {string[]} slug  文章的 slug。
 * @return {string} 文章的内容。
 */
export const getPostdata = async (slug: string[]): Promise<string> => {
  const filename = path.join(postDirectory, ...slug) + '.mdx';
  const postContent = fs.readFileSync(filename, 'utf8');

  return postContent;
};
