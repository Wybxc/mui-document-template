import { MDXProvider } from '@mdx-js/react';
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/400.css';

const components = {
  p: (props: object) => <Typography paragraph {...props} />,
  h1: (props: object) => <Typography variant="h1" {...props} />,
  h2: (props: object) => <Typography variant="h2" {...props} />,
  h3: (props: object) => <Typography variant="h3" {...props} />,
  h4: (props: object) => <Typography variant="h4" {...props} />,
  h5: (props: object) => <Typography variant="h5" {...props} />,
  h6: (props: object) => <Typography variant="h6" {...props} />,
};

const MDX: React.FC = (props) => {
  return (
    <MDXProvider components={components} {...props} />
  );
};

export default MDX;
