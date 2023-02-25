import React from 'react';
import Image from "next/image";
import {IMAGE_BASE_URL} from "@/config";

type ThumbPropsType = {
    imgUrl: string;
};

const Thumb = ({imgUrl}: ThumbPropsType) => {
    console.log(imgUrl);
    return (
            <Image src={imgUrl}
                   alt={'Thumbnail'}
                   placeholder={'blur'}
                   blurDataURL={'/placeholder.jpg'}
                   className={'rounded-lg center object-cover'}
                   fill />
    );
};

export default Thumb;
