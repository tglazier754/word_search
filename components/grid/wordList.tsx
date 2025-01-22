import { WordLocation } from "@/hooks/useWordSearch";

type WordListProps = {
    wordBank: Map<string, WordLocation | null>
}

export const WordList = (props: WordListProps) => {
    const { wordBank } = props;

    return (
        <div>
            <ul>
                {wordBank &&
                    wordBank.entries().map((word, index) => {
                        console.log(word[1])
                        return <li style={{ textDecoration: word[1] ? "line-through" : "unset" }} key={`word-list-${index}`}>{word[0]}</li>
                    })}
            </ul>
        </div>
    )
}

export default WordList;