"use client";
import Head from 'next/head';
import styles from "@/styles/Home.module.css";
import { generateWordGrid, getWordFromPoints } from '@/utils/grid_generation/shared';
import { useEffect, useRef, useState } from 'react';
import Board from '@/components/grid/board';
import { useMap } from '@/hooks/useMap';

const wordBank = ["test", "hershey", "string", "murphy", "gorillas", "metallica"];


export default function Home() {

    //TODO: Make this page a server component that receives a list of words, likely from local storage

    const [searchGrid, setSearchGrid] = useState<string[][] | null>(null);


    useEffect(() => {
        const generatedWordSearchGrid = generateWordGrid(wordBank, 10, 10);
        generatedWordSearchGrid.then((value) => {
            setSearchGrid(value);
        }).catch((error) => { console.log(error); });
    }, []);

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

                {searchGrid ?
                    <div>
                        <Board size={10} wordSearchGrid={searchGrid} wordBank={wordBank} />
                    </div> : null
                }



            </main>

            <footer>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
                </a>
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
