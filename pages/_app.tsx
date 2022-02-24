import * as React from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import MDX from '../src/MDX';
import { IPage } from '../src/page';

/**
 * 侧边栏的宽度。
 */
const drawerWidth: number = 240;

interface AppProps {
  Component: IPage,
  pageProps: any,
};

/**
 * App 组件，定义全局模板。
 * @param {AppProps} props
 * @return {JSX.Element}
 */
function App({ Component, pageProps }: AppProps): JSX.Element {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const hasDrawer = Component.drawer ? true : false;
  const drawer = Component.drawer ? Component.drawer(pageProps) : '';

  const appBarContent = <Typography variant="h6" noWrap component="div">
    Material UI Document Template
  </Typography>;

  const appBar = hasDrawer ? (<AppBar
    position="fixed"
    sx={{
      width: { sm: `calc(100% - ${drawerWidth}px)` },
      ml: { sm: `${drawerWidth}px` },
    }}
  >
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      {appBarContent}
    </Toolbar>
  </AppBar>):(
    <AppBar position="fixed">
      <Toolbar>
        {appBarContent}
      </Toolbar>
    </AppBar>
  );

  const nav = hasDrawer ? (<Box
    component="nav"
    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    aria-label="mailbox folders"
  >
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        'display': { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
        },
      }}
    >
      {drawer}
    </Drawer>
    <Drawer
      variant="permanent"
      sx={{
        'display': { xs: 'none', sm: 'block' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
        },
      }}
      open
    >
      {drawer}
    </Drawer>
  </Box>):('');

  const main = (<Box
    component="main"
    sx={{
      flexGrow: 1,
      p: 3,
      width: { sm: `calc(100% - ${drawerWidth}px)` },
    }}
  >
    <Toolbar />
    <MDX>
      <Component {...pageProps} />
    </MDX>
  </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {appBar}
      {nav}
      {main}
    </Box>
  );
}

export default App;
