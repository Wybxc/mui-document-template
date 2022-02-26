import * as React from 'react';

export interface Component<Props> extends React.FC<Props> {
  (props: React.PropsWithChildren<Props>): React.ReactElement;
}
