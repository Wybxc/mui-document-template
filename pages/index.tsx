import type { GetStaticProps } from 'next';
import Link from 'next/link';
import { getPosts } from '../lib/posts';
import type { IPost } from '../lib/posts';
import { Box } from '@mui/material';
import { IPage } from '../src/page';

interface IProps {
  postsData: IPost[];
}

const BlogIndex: IPage<IProps> = ({ postsData }) => {
  return (
    <>
      <Box>My Blog</Box>
      <Box>
        {postsData.map(({ slug, title }) => {
          const slugString = slug.join('/');
          return (
            <Box sx={{ my: '0.5rem' }} key={slugString}>
              <li>
                <Box>
                  <Link
                    key={slugString}
                    href="/docs/[...slug]"
                    as={`/docs/${slugString}`}
                  >
                    <a>
                      <Box>{title}</Box>
                    </a>
                  </Link>
                </Box>
              </li>
            </Box>
          );
        })}
      </Box>
    </>
  );
};
export default BlogIndex;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      postsData: getPosts(),
    },
  };
};
