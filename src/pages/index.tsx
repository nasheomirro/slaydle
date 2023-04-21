import Game from "@/components/Game";
import { Card } from "@/lib/card.types";
import { getRandomCard } from "@/lib/cards";

type Data = {
  daily: Card;
};

export const getServerSideProps = async (): Promise<{ props: Data }> => {
  const dailyCard: Card = await getRandomCard();
  return { props: { daily: dailyCard } };
};

export default function Home({ daily }: Data) {
  return (
    <main>
      <Game answer={daily} />
    </main>
  );
}
