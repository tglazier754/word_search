
type GridSquareProps = {
    letter: string;
    row: number;
    column: number;
    clickHandler: (row: number, column: number) => void;
    state: number; //0-default, 1-clicked, 2-highlighted
}

export const GridSquare = (props: GridSquareProps) => {

    const { letter, row, column, state, clickHandler } = props;

    const handleClick = () => {
        clickHandler && clickHandler(row, column);
    }

    const classes = () => {
        if (state === 0) {
            return "bg-gray-100 hover:bg-gray-300";
        }
        if (state === 1) {
            return "bg-rose-100 hover:bg-rose-300";
        }
    }

    return (
        <div
            className={`square-${row}-${column} rounded-sm flex align-middle justify-center w-full h-full ${classes()}`}
            style={{ width: "30px", height: "30px" }}
            onClick={handleClick}
        >
            <span>{letter}</span>
        </div>
    )
}

export default GridSquare;