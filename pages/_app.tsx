import type { IPage } from '../src/types/page';
import Layout from '../src/layouts/Layout';

interface AppProps {
  Component: IPage;
  pageProps: any;
}

/**
 * App 组件，定义全局模板。
 * @param props 属性。
 * @return 组件。
 */
function App({ Component, pageProps }: AppProps): React.ReactNode {
  const sidebar = Component.sidebar ? Component.sidebar(pageProps) : null;
  return (
    <Layout sidebar={sidebar}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default App;
