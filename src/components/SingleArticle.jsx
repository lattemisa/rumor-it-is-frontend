import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/User";
import { getArticle } from "../utils/api";
import { adjustDate } from "../utils/dataManipulation";
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from "react-icons/bs";
import "../styles/SingleArticle.css";
import { useCount } from "../hooks/useCount";
import ListComments from "./ListComments";
import Error from "./Error";

const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [err, setError] = useState(null);
  const { isLoggedIn } = useContext(UserContext);
  const { count, setCount, incCount, decCount } = useCount(article_id);

  useEffect(() => {
    setError(null);
    getArticle(article_id)
      .then((article) => {
        setArticle(article);
        setCount(article.votes);
      })
      .catch((err) => {
        setError(err);
      });
  }, [article_id, setCount]);

  if (err) return <Error setError={setError} err={err} />;
  return (
    <div className="Article__div">
      <section className="Article__header">
        <h2 className="Articles__topicDescription">{article.title}</h2>
        <span className="Article__voting">
          {isLoggedIn && (
            <BsFillArrowUpCircleFill
              className="Article__commentVotingButton"
              onClick={incCount}
            />
          )}
          <p className="Article__author">{count} Likes</p>
          {isLoggedIn && (
            <BsFillArrowDownCircleFill
              className="Article__commentVotingButton"
              onClick={decCount}
            />
          )}
        </span>
        <p className="Article__topic">{article.topic}</p>
      </section>
      <section className="Article__dateAndAuthor">
        <img
          src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2020/05/01/08/avatar-sigourney-weaver.jpg"
          alt="user"
          className="Article__authorImage"
        />
        <h3>
          By {article.author} on {adjustDate(article.created_at)}
        </h3>
      </section>
      <h3 className=""></h3>
      <p className="Article__body">{article.body}</p>
      <ListComments />
    </div>
  );
};

export default SingleArticle;
