import { Card } from "@/lib/card.types";
import Image from "next/image";

type Props = {
  answer: Card;
};

const AnswerOverlay: React.FC<Props> = ({ answer }) => {
  return (
    <div className="fixed z-10 top-0 left-0 bottom-0 right-0">
      <div className="z-0 absolute top-0 left-0 bottom-0 right-0 bg-black opacity-80"></div>
      <div className="overflow-y-auto animate-up relative w-screen h-screen flex p-5">
        <div className="w-72 text-2xl md:text-4xl text-center max-w-full z-20 relative my-auto mx-auto">
          <span className="mb-4">Today&apos;s Card</span>
          <Image
            src={answer.url}
            className="mb-4"
            alt="An image of the winning card"
            width={300}
            height={480}
          />
          <div className="text-xl">next card:</div>
          <span>00:00:00</span>
        </div>
      </div>
    </div>
  );
};

export default AnswerOverlay;
