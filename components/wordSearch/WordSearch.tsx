import { useEffect, useRef, useState } from "react";
import { generateWordGrid, getPositionsFromPoints, getWordFromPoints, Position } from "@/utils/grid_generation/shared";
import { useMap } from "@/hooks/useMap";
import GridSquare from "../grid/gridSquare";
import { useWordSearch } from "@/hooks/useWordSearch";
import Board from "../grid/board";
import WordList from "../grid/wordList";

type BoardProps = {
    size: number;
    wordList: string[];
}

export const WordSearch = (props: BoardProps) => {

    const { size, wordList } = props;
    const width = size * 30;

    const [searchGrid, wordBank, setWordAsFound] = useWordSearch(wordList, 10, 10);


    return (
        <div className={`flex`}>
            {searchGrid &&
                <Board
                    size={size}
                    wordSearchGrid={searchGrid}
                    wordBank={wordBank}
                    wordFoundAction={setWordAsFound} />
            }
            <WordList wordBank={wordBank} />
        </div>
    )
}

export default WordSearch;