import type { NextPage } from 'next';

export type IPage<TProps={}> = NextPage<TProps> & {
    drawer?: (props: TProps) => JSX.Element;
};
