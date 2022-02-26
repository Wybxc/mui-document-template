import { Link } from '@mui/material';
import NextLink from 'next/link';
import config from '../config';

const AppHeader = () => {
  return (
    <NextLink href="/" passHref>
      <Link variant="h6" noWrap component="a" color="inherit" underline="none">
        {config.title}
      </Link>
    </NextLink>
  );
};

export default AppHeader;
