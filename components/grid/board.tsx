import GridSquare from "./gridSquare";

type BoardProps = {
    size: number;
    wordSearchCharacters: string;
}

export const Board = (props: BoardProps) => {

    const { size, wordSearchCharacters } = props;
    const width = size * 30;


    return (
        <div className={`flex flex-wrap`} style={{ width: `${width}px` }}>

            {
                wordSearchCharacters.split("").map((char, index) => {
                    const row = index % size;
                    const column = Math.floor(index / size)
                    return (
                        <div key={`square-${row}-${column}`}>
                            <GridSquare letter={char} row={row} column={column} />
                        </div>)
                })
            }

        </div>
    )
}

export default Board;