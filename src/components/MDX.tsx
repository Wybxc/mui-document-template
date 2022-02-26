import '@fontsource/roboto/400.css';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

import { Component } from '../types/component';
import { MDXProvider } from '@mdx-js/react';
import Typography from '@mui/material/Typography';
import components from '../components';

const componentReplacements = {
  p: (props: object) => <Typography paragraph {...props} />,
  h1: (props: object) => <Typography variant="h1" {...props} />,
  h2: (props: object) => <Typography variant="h2" {...props} />,
  h3: (props: object) => <Typography variant="h3" {...props} />,
  h4: (props: object) => <Typography variant="h4" {...props} />,
  h5: (props: object) => <Typography variant="h5" {...props} />,
  h6: (props: object) => <Typography variant="h6" {...props} />,
};

interface IProps {
  source: MDXRemoteSerializeResult;
}

const MDX: Component<IProps> = ({ source }) => {
  return (
    <MDXProvider components={componentReplacements}>
      <MDXRemote {...source} components={components} />
    </MDXProvider>
  );
};

export default MDX;
