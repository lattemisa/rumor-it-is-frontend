import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/User";
import { deleteComment, postComment } from "../utils/api";
import { getNumberOfDaysFromCreation } from "../utils/dataManipulation";
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import "../styles/SingleArticle.css";

const ListComments = ({ comments, setComment }) => {
  const { article_id } = useParams();
  const { user, isLoggedIn } = useContext(UserContext);
  const [addComment, setAddComment] = useState("");

  const postNewComment = (e) => {
    e.preventDefault();
    postComment(article_id, user, addComment).then((res) => {
      setComment(res);
    });
    setAddComment("");
  };

  const handleCommentDeletion = (author, comment_id) => {
    if (user === author) {
      deleteComment(comment_id)
        .then((res) => {
          setComment(res);
        })
        .catch((err) => {
          console.dir(err);
        });
    }
  };
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
                    {isLoggedIn ? (
                      <MdDeleteOutline
                        disabled={user !== comment.author}
                        className="Article__commentVotingButton"
                        onClick={() => {
                          handleCommentDeletion(
                            comment.author,
                            comment.comment_id
                          );
                        }}
                      />
                    ) : (
                      <p></p>
                    )}
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

export default ListComments;
