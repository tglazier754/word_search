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

                    const row = Math.floor(index / size)
                    const column = index % size;
                    return (
                        <div key={`square-${row}-${column}`}>
                            <GridSquare letter={char} row={row} column={column} state={0} />
                        </div>)
                })
            }

        </div>
    )
}

export default Board;