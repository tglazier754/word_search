
type GridSquareProps = {
    letter: string;
    row: number;
    column: number;
    clickHandler: (row: number, column: number) => void;
    state: number; //0-default, 1-clicked, 2-highlighted
}

export const GridSquare = (props: GridSquareProps) => {

    const { letter, row, column, state, clickHandler } = props;

    const triggerEvent = (el: Node, eventType: string, detail: any) =>
        el.dispatchEvent(new CustomEvent(eventType, { detail }));

    const handleClick = () => {
        clickHandler && clickHandler(row, column);
        //triggerEvent(document, 'grid-click', { row, column });
    }

    return (
        <div
            className={`square-${row}-${column} flex align-middle justify-center w-full h-full`}
            style={{ width: "30px", height: "30px", color: state === 1 ? "red" : "black" }}
            onClick={handleClick}
        >
            <span>{letter}</span>
        </div>
    )
}

export default GridSquare;