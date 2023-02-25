import React from 'react';
import {Crew} from "@/lib/types";
import Thumb from "@/components/Thumb/Thumb";

type MovieInfoPropsType = {
    thumbUrl: string;
    backgroundImgUrl: string;
    title: string;
    year: string;
    summary: string;
    rating: number;
    directors: Crew[];
    time: number;
    budget: number;
    revenue: number;
};

const MovieInfo = ({
                       thumbUrl,
                       backgroundImgUrl,
                       budget,
                       revenue,
                       rating,
                       time,
                       directors,
                       summary,
                       year,
                       title,

                   }: MovieInfoPropsType) => {

    return (
        <>
            <div className="relative w-full h-auto p-4">
                <div className={'relative h-ful min-h-128 flex flex-col md:flex-row max-w-7xl p-4 m-auto z-10 rounded-xl bg-zinc-800 bg-opacity-90'}>
                    <div className="relative w-full h-96 md:h-auto md:w-1/3">
                        <Thumb imgUrl={thumbUrl ?? ''} />
                        <div className="absolute top-4 left-4 rounded-full flex w-10 h-10 items-center text-black justify-center bg-white">{rating && Math.round(rating)}</div>
                    </div>
                </div>
                <div className="text-white px-0 py-4 md:py-0 text-center md:text-left md:px-8 w-full md:w-2/3">
                    <h2 className="text-2xl md:text-4xl font-bold pb-4">{title} ({year})</h2>
                    <h3 className="text-lg font-bold">Summary</h3>
                    <p className="mb-8 text-sm md:text-lg">{summary}</p>
                    <div>
                        <h3 className={'text-lg font-bold'}>Directors{directors.length > 1 ? 's' : ''}</h3>
                        <div>{directors.map(d=><p key={d.credit_id}>{d.name}</p>)}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MovieInfo;
