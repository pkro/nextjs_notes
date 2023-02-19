import React from 'react';
import {useRouter} from "next/router";
import topics from "@/pages/api/topics";
import {Layout} from "@/components/Layout";

type nextjsPropsType = {};

export default ({}: nextjsPropsType) => {
    const router = useRouter();
    const name = router.query.name;
    const topic = topics.find((topic) => topic.id === name);

    return (<Layout><h1>Learn {name}</h1>
        <p>
            {topic && topic.about}
        </p></Layout>);
};

