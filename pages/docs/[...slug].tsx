import type { GetStaticPaths, GetStaticProps } from 'next';
import { getPosts, getPostdata, IPost } from '../../lib/posts';
import { Box, Link, List, ListItem, Typography } from '@mui/material';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import Head from 'next/head';
import { IPage } from '../../src/page';
import { default as NextLink } from 'next/link';

const components = {};

interface IProps {
  source?: MDXRemoteSerializeResult;
  postsData: IPost[];
}

const Posts: IPage<IProps> = ({ source }) => {
  if (!source) {
    return <Box>Loading...</Box>;
  }
  const { frontmatter = {} } = source;
  const title = frontmatter.title ?? '文档';
  const date = frontmatter.date ?? new Date().toISOString();
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Box sx={{ variant: 'containers.page' }}>
        <Box sx={{ mt: '4rem', textAlign: 'center' }}>
          <h1>{title}</h1>
          <Typography
            sx={{
              width: ['80%', '50%'],
              mx: 'auto',
            }}
          >
            <span>{date}</span>
          </Typography>
        </Box>
        <Box sx={{ mt: '4rem' }}>
          <Box>
            <MDXRemote {...source} components={components} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

Posts.drawer = ({ postsData }) => {
  return <List>
    {postsData.map(({ slug, title }) => {
      const slugString = slug.join('/');
      return (
        <Box sx={{ my: '0.5rem' }} key={slugString}>
          <ListItem>
            <Link>
              <NextLink
                href="/docs/[...slug]"
                as={`/docs/${slugString}`}
              >
                {title}
              </NextLink>
            </Link>
          </ListItem>
        </Box>
      );
    })}
  </List>;
};

export default Posts;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getPosts().map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  IProps,
  { slug: string[] }
> = async ({ params }) => {
  if (!params) {
    return { props: { postsData: getPosts() } };
  }
  const postContent = await getPostdata(params.slug);
  const mdxSource = await serialize(postContent, {
    parseFrontmatter: true,
  });
  return {
    props: {
      source: mdxSource,
      postsData: getPosts(),
    },
  };
};
