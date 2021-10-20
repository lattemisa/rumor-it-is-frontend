import { useState } from "react";
import { patchArticlesVote } from "../utils/api";

export const useCount = (article_id) => {
  const [count, setCount] = useState(0);
  const incCount = () => {
    setCount((currCount) => {
      return currCount + 1;
    });
    patchArticlesVote(article_id, 1)
      .then((response) => {})
      .catch((err) => {
        console.dir(err);
      });
  };
  const decCount = () => {
    setCount((currCount) => {
      return currCount - 1;
    });
    patchArticlesVote(article_id, -1)
      .then((response) => {})
      .catch((err) => {
        console.dir(err);
      });
  };
  return { count, setCount, incCount, decCount };
};
