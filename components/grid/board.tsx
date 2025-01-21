import { useEffect, useRef, useState } from "react";
import GridSquare from "./gridSquare";
import { getPositionsFromPoints, getWordFromPoints, Position } from "@/utils/grid_generation/shared";
import { useMap } from "@/hooks/useMap";

type BoardProps = {
    size: number;
    wordBank: string[];
    wordSearchGrid: string[][];
}


type WordLocation = {
    startPos: Position;
    endPos: Position;
}

type FoundWord = WordLocation & {
    word: string;
}

export const Board = (props: BoardProps) => {

    const { size, wordSearchGrid, wordBank } = props;
    const width = size * 30;

    const isInitialPoint = useRef<boolean>(true);//to alternate start/end of selected word
    const firstSelection = useRef<{ row: number, column: number } | null>(null);
    const secondSelection = useRef<{ row: number, column: number } | null>(null);
    const [wordBankMap, wordBankActions] = useMap<string, WordLocation | null>(wordBank.map((word) => { return [word, null] }));
    //const [selectedWordPositions, setSelectedWordPositions] = useState<Position[]>([]);
    //string key is of shape "row-column"
    const [selectedWordPositionsMap, selectedWordPositionsMapActions] = useMap<string, boolean>();

    const clickHandler = (row: number, column: number) => {
        if (isInitialPoint.current) {
            firstSelection.current = { row, column };
        }
        else {
            secondSelection.current = { row, column };
        }
        isInitialPoint.current = !isInitialPoint.current;
        if (firstSelection.current && secondSelection.current) {
            //determine if the path made is valid
            const selectedWord = getWordFromPoints(wordSearchGrid, firstSelection.current, secondSelection.current);
            if (selectedWord && wordBank.lastIndexOf(selectedWord) !== -1) {
                wordBankActions.set(selectedWord, { startPos: firstSelection.current, endPos: secondSelection.current });
                const positions = getPositionsFromPoints(firstSelection.current, secondSelection.current);
                positions.forEach((position) => {
                    selectedWordPositionsMapActions.set(`${position.row}-${position.column}`, true);
                });

            }
            firstSelection.current = null;
            secondSelection.current = null;
        }
    }

    return (
        <div className={`flex flex-wrap`} style={{ width: `${width}px` }}>
            {
                wordSearchGrid.map((row, rowIndex) => {
                    return row.map((letter, columnIndex) => {
                        //const col = rowIndex > 0 ? rowIndex * columnIndex : columnIndex;
                        const state = selectedWordPositionsMap.has(`${rowIndex}-${columnIndex}`) ? 1 : 0;
                        return (
                            <div key={`square-${rowIndex}-${columnIndex}`}>
                                <GridSquare clickHandler={clickHandler} letter={letter} row={rowIndex} column={columnIndex} state={state} />
                            </div>)
                    })
                })
            }
        </div>
    )
}

export default Board;