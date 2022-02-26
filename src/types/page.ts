import type { NextPage } from 'next';

export type IPage<TProps={}> = NextPage<TProps> & {
    sidebar?: (props: TProps) => React.ReactNode;
};
