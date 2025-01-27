"use client";
import Head from 'next/head';
import styles from "@/styles/Home.module.css";
import WordSearch from '@/components/wordSearch/WordSearch';

const wordBank = ["javascript", "class", "object", "function", "string", "reference", "props", "params"];


export default function Home() {

  //TODO: Make this page a server component that receives a list of words, likely from local storage

  return (
    <div className={styles.container}>
      <Head>
        <title>Word Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Word Search
        </h1>


        <div>
          <WordSearch size={10} wordList={wordBank} />
        </div>



      </main>

      <footer>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
      `}</style>
    </div>
  );
}
