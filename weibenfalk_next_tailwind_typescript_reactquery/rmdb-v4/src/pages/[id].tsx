import React from 'react';
import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import Header from "@/components/Header/Header";
import MovieInfo from "@/components/MovieInfo/MovieInfo";
import Grid from "@/components/Grid/Grid";
import Card from "@/components/Card/Card";
import {BACKDROP_SIZE, creditsUrl, IMAGE_BASE_URL, movieUrl, POSTER_SIZE} from "@/config";
import {basicFetch} from "@/lib/fetchFunctions";
import {Cast, Credits, Crew, Movie, Movies} from "@/lib/types";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import movieInfo from "@/components/MovieInfo/MovieInfo";

type PropsType = {
    movie: Movie,
    directors: Crew[],
    cast: Cast[]
};

const Movie: NextPage<PropsType> = ({movie, directors, cast}) => {
    return (
        <main>
            <Breadcrumb title={movie.original_title}/>
        <Header/>
            <MovieInfo thumbUrl={movie.poster_path ? IMAGE_BASE_URL+POSTER_SIZE+movie.poster_path : '/no_image.jpg'}
            rating={movie.vote_average}
            title={movie.title}
            year={movie.release_date.split('-')[0]}
            backgroundImgUrl={movie.backdrop_path ? IMAGE_BASE_URL + BACKDROP_SIZE + movie.backdrop_path : '/no_image.jpg'}
            summary={movie.overview}
            directors={directors}
            time={movie.runtime}
            budget={movie.budget}
            revenue={movie.revenue}/>
           <Grid title={movie.title}>
               <Card imgUrl={movie.poster_path} title={movie.title} />
           </Grid>
    </main>);
};

export default Movie;

// this function sends in the props to the component above
export const getStaticProps: GetStaticProps = async context => {
    const id = context.params?.id as string;

    const movieEndpoint: string = movieUrl(id);
    const creditsEndpoint: string = creditsUrl(id);

    const movie = await basicFetch<Movie>(movieEndpoint);
    const credits = await basicFetch<Credits>(creditsEndpoint);

    const directors = credits.crew.filter(member => member.job === "Director");

    return {
        // will be passed to the page component as props
        props: {
            movie: movie,
            directors: directors,
            cast: credits.cast
        },
        revalidate: 60*60*24 // rebuild page every 24 hours
    }
};

// the first time a user visits the page, it gets generated statically,
// the next time, the statically generated page is served directly (if still in the
// the revalidate timeframe)
// This function only runs during build time; it can't be used with getServerSideProps
export const getStaticPaths: GetStaticPaths = async () => {
    return {
        // here we could also set specific ids to be pre-rendered, e.g. paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
        paths: [],
        fallback: 'blocking'
    }
}
