import type { Metadata } from "next";
import TopMenu from "@/components/navigation/topMenu";
import "../../styles/global.css";

export const metadata: Metadata = {
    title: "Word Search",
    description: "Word Search",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html suppressHydrationWarning lang="en">
            <body>
                <header>

                </header>
                <main className="max-w-screen w-full h-full max-h-full absolute">
                    <div className="absolute flex justify-center h-full max-h-full w-full max-w-full flex-col">

                        <div className="h-16 flex-grow-0 flex-shrink-0">
                            <TopMenu />
                        </div>
                        <div className="max-w-screen w-full flex-1 justify-self-center overflow-y-auto">
                            {children}
                        </div>
                    </div>

                </main>

            </body>
        </html>
    );
}
