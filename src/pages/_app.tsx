import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Kreon } from "next/font/google";

const kreon = Kreon({ weight: ["300", "400", "600"], subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${kreon.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
