import {Movies} from "@/lib/types";

export const basicFetch = async <ReturnType>(endPoint: string): Promise<ReturnType> => {
    const response = await fetch(endPoint);
    if (!response.ok) {
        throw new Error("Error!");
    }
    const data = await response.json();
    return data;
}

export const fetchMovies = async (search="", page=1): Promise<Movies> => {
    return await basicFetch<Movies>(`/api/movies?search=${search}&page=${page}`);
}
