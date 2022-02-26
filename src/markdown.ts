import type { GetStaticPaths, GetStaticProps } from 'next/types';
import { IPost, getPostdata, getPosts } from './posts';
import remarkDirective, { Root } from 'remark-directive';

import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { ParsedUrlQuery } from 'querystring';
import type { Plugin } from 'unified';
import { components as admonitionComponents } from './components/Admonition';
import remarkDirectiveRehype from 'remark-directive-rehype';
import { serialize } from 'next-mdx-remote/serialize';
import { visit } from 'unist-util-visit';

/**
 * Markdown 页面组件的 props。
 */
export interface IMarkdownProps {
  source?: MDXRemoteSerializeResult;
  postsData: IPost[];
}

/**
 * Markdown 页面的 URL 参数。
 */
export interface IMarkdownParams extends ParsedUrlQuery {
  slug: string[];
}

/**
 * 获取文章的静态路由。
 * @param path 文章目录。
 * @returns `getStaticPaths` 函数。
 */
export const postPathsGetter =
  (path: string): GetStaticPaths<IMarkdownParams> =>
    async () => {
      const posts = await getPosts(path);
      return {
        paths: posts.map(({ slug }) => ({
          params: { slug },
        })),
        fallback: false,
      };
    };

/**
 * 将 markdown admonition 中的方括号标题转换为 AdmonitionTitle。
 * @return remark 插件。
 */
const remarkAdmonitionTitle: Plugin<any[], Root> = () => {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === 'containerDirective' &&
        Object.keys(admonitionComponents).includes(node.name) &&
        node.children[0]?.data?.directiveLabel
      ) {
        node.children[0].data.hName = 'admonition-title';
      }
    });
  };
};

/**
 * 获取文章的内容。
 * @param path 文章目录。
 * @returns `getStaticProps` 函数。
 */
export const postPropsGetter =
  (path: string): GetStaticProps<IMarkdownProps, IMarkdownParams> =>
    async ({ params }) => {
      const posts = await getPosts(path);
      if (!params) {
        return { props: { postsData: posts } };
      }
      const postContent = await getPostdata(path, params.slug);
      const mdxSource = await serialize(postContent, {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [
            remarkDirective,
            remarkAdmonitionTitle,
            remarkDirectiveRehype,
          ],
        },
      });
      return {
        props: {
          source: mdxSource,
          postsData: posts,
        },
      };
    };
