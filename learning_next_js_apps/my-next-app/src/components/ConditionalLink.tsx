import React, {ReactNode} from 'react';
import {useRouter} from "next/router";
import Link, {LinkProps} from "next/link";

type ConditionalLinkPropsType = LinkProps & {children: ReactNode};

export const ConditionalLink = (props: ConditionalLinkPropsType) => {
    const {children, ...linkProps} = props;
    const router = useRouter();
    if (router.pathname === props.href) {
        return (<>{children}</>);
    }
    return <Link {...linkProps}>{children}</Link>
};
