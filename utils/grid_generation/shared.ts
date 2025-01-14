type WeightedWord = {
    value: string;
    weight: number;
    availableSlots?: { row: number, column: number, direction: number }[];
    gridBeforePlacement?: string[][];
}

const characters = "abcdefghijklmnopqrstuvwxyz";

export const generateWordGrid = (wordList: string[], rows: number = 10, columns: number = 10): Promise<string[][]> => {

    const letterMap: Map<string, number> = getStringArrayFrequencyDistribution(wordList);

    const weightedWordList: WeightedWord[] = getWeightedWordList(wordList, letterMap);

    weightedWordList.sort(weightedWordSortFunction);

    const { grid, status } = createWordSearch(weightedWordList, rows, columns);

    return new Promise<string[][]>((resolve, reject) => {
        if (status === "success") {

            resolve(grid);
        }
        else {
            reject("the puzzle cannot be made");
        }
    });

}

function createWordSearch(wordList: WeightedWord[], rows: number = 10, columns: number = 10): { grid: string[][], status: string } {

    let grid: string[][] = new Array(rows).fill(" ").map(() => new Array(columns).fill(" "));
    let index = 0;
    let unsolvable = false;

    while (index < wordList.length && !unsolvable) {
        const currentWord = wordList[index];
        if (!currentWord.availableSlots) {
            const availableWordSlots = generateWordSlots(grid, currentWord.value);
            currentWord.availableSlots = availableWordSlots;
        }
        //save the grid state before placing the word, in case we need to go back
        currentWord.gridBeforePlacement = grid;
        //place the word using a random slot
        const tempPositions = currentWord.availableSlots;
        const selectedPosition = Math.floor(Math.random() * tempPositions.length);
        const position = tempPositions[selectedPosition];
        tempPositions.splice(selectedPosition, 1);
        currentWord.availableSlots = tempPositions;
        if (position) {
            placeWord(grid, currentWord.value, position?.row, position?.column, position?.direction);
            index += 1;
        }
        else {
            //remove the available slots from the words that are forward in the list, they need to be reset
            for (var i = index; i < wordList.length; i++) {
                wordList[i].availableSlots = undefined;
            }
            if (index - 1 === -1) {
                unsolvable = true;
            }
            if (wordList[index = 1].gridBeforePlacement !== undefined) {
                grid = wordList[index = 1].gridBeforePlacement!;
            }
            index -= 1;
        }
    }

    if (unsolvable) {
        return { grid, status: "error" }
    }
    else {
        //fill in the rest with random letters
        replaceSpacesWithLetters(grid);
        return { grid, status: 'success' }
    }

}

function replaceSpacesWithLetters(grid: string[][]) {
    for (var row = 0; row < grid.length; row++) {
        for (var col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === ' ') {
                grid[row][col] = characters.charAt(Math.floor(Math.random() * characters.length));
            }
        }
    }
}


function generateWordSlots(grid: string[][], word: string): { row: number, column: number, direction: number }[] {
    const slots: { row: number, column: number, direction: number }[] = [];
    let directions = [0, 1, 2, 3, 4, 5, 6, 7];
    for (var row = 0; row < grid.length; row++) {
        for (var col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === ' ' || word.indexOf(grid[row][col]) !== -1) {
                for (var dir = 0; dir < directions.length; dir++) {
                    const wordInterferes = checkIfWordInterferes(grid, word, row, col, dir);
                    if (!wordInterferes) {
                        slots.push({ row, column: col, direction: dir });
                    }

                }
            }
        }
    }
    return slots;

}

function placeWord(grid: string[][], word: string, row: number, column: number, direction: number): string[][] {
    let letterRow = row;
    let letterCol = column;

    for (var i = 0; i < word.length; i++) {
        grid[letterRow][letterCol] = word.charAt(i);
        const newPosition = increasePointerInDirection(letterRow, letterCol, direction);
        letterRow = newPosition.row;
        letterCol = newPosition.column;
    }
    return grid;
}

//this does not check for what the initial letter is, that will have been confirmed previously
//also assumed that the rows are all the same length
function checkIfWordInBounds(grid: string[][], word: string, row: number, column: number, direction: number) {
    //0 = N
    //1 = S
    //2 = E
    //3 = W
    //4 = NW
    //5 = SW
    //6 = SE
    //7 = NE
    const width = grid[0].length;
    if ((direction === 0 && row < word.length - 1) ||
        (direction === 1 && row + word.length > grid.length - 1) ||
        (direction === 2 && column + word.length > width - 1) ||
        (direction === 3 && column < word.length - 1) ||
        (direction === 4 && (row < word.length - 1 || column < word.length - 1)) ||
        (direction === 5 && (row + word.length > grid.length - 1 || column < word.length - 1)) ||
        (direction === 6 && (row + word.length > grid.length - 1 || column + word.length > width - 1)) ||
        (direction === 7 && (row < word.length - 1 || column + word.length > width - 1))
    ) {
        return false;
    }
    else {
        return true;
    }

}

//assume the word does not go out of bounds, should have been checked already
//assume the starting point has been verified and that the space doesn't need to be checked
function checkIfWordInterferes(grid: string[][], word: string, row: number, column: number, direction: number) {

    const isInBounds = checkIfWordInBounds(grid, word, row, column, direction);
    if (isInBounds) {
        const wordAsArray: string[] = word.split("");
        //console.log(direction);
        if (wordAsArray && grid) {

            let pointer = { row, column };
            //console.log(pointer);
            //console.log(grid[pointer.row][pointer.column]);
            let counter = 0;
            let interferes = false;
            while (!interferes && counter < wordAsArray.length) {
                const gridValue = grid[pointer.row][pointer.column];
                if (!(gridValue === ' ' || gridValue === wordAsArray[counter])) {
                    interferes = true;
                }
                pointer = increasePointerInDirection(pointer.row, pointer.column, direction);
                //console.log(pointer);
                counter++;
            }
            return interferes;

        }
    }
    else return true;
}

function increasePointerInDirection(row: number, column: number, direction: number) {
    //0 = N
    //1 = S
    //2 = E
    //3 = W
    //4 = NW
    //5 = SW
    //6 = SE
    //7 = NE
    switch (direction) {
        case 0:
            return { row: row - 1, column: column };
        case 1:
            return { row: row + 1, column: column };
        case 2:
            return { row: row, column: column + 1 };
        case 3:
            return { row: row, column: column - 1 };
        case 4:
            return { row: row - 1, column: column - 1 };
        case 5:
            return { row: row + 1, column: column - 1 };
        case 6:
            return { row: row + 1, column: column + 1 };
        case 7:
            return { row: row - 1, column: column + 1 };
        default:
            return { row, column };
            break;
    }

}


function weightedWordSortFunction(a: WeightedWord, b: WeightedWord): number {
    if (a.weight < b.weight) return 1;
    if (a.weight > b.weight) return -1;
    return 0;
}

function getStringArrayFrequencyDistribution(arr: string[]): Map<string, number> {
    const map: Map<string, number> = new Map();
    arr.forEach((word) => {
        word.split("").forEach((letter) => {
            const prevValue = map.get(letter);
            const newValue = prevValue === undefined ? 1 : prevValue + 1;
            map.set(letter, newValue);
        })
    })
    return map;
}

function getWeightedWordList(wordList: string[], frequencyDistribution: Map<string, number>): WeightedWord[] {
    return wordList.map((word) => {
        let weight = 0;
        word.split("").forEach((letter) => {
            weight += frequencyDistribution.get(letter) || 0;
        })
        weight = Math.ceil(weight + word.length);
        return { value: word, weight: weight };
    })
}

function shuffle(array: any[]) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}