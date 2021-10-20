import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/User";
import {
  getArticle,
  getComments,
  patchArticlesVote,
  postComment,
} from "../utils/api";
import {
  adjustDate,
  getNumberOfDaysFromCreation,
} from "../utils/dataManipulation";
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from "react-icons/bs";
import "../styles/SingleArticle.css";
import { useCount } from "../hooks/useCount";

const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const { user, isLoggedIn } = useContext(UserContext);
  const { count, setCount, incCount, decCount } = useCount(article_id);
  const [addComment, setAddComment] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    getArticle(article_id).then((article) => {
      setArticle(article);
      setCount(article.votes);
    });
    getComments(article_id).then((comments) => {
      setComments(comments);
    });
  }, [comment]);

  const postNewComment = (e) => {
    e.preventDefault();
    postComment(article_id, user, addComment).then((res) => {
      setComment(res);
    });
    setAddComment("");
  };
  return (
    <div className="Article__div">
      <section className="Articles__topicAndFilter">
        <h2 className="Articles__topicDescription">{article.title}</h2>
        <button className="Articles__topicFilterBar">{article.topic}</button>
        <span>
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
      </section>
      <h3 className="Article__dateAndAuthor">
        <img
          src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2020/05/01/08/avatar-sigourney-weaver.jpg"
          alt="user"
          className="Article__authorImage"
        />
        {article.author} on {adjustDate(article.created_at)}
      </h3>
      <p className="Article__body">{article.body}</p>

      <section className="Article__commentSection">
        <h3 className="Article__dateAndAuthor">Comments</h3>
        {isLoggedIn && (
          <form onSubmit={postNewComment}>
            <input
              onChange={(e) => {
                setAddComment(e.target.value);
              }}
              value={addComment}
              className="Article__addComment"
              type="text"
              placeholder={`${user}, add your comment...`}
            ></input>
            <button type="submit">Add comment</button>
          </form>
        )}

        <ul>
          {comments
            .sort((a, b) => {
              return b.created_at - a.created_at;
            })
            .map((comment) => {
              return (
                <li key={comment.comment_id} type="none">
                  <section className="Article__commentHeader">
                    <img
                      className="Article__userImage"
                      src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2020/05/01/08/avatar-sigourney-weaver.jpg"
                      alt="user image"
                    ></img>
                    <p className="Article__author">{comment.author}</p>
                    <p>
                      {getNumberOfDaysFromCreation(comment.created_at)} days ago
                    </p>
                    <BsFillArrowUpCircleFill className="Article__commentVotingButton" />
                    <p className="Article__author">{comment.votes} likes</p>
                    <BsFillArrowDownCircleFill className="Article__commentVotingButton" />
                  </section>

                  <p>{comment.body}</p>
                </li>
              );
            })}
        </ul>
      </section>
    </div>
  );
};

export default SingleArticle;
