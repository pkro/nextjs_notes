import React from 'react';
import Thumb from "@/components/Thumb/Thumb";

type CardPropsType = {
    imgUrl: string;
    title: string;
    subtitle?: string;
};

const Card = ({imgUrl, title, subtitle}: CardPropsType) => {

    return (<div className={'h-80'}>
        <div className="relative h-full">
            <Thumb imgUrl={imgUrl}/>
            <div className="absolute w-full bottom-0 px-4 py-2 rounded-b bg-zinc-800">
                <h2 className={"text-cyan-200 text-center text-sm truncate"}>{title}</h2>
                {subtitle && <p className="text-cyan-400 center text-xs truncate">{subtitle}</p>}
            </div>
        </div>

    </div>);
};

export default Card;
