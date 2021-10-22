import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/User";
import { postComment, getComments } from "../utils/api";
import Error from "./Error";
import "../styles/SingleArticle.css";
import SingleComment from "./SingleComment";

const ListComments = () => {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const { user, isLoggedIn } = useContext(UserContext);
  const [addComment, setAddComment] = useState("");
  const [err, setError] = useState(null);

  useEffect(() => {
    getComments(article_id).then((comments) => {
      setComments(comments);
    });
  });

  const postNewComment = (e) => {
    e.preventDefault();
    if (addComment !== "") {
      postComment(article_id, user, addComment)
        .then((res) => {})
        .catch((err) => {
          setError(err);
        });
      setAddComment("");
    } else {
      setError("Add content to your comment.");
    }
  };

  if (err) return <Error setError={setError} err={err} />;

  return (
    <div>
      <section className="Article__commentSection">
        <h3>Comments</h3>
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

        <ul className="Article__listComments">
          {comments
            .sort((a, b) => {
              return b.created_at - a.created_at;
            })
            .map((comment) => {
              return (
                <li key={comment.comment_id} type="none">
                  <SingleComment
                    comment={comment}
                    comments={comments}
                    setComments={setComments}
                    setError={setError}
                  />
                </li>
              );
            })}
        </ul>
      </section>
    </div>
  );
};

export default ListComments;
