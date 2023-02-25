import React, {useState} from "react";
import Header from "@/components/Header/Header";
import {NextPage} from "next";
import Hero from "@/components/Hero/Hero";
import Grid from "@/components/Grid/Grid";
import Card from "@/components/Card/Card";
import Spinner from "@/components/Spinner/Spinner";
import {useFetchMovies} from "@/lib/fetchHooks";
import {BACKDROP_SIZE, IMAGE_BASE_URL, POSTER_SIZE} from "@/config";
import Link from "next/link";

const Home: NextPage = () => {
    const [query, setQuery] = useState("");

    const {data, fetchNextPage, isLoading, isFetching, error} = useFetchMovies(query);

    const handleScroll = (e: React.UIEvent<HTMLElement>) => {
        const {scrollTop, clientHeight, scrollHeight} = e.currentTarget;

        if (scrollHeight - scrollTop === clientHeight) { // we're at the bottom
            fetchNextPage();
        }
    }

    if(error) {
        return <>Error</>
    }

    return (
        <main className={"relative h-screen overflow-y-scroll"} onScroll={handleScroll}>
            <Header setQuery={setQuery}/>
            {!query && data && data.pages ?
                /*while not searching, show the image of the first result of the popular category*/
                <Hero
                    imgUrl={data.pages[0].results[0]?.backdrop_path ? IMAGE_BASE_URL + BACKDROP_SIZE + data.pages[0].results[0].backdrop_path : '/no_image.jpg'}
                    title={data.pages[0].results[0]?.title}
                    text={data.pages[0].results[0].overview}/>
                : <></>
            }
            <Grid className={'p-4 max-w-7xl m-auto'}
                  title={query ? `Search Results for ${data?.pages[0].total_results}` : 'Popular Movies'}>
                {data && data.pages ? data.pages.map(page => page.results.map(movie => (
                    <Link key={movie.id} href={`/${movie.id}`}>
                        <div className={'cursor-pointer hover:opacity-80 duration-300'} key={movie.id}>
                            <Card
                                imgUrl={movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path : '/no_image.jpg'}
                                title={movie.title}
                                subtitle={movie.overview ?? null}/>
                        </div>
                    </Link>
                ))) : <></>}
            </Grid>

            {isLoading || isFetching ? <Spinner/> : <></>}
        </main>
    );
};

export default Home;
