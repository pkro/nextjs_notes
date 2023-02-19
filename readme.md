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
