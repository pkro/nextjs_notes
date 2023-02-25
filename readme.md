<!-- START doctoc -->
<!-- END doctoc -->

# NextJS notes

Notes from

- "learning next.js" course on linkedin learning by Sandy Ludosky
- next_js_the_complete_guide_apps by academind

## Benefits

- zero configuration
- rapid development
- SEO friendly
- widely adopted, large community
- SSR (server side rendering)
- fast initial load in browser
- file based routing (which might be a drawback in some scenarios), like HTML pages

Jamstack: 3 part architecture:

- **J**avaScript
- **A**PIs
- **M**arkup (prebuilt markup)
- Pre-rendering
- decoupled services and systems

Built in css support like css modules in CRA

## Basics

Create a new project:

`npx create-next-app [name] --use-npm`

### File based routing

Pages are just react components located under "pages" (subfolders are possible and are added to the path). They can then be immediately reached with their name in the url, e.g. `src/pages/hello.tsx` can be accessed via `https://localhost:3000/hello`, `src/pages/learn/nextjs.tsx` can be accessed via `https://localhost:3000/learn/nextjs` etc. 

The default `/` route is `src/pages/index.tsx`

The component must be the *default export*:

```tsx
import React from 'react';

type helloPropsType = {};

const hello = ({}: helloPropsType) => {

    return (<>Hey!</>);
};

export default hello;
```

As we use default exports (which have no name or rather can be imported by any name), the *filename* is the name in the url, not the component name. Because it is a default / nameless export, the component name doesn't have to be uppercase.

### Linking between pages (client side transitions)

It's as simple as this:

```tsx
import Link from "next/link";

type helloPropsType = {};

export default function hello({}: helloPropsType) {
    return (<><h1>Hey!</h1>
        <Link href={'/about'}>About</Link>
    </>);
};
```

### Dynamic routes

We can create a dynamic route by adding components with square brackets as the name and access it using `rouseRouter`:

`/src/pages/learn/[name].tsx`:

```tsx
import React from 'react';
import {useRouter} from "next/router";

type nextjsPropsType = {};

export default ({}: nextjsPropsType) => {
    const router = useRouter();
    const name = router.query.name;
    return (<>Yay learn {name}</>);
};
```

### Pre-rendering and data fetching

Data fetching offers 3 ways to render content:

- Server side rendering by exporting a function called `getServerSideProps` from a page: data fetching is done on request time *ON* the server and provided in the rendered page, so the client doesn't do any API requests itself. Use when it's enough to fetch the data on page load (e.g. no refetching on user interaction on the page). Fast.
- Static site generation by exporting `getStaticProps` (and `getStaticPaths` if using dynamic routes): page will be pre-rendered at built time. Don't use user- or state specific requests here. It's ok for e.g. fetching more or less static content like blog articles. Fastest.
- Client side rendering: the usual dynamic data fetching using `useEffect` like in plain react. There is a library like tanstack-query for caching etc. by the nextjs team called [`swr`](https://swr.vercel.app/docs/getting-started). Not that fast.

#### getStaticProps

# Notes from "Intermediate React.js FULL COURSE 2022 with NextJS - Tailwind CSS - Typescript - react-query"


## Project setup

### Create a new typescript nextjs project

`npx create-next-app@latest --typescript --use-npm`

To allow image loading from external servers, add an `images` key to `next.config.js`:

```js
images: {
    domains: ['image.tmdb.org'],
  }
```

### Adding and configuring tailwind

Add [Tailwind](https://tailwindcss.com/docs/guides/nextjs):

```shell
npm install -D tailwindcss postcss autoprefixer`
npx tailwindcss init -p
```

Fill the `content` key in `tailwind.config.js`:

`content: ["./src/**/*.{js,ts,jsx,tsx}"],` *no spaces after commas!*

Add the tailwind directives to the `src/styles/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Adding local fonts

Add fonts for optimization if necessary by [automatically self hosting google or any web fonts](https://nextjs.org/docs/basic-features/font-optimization):

*Note: this differs from the way in the video*

`npm install @next/font`

To use throughout app, add it like this to `_app.tsx` OR the same way for a single page:

```tsx
import '@/styles/globals.css';
import type {AppProps} from 'next/app';
import {Raleway} from '@next/font/google';

const raleway = Raleway({subsets: ['latin']});

export default function App({Component, pageProps}: AppProps) {
    return <main className={raleway.className}>
        <Component {...pageProps} />
    </main>;
}
```

Make sure to remove the `main` wrapper in the default  `pages/index.tsx`.

To configure the font to be used by tailwind, assign a variable name to it and use it in the `tailwind.config.js`:

_app.tsx:

```tsx
// ...
const raleway = Raleway({
    subsets: ['latin'],
    variable: '--font-raleway'
});
// ...
```

tailwind.config.js:

```js
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-inter)', ...fontFamily.sans],
            }
        },
    },
    plugins: [],
}
```

This uses the `raleway` font for all `sans` fonts.

### Add tanstack-query

`npm i @tanstack/react-query`

Wrap the application using the `QueryClientProvider`.

pages/_app.tsx:

```tsx
import '@/styles/globals.css';
import type {AppProps} from 'next/app';
import {Raleway} from '@next/font/google';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const raleway = Raleway({subsets: ['latin']});

const queryClient = new QueryClient();
export default function App({Component, pageProps}: AppProps) {
    return (
        <main className={raleway.className}>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
        </main>);
}
```

## Coding

- Routing: see  [file based routing](#file-based-routing)
- `pages/index.tsx` is the main / home
- For links, use `Link` from `next/link` and `Image` from `next/image` to allow nextJS to optimize.

NextPage type:

For some reason, `function Home(): NextPage {` does NOT work but defining it as an arrow function like `const Home: NextPage = () => {` does.

### api folders

#### General

An `api` folder *inside* the pages folder creates a `next api`. *Outside* it is just a normal folder.

The code in the api folder inside pages directory is *server side executed code*.

Good chatGPT explanation:

>In Next.js, the pages/api folder is a special folder that contains serverless API routes. This folder is used to define server-side endpoints for handling HTTP requests.
>
>When you create a file inside the pages/api folder with the extension .js, .ts, .jsx, or .tsx, Next.js automatically creates a serverless API endpoint that maps to the filename of the file. For example, if you create a file called hello.js inside the pages/api folder, Next.js will create an API endpoint that can be accessed via the URL /api/hello.
>
>API routes can be used to implement various types of server-side functionality, such as:
>
>    Handling form submissions
>    Processing data from external APIs
>    Performing server-side authentication or authorization
>    Implementing server-side rendering for dynamic content
>
>One of the benefits of using API routes in Next.js is that they can be deployed as serverless functions to cloud providers such as Vercel or AWS Lambda. This allows you to build scalable, low-cost serverless applications without having to manage server infrastructure.
>
>It's important to note that the code inside API routes runs on the server, not on the client. This means that you can write server-side code using Node.js modules and APIs, but you can't access client-side APIs or DOM elements directly.

Another advantage is that we can use the `pages/api` routes as a proxy to an outside API so the API key is never exposed to the client, as the stuff in the pages/api folder is executed server side!

### Understanding the project api structure

What is client side? What is server side? What about `.env` files?

https://nextjs.org/docs/basic-features/environment-variables

```
.
|-- public
`-- src
    |-- lib -> just an arbitrary directory for functions, can be used front- or backend
    |-- components
    |   |-- Card
    |   |-- Grid
    |   |-- Header
    |   |-- Hero
    |   `-- Spinner
    |-- pages
    |   `-- api -> functions in here are exectuted on the server
    |-- styles
    |-- .env.local -> keep secrets here; if they must be available at the frontend, prefix vars with NEXT_PUBLIC_
```

`src/pages/api/movies.ts` provides a server side api route `/api/movies` and is *only* run on the server:
```typescript
// the name doesn't matter as it's the default export
export default async function handler(req: NextApiRequest, res: NextApiResponse<Movies>) {
    const {page, search} = req.query; // grab search params
    // the uppercase variables come form .env.local
    const endpoint = search ? `${SEARCH_BASE_URL}${search}&page=${page}` : `${POPULAR_BASE_URL}&page=${page}`;
    const data = await basicFetch<Movies>(endpoint);

    res.status(200).json(data);
};
```

`src/lib/fetchFunctions` can be used anywhere:

```typescript
import {Movies} from "@/lib/types";

// this function is used by the server side handler function above
export const basicFetch = async <ReturnType>(endPoint: string): Promise<ReturnType> => {
    const response = await fetch(endPoint);
    if (!response.ok) {
        throw new Error("Error!");
    }
    const data = await response.json();
    return data;
}

// this one is used client side in the fetch hook in src/lib/fetchHooks
export const fetchMovies = async (search="", page=1): Promise<Movies> => {
    return await basicFetch<Movies>(`/api/movies?search=${search}&page=${page}`);
}
```

`src/lib/fetchHooks.ts` (client side)

```typescript
export const useFetchMovies = (search: string) => {
    return useInfiniteQuery(['movies', search],
        ({pageParam = 1}) => fetchMovies(search, pageParam),
        {
            getNextPageParam: (lastPage: Movies) => {
                if (lastPage.page < lastPage.total_pages) {
                    return lastPage.page + 1;
                }
                return undefined;
            },
            refetchOnWindowFocus: false
        }
    );
};
```

react query *can* be used server side but then it gets more complicated and out of scope for this course.

### Debouncing

Simple way of debouncing the `setQuery` call in the `SearchInput` component:

```typescript
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
```

### Images and priorization

[image optimization in NextJS](https://nextjs.org/docs/basic-features/image-optimization)

Images can be prioritized in loading with the `priority` prop of the `Image` component. 

Pre-NextJS 13 example:

`<Image priority objectFit={'cover'} objectPosition={'center'} layout={'fill'} src={imgUrl} alt={'Hero image'} />`

NextJS 13+ (when using tailwind, otherwise use inline styles or own classnames:

`<Image priority className={'center object-cover'} fill src={imgUrl} alt={'Hero image'} />`

### Endless scrolling / fetching

Simple way to implement endless scrolling with loading spinner at the bottom:

```tsx
import Link from "next/link";

const Home: NextPage = () => {
    const [query, setQuery] = useState("");

    const {data, fetchNextPage, isLoading, isFetching, error} = useFetchMovies(query);

    const handleScroll = (e: React.UIEvent<HTMLElement>) => {
        const {scrollTop, clientHeight, scrollHeight} = e.currentTarget;

        if (scrollHeight - scrollTop === clientHeight) { // we're at the bottom
            fetchNextPage();
        }
    };
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
```

### Dynamic routes

To access a dynamic page like `/someId`, create a file where the filename is the desired name of the parameter in square brackets, e.g. `src/pages/[id].tsx` (sic).

To simply access the parameter in the frontend, use the next router in the component:

```tsx
 const router = useRouter();
    const id = router.query.id;
```

### Generating static pages dynamically

To render a static page *server side*, export a `getStaticProps` function from the component / page using it.

There the parameter can be accessed by the *context* function parameter passed to getStaticProps.

```tsx
type PropsType = {
    movie: Movie,
    directors: Crew[],
    cast: Cast[]
};

const Movie: NextPage<PropsType> = ({movie, directors, cast}) => {
    return (
        <main>
        <Header/>
            <MovieInfo />
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
```

To regenerate the page on **each request**, use `getServerSideProps` which can be used almost identically (don't use getStaticPaths then as nothing gets pre-generated anyway).

## React query related

`isLoading` is only true on the first load, `isFetching` for every fetch.


## Tailwind related

It's an abomination.

Own classes can be defined and extended in `tailwind.config.js`:

```
//...
 theme: {
    extend: {
      height: {
        "40rem": '40rem'
      },
// ...
```

Now the classname "h-40rem" has the value "40rem" and is available in auto completion.

Class names are order-dependent, e.g. `<div className={'text-center md:text-left'}>` centers text by default and left-aligns at the `md` breakpoint, which is `@media (min-width: 768px)`. See [tailwind responsive design doc](https://tailwindcss.com/docs/responsive-design)

## NextJS unrelated notes

SVGs can be used as jsx elements and animated like any other element (unsurprising but never used it):

```tsx
return (
        <div className={'flex items-center justify-center m-4'}>
            <svg
                className={'w-12 h-12 animate-spin'}
                viewBox="0 0 1 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M21.946 22C21.9818 21.5047 22 21.0045 22 20.5C22 9.17816 12.8218 0 1.5 0C0.995537 0 0.495329 0.0182214 0 0.0540418V5.07165C0.493604 5.02425 0.99397 5 1.5 5C10.0604 5 17 11.9396 17 20.5C17 21.006 16.9757 21.5064 16.9284 22H21.946Z"
                      fill="#D9D9D9"/>
            </svg>
        </div>);
```
