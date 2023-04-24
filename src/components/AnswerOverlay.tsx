import { Card } from "@/lib/card.types";
import { useMetaContext } from "@/lib/meta";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  answer: Card;
};

const getTimeDifference = (diff: number) => {
  const date1 = new Date();
  const date2 = new Date();
  date2.setDate(date1.getDate() + 1);
  date2.setHours(0);
  date2.setMinutes(0);
  date2.setSeconds(0);

  const timeDifference = date2.getTime() - date1.getTime() + diff;
  if (timeDifference < 0) {
    return "00:00:00";
  }

  const hours = Math.floor(timeDifference / 3600000);
  const minutes = Math.floor((timeDifference % 3600000) / 60000);
  const seconds = Math.floor((timeDifference % 60000) / 1000);

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const AnswerOverlay: React.FC<Props> = ({ answer }) => {
  const { timeDiff } = useMetaContext();
  const [timeDifference, setTimeDifference] = useState(() =>
    getTimeDifference(timeDiff)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeDifference(getTimeDifference(timeDiff));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeDiff, setTimeDifference]);
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
          <span>{timeDifference}</span>
        </div>
      </div>
    </div>
  );
};

export default AnswerOverlay;
