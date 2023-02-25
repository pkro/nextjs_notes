import React from 'react';
import Link from "next/link";

type BreadcrumbPropsType = {
    title: string
};

const Breadcrumb = ({title}: BreadcrumbPropsType) => {

    return (<>
            <div className="bg-zinc-800">
                <div className="flex flex-row items-center max-w-7xl m-auto p-4 text-white text-lg">
                    <Link href={"/"}>
                        <span className="cursor-pointer hover:opacity-80 duration-300">Home</span>
                    </Link>
                    <span className="block px-2">|</span>
                    <span className="truncate font-bold">{title}</span>
                </div>
            </div>
        </>
    );

};

export default Breadcrumb;
