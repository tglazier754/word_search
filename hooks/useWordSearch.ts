import { generateWordGrid, Position } from "@/utils/grid_generation/shared";
import { useMap } from "./useMap";
import { useEffect, useState } from "react";

type UseWordSearchReturn = [
    searchGrid: string[][] | null,
    wordBank: Map<string, WordLocation | null>,
    setWordAsFound: (word: string, location: WordLocation) => void,
]

export type WordLocation = {
    startPos: Position;
    endPos: Position;
}

export function useWordSearch(wordList: string[], rows: number, columns: number): UseWordSearchReturn {


    const [wordBankMap, wordBankActions] = useMap<string, WordLocation | null>(wordList.map((word) => { return [word, null] }));
    const [searchGrid, setSearchGrid] = useState<string[][] | null>(null);

    useEffect(() => {
        const generatedWordSearchGrid = generateWordGrid(wordList, 10, 10);
        generatedWordSearchGrid.then((value) => {
            setSearchGrid(value);
        }).catch((error) => { console.log(error); });
    }, []);

    const setWordAsFound = (word: string, location: WordLocation) => {
        wordBankActions.set(word, location);
    }

    return [searchGrid, wordBankMap, setWordAsFound];


}