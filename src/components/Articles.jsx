import React, { useContext, useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import "../styles/Articles.css";
import { adjustDate } from "../utils/dataManipulation";
import { Redirect, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../context/User";

const Articles = ({ topics }) => {
  const { topic } = useParams();
  const { user } = useContext(UserContext);
  const orderAsc = JSON.stringify({ order: "asc" });
  const orderDesc = JSON.stringify({ order: "desc" });
  const sortByVotes = JSON.stringify({ sort_by: "votes" });
  const [filter, setFilter] = useState(orderAsc);
  const [articles, setArticles] = useState([]);
  const [topicDescription, setTopicDescription] = useState("Trending now...");

  useEffect(() => {
    const query = JSON.parse(filter);
    addHeader(query);
    getArticles(topic, query).then((articles) => {
      if (query.sort_by === "author") {
        const authorsArticles = articles.filter((article) => {
          return article.author === user;
        });
        setArticles(authorsArticles);
      } else setArticles(articles);
    });
  }, [topic, filter]);

  const addHeader = (query) => {
    if (topic !== "trending" && topic !== "user") {
      const description = topics.filter((t) => {
        return t.slug === topic;
      });
      setTopicDescription(
        description !== undefined && description[0].description
      );
    } else if (topic === "user") {
      setTopicDescription(`Hello ${user}`);
      query.sort_by = "author";
    } else {
      setTopicDescription("Trending now...");
    }
  };

  return (
    <div className="Articles__article_card">
      <section className="Articles__topicAndFilter">
        {topic !== "user" ? (
          <h2 className="Articles__topicDescription">{topicDescription}</h2>
        ) : (
          <span className="Articles__topicDescription">
            <img
              src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2020/05/01/08/avatar-sigourney-weaver.jpg"
              alt="user"
              className="Article__authorImage"
            />
            <h2>{topicDescription}</h2>
            <p>These are your articles...</p>
          </span>
        )}
        <p></p>
        {topic !== "user" && (
          <select
            className="Articles__topicFilterBar"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          >
            <option value={orderAsc}>Newest</option>
            <option value={orderDesc}>Oldest</option>
            <option value={sortByVotes}>Most Rated</option>
          </select>
        )}
      </section>

      {articles.map((article) => {
        return (
          <Link
            to={`/article/${article.article_id}`}
            className="Articles__card"
            key={article.article_id}
          >
            <h3 className="Articles__title">{article.title}</h3>
            <button className="Articles__votingButton">
              {article.votes} Likes
            </button>
            <h4 className="Articles__dateAndAuthor">
              {adjustDate(article.created_at)} by {article.author}
            </h4>
            <p></p>
            <p className="Articles__body">
              {article.body.substring(0, 100) + "..."}
            </p>

            <button className="Articles__commentCount">
              {article.comment_count} C
            </button>
          </Link>
        );
      })}
    </div>
  );
};

export default Articles;
