import Link from 'next/link';
import Image from 'next/image';
import {NextPage} from "next";
import {SearchInput} from "@/components/SearchInput/SearchInput";
import React from "react";

type HeaderProps = {
    setQuery?: React.Dispatch<React.SetStateAction<string>>
}

const Header = ({setQuery}: HeaderProps) => {
    return <>
        <div className="sticky flex top-0 z-40 w-full h-24 bg-zinc-900">
            <div className="flex justify-between w-full h-full max-w-7xl px-4">
                <Link href={"/"}>
                    <div className="flex items-center cursor-pointer justify-items-start">
                        <div className="hidden md:block">
                            <Image width={150} height={150} src={"/rmdb-logo.svg"} alt={"rmdb-logo"}/>
                        </div>
                        <div className="md:invisible pt-2">
                            <Image width={42} height={42} src={"/rmdb-logo-small.svg"} alt={"rmdb-logo-small"}/>
                        </div>

                    </div>
                </Link>
                {setQuery && (
                    <div className={'flex items-center relative'}>
                        <SearchInput setQuery={setQuery}/>
                    </div>
                )}
            </div>
        </div>
    </>;

};

export default Header;
