import type {NextApiRequest, NextApiResponse} from "next";
import {Movies} from "@/lib/types";
import {POPULAR_BASE_URL, SEARCH_BASE_URL} from "@/config";
import {basicFetch} from "@/lib/fetchFunctions";

// the name doesn't matter as it's the default export
export default async function handler(req: NextApiRequest, res: NextApiResponse<Movies>) {
    const {page, search} = req.query; // grab search params
    const endpoint = search ? `${SEARCH_BASE_URL}${search}&page=${page}` : `${POPULAR_BASE_URL}&page=${page}`;
    const data = await basicFetch<Movies>(endpoint);

    res.status(200).json(data);
};
