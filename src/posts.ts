import { asyncMemo } from './utils/memo';
import fs from 'fs';
import { globby } from 'globby';
import matter from 'gray-matter';
import path from 'path';

export interface IPost {
  title?: string;
  slug: string[];
}

/**
 * 获取文章列表。
 * @param dir 文章目录。
 * @return 文章列表。
 */
export const getPosts = asyncMemo(
    async (dir: string): Promise<Array<IPost>> => {
      const postDirectory = path.join(process.cwd(), dir);

      const posts = await globby(['**/*.mdx', '**/*.md'], {
        cwd: postDirectory,
        ignore: ['**/_*.mdx', '**/_*.md'],
      });

      return posts
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
    }
);

/**
 * 从文章列表中获取指定 slug 的文章。
 * @param dir 文章目录。
 * @param slug  文章的 slug。
 * @return 文章的内容。
 */
export const getPostdata = async (
    dir: string,
    slug: string[]
): Promise<string> => {
  const postDirectory = path.join(process.cwd(), dir);
  const filename = path.join(postDirectory, ...slug) + '.mdx';
  const postContent = fs.readFileSync(filename, 'utf8');

  return postContent;
};
