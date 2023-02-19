import React from 'react';
import Link from "next/link";

type helloPropsType = {};

export default function hello({}: helloPropsType) {
    return (<><h1>Hey!</h1>
        <Link href={'/about'}>About</Link>
    </>);
};

