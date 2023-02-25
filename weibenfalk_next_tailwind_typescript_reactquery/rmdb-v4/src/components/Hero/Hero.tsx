import React from 'react';
import Image from "next/image";

type HeroPropsType = {
    imgUrl: string;
    title: string;
    text: string;
};

const Hero = ({imgUrl, title, text}: HeroPropsType) => {

    return (<div className={'relative w-full h-40rem'}>
        <div className={'relative flex flex-col-reverse h-full max-w-7xl m-auto z-10 pb-12 text-center md:text-left'}>
        <div className="text-white max-w-2xl px-4">
            <h2 className="text-2xl md:text-5xl font-bold pb-8">{title}</h2>
            <p className="text-lg md:text-xl">{text}</p>
        </div>

        </div>
        <Image priority className={'center object-cover'} fill src={imgUrl} alt={'Hero image'} />
    </div>);
};

export default Hero;
