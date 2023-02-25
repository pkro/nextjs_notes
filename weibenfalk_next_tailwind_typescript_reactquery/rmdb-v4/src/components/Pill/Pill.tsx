import React from 'react';

type PillPropsType = {
    text: string;
    className?: string;
};

export const Pill = ({text, className}: PillPropsType) => {
    return (<div
        className={'bg-cyan-800 text-white text-sm font-bold px-2 py-1 m-2 rounded-full inline-block ' + className ?? ''}>
        {text}
    </div>);
};
