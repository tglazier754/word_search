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
                    Array.from(wordBank.entries()).map((word, index) => {
                        return <li style={{
                            textDecoration: word[1] ? "line-through" : "unset",
                            color: word[1] ? "red" : "unset"
                        }} key={`word-list-${index}`}>
                            <span className="text-lg font-bold">{word[0]}</span>
                        </li>
                    })}
            </ul>
        </div>
    )
}

export default WordList;