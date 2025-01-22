import { useRef } from "react";
import GridSquare from "./gridSquare";
import { getPositionsFromPoints, getWordFromPoints, Position } from "@/utils/grid_generation/shared";
import { useMap } from "@/hooks/useMap";

type BoardProps = {
    size: number;
    wordSearchGrid: string[][];
    wordBank: Map<string, WordLocation | null>;
    wordFoundAction: (word: string, location: WordLocation) => void;
}


type WordLocation = {
    startPos: Position;
    endPos: Position;
}

type FoundWord = WordLocation & {
    word: string;
}

export const Board = (props: BoardProps) => {

    const { size, wordSearchGrid, wordBank, wordFoundAction } = props;

    let isInitialPoint = true;//to alternate start/end of selected word
    let firstSelection: Position | null = null;
    let secondSelection: Position | null = null;
    //string key is of shape "row-column"
    const [selectedWordPositionsMap, selectedWordPositionsMapActions] = useMap<string, boolean>();

    const gridSquareClickHandler = (row: number, column: number) => {
        if (isInitialPoint) {
            firstSelection = { row, column };
        }
        else {
            secondSelection = { row, column };
        }
        isInitialPoint = !isInitialPoint;
        if (firstSelection && secondSelection) {
            const selectedWord = getWordFromPoints(wordSearchGrid, firstSelection, secondSelection);
            if (selectedWord && wordBank.has(selectedWord)) {
                wordFoundAction(selectedWord, { startPos: firstSelection, endPos: secondSelection });
                const positions = getPositionsFromPoints(firstSelection, secondSelection);
                positions.forEach((position) => {
                    selectedWordPositionsMapActions.set(`${position.row}-${position.column}`, true);
                });
            }

        }
    }

    return (
        <div className={`gap-2`} style={{ display: "grid", gridTemplateColumns: `repeat(${size}, 1fr)` }}>
            {
                wordSearchGrid.map((row, rowIndex) => {
                    return row.map((letter, columnIndex) => {
                        const state = selectedWordPositionsMap.has(`${rowIndex}-${columnIndex}`) ? 1 : 0;
                        return (
                            <div key={`square-${rowIndex}-${columnIndex}`}>
                                <GridSquare clickHandler={gridSquareClickHandler} letter={letter} row={rowIndex} column={columnIndex} state={state} />
                            </div>)
                    })
                })
            }
        </div>
    )
}

export default Board;