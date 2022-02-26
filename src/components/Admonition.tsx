import { Alert, AlertColor, AlertTitle } from '@mui/material';
import { Component } from '../types/component';

interface IProps {
  title?: string;
}


interface IAdmonitionProps extends IProps {
  kind: AlertColor;
}

const Admonition: Component<IAdmonitionProps> = ({ kind, title, children }) => {
  return (
    <Alert severity={kind}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {children}
    </Alert>
  );
};

export default Admonition;

export const Note: Component<IProps> = ({ children, ...props }) => {
  return <Admonition kind="info" {...props}>{children}</Admonition>;
};

/**
 * 用于 markdown 中的组件映射。
 */
export const components = {
  'note': Note,
  'admonition-title': AlertTitle,
};
