import * as React from 'react';

import { Link, List, ListItem } from '@mui/material';

import { Component } from '../types/component';
import { IPost } from '../posts';
import NextLink from 'next/link';

interface IProps {
  postsData: IPost[];
}

const Sidebar: Component<IProps> = ({ postsData }) => {
  return (
    <List>
      {postsData.map(({ slug, title }) => {
        const slugString = slug.join('/');
        return (
          <ListItem sx={{ my: '0.5rem' }} key={slugString}>
            <NextLink
              href="/docs/[...slug]"
              as={`/docs/${slugString}`}
              passHref
            >
              <Link>{title}</Link>
            </NextLink>
          </ListItem>
        );
      })}
    </List>
  );
};

export default Sidebar;
