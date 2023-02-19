import React, {ReactNode} from 'react';
import {useRouter} from "next/router";
import Link from "next/link";
import {Container, Group} from "@mantine/core";
import {ConditionalLink} from "@/components/ConditionalLink";

type LayoutPropsType = { children: ReactNode };

export const Layout = ({children}: LayoutPropsType) => {
    const router = useRouter();

    return (<Container><Group>
        <ConditionalLink href={'/'}>Home</ConditionalLink>
        <Link href={'/contacts'}>Contacts</Link>
    </Group>
        <Container>
            {children}
        </Container>
    </Container>);
};
