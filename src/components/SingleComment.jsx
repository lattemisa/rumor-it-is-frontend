import React, { useContext, useEffect, useState } from "react";
import { getNumberOfDaysFromCreation } from "../utils/dataManipulation";
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { UserContext } from "../context/User";
import { deleteComment, getUser } from "../utils/api";

const SingleComment = ({ comments, comment, setComments, setError }) => {
  const { user, isLoggedIn } = useContext(UserContext);
  const [image, setImage] = useState("");

  useEffect(() => {
    getUser(comment.author).then((author) => {
      setImage(author.avatar_url);
    });
  }, [comment]);

  const handleCommentDeletion = (author, comment_id) => {
    if (user === author) {
      deleteComment(comment_id)
        .then((res) => {
          setComments(
            comments.filter((comment) => {
              return comment.comment_id === comment_id;
            })
          );
        })
        .catch((err) => {
          setError(err);
        });
    } else {
      setError(`${user.username} you cannot delete a comment of ${author}`);
    }
  };

  return (
    <div>
      <section className="Article__commentHeader">
        <img className="Article__userImage" src={image} alt="user"></img>
        <p className="Article__author">{comment.author}</p>
        <p>{getNumberOfDaysFromCreation(comment.created_at)} days ago</p>
        <BsFillArrowUpCircleFill className="Article__commentVotingButton" />
        <p className="Article__author">{comment.votes} likes</p>
        <BsFillArrowDownCircleFill className="Article__commentVotingButton" />
        {isLoggedIn && comment.author === user ? (
          <MdDeleteOutline
            className="Article__commentVotingButton"
            onClick={() => {
              handleCommentDeletion(comment.author, comment.comment_id);
            }}
          />
        ) : (
          <MdDeleteOutline className="Article__commentVotingButton_disabled" />
        )}
      </section>

      <p>{comment.body}</p>
    </div>
  );
};

export default SingleComment;
