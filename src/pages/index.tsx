import Game from "@/components/Game";
import { Card } from "@/lib/card.types";
import { getRandomCard } from "@/lib/cards";
import { MetaProvider } from "@/lib/meta";

import Image from "next/image";
import Link from "next/link";

type Data = {
  daily: Card;
  currentDate: string;
};

export const getServerSideProps = async (): Promise<{ props: Data }> => {
  const { card, currentDate } = await getRandomCard();
  return { props: { daily: card, currentDate } };
};

export default function Home({ daily, currentDate }: Data) {
  return (
    <MetaProvider daily={daily} measureDiff={new Date(currentDate)}>
      <main className="max-w-screen-lg py-5 mx-auto">
        <Link
          className="block w-32 mb-3 hover:scale-110 transition-transform relative z-30"
          href={"/"}
        >
          <Image
            className="w-full"
            src={"/logo.png"}
            width={288}
            height={143}
            alt="slaydle logo"
          />
        </Link>
        <Game />
      </main>
    </MetaProvider>
  );
}
