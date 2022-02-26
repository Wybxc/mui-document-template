import { Box, Typography } from '@mui/material';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { IMarkdownParams, IMarkdownProps } from '../../src/markdown';
import { postPathsGetter, postPropsGetter } from '../../src/markdown';

import Head from 'next/head';
import { IPage } from '../../src/types/page';
import MDX from '../../src/components/MDX';
import Sidebar from '../../src/components/Sidebar';

const Posts: IPage<IMarkdownProps> = ({ source }) => {
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
          <MDX source={source} />
        </Box>
      </Box>
    </>
  );
};

Posts.sidebar = Sidebar;

export default Posts;

export const getStaticPaths: GetStaticPaths<IMarkdownParams> =
  postPathsGetter('docs');

export const getStaticProps: GetStaticProps<IMarkdownProps, IMarkdownParams> =
  postPropsGetter('docs');
