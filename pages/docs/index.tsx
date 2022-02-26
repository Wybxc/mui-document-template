import type { GetStaticProps } from 'next';
import { IPage } from '../../src/types/page';
import type { IPost } from '../../src/posts';
import Sidebar from '../../src/components/Sidebar';
import { getPosts } from '../../src/posts';

interface IProps {
  postsData: IPost[];
}

const Page: IPage<IProps> = ({ postsData }) => {
  return (
    <>

    </>
  );
};
export default Page;

Page.sidebar = Sidebar;

export const getStaticProps: GetStaticProps<IProps> = async () => {
  return {
    props: {
      postsData: await getPosts('docs'),
    },
  };
};
