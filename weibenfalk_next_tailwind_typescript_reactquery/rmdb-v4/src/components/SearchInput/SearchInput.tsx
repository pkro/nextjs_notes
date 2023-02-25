import React, {useMemo, useRef, useState} from 'react';
import Image from "next/image";

type SearchInputPropsType = {
    setQuery: React.Dispatch<React.SetStateAction<string>>
};

export const SearchInput = ({setQuery}: SearchInputPropsType) => {
    const [text, setText] = useState('');

    // In the context of Next.js, which is a framework based on Node.js, the NodeJS.Timeout type
    // is available by default in the global scope of the application.
    // Therefore, it is not necessary to import it explicitly.
    const timer = useRef<NodeJS.Timeout>();
    // this would also be fine:
    // const timer = useRef<ReturnType<typeof setTimeout>>();

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        clearTimeout(timer.current);

        setText(value);

        timer.current = setTimeout(() => setQuery(value), 300);
    };

    return (<>
        <input type={'text'}
               placeholder={'Search Movie'}
               onChange={handleInput}
               value={text}
               className={'h-10 pr-14 md:w-96 rounded-full p-4 text-md bg-zinc-700 text-white focus:outline-none focus:border focus:border-solid focus:border-cyan-200'}/>
        <div className={'absolute right-4 top-8'}>
            <Image width={30} height={32} src={'/tmdb-logo.svg'} alt={'tmdb logo'}/>
        </div>
    </>);
};
