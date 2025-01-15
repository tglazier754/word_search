
type GridSquareProps = {
    letter: string;
    row: number;
    column: number;
}

export const GridSquare = (props: GridSquareProps) => {


    const { letter, row, column } = props;

    return (
        <div className={`square-${row}-${column} flex align-middle justify-center w-full h-full`} style={{ width: "30px", height: "30px" }}>
            <span>{letter}</span>
        </div>
    )
}

export default GridSquare;