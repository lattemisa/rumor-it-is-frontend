import axios from "axios";

const rumorItIsApi = axios.create({
  baseURL: "https://rumor-it-is.herokuapp.com/api",
});

export const getTopics = async () => {
  const response = await rumorItIsApi.get("/topics");
  return response.data.topics;
};

export const getArticles = async (topic, query) => {
  let path = `/articles`;
  const response =
    topic !== "trending" && topic !== "user"
      ? await rumorItIsApi.get(path, {
          params: { topic, ...query },
        })
      : await rumorItIsApi.get(path, {
          params: { ...query },
        });
  return response.data.articles;
};

export const getArticle = async (article_id) => {
  const response = await rumorItIsApi.get(`articles/${article_id}`);
  return response.data.article;
};

export const getComments = async (article_id) => {
  const response = await rumorItIsApi.get(`articles/${article_id}/comments`);
  return response.data.comments;
};

export const patchArticlesVote = async (article_id, updatedVote) => {
  const response = await rumorItIsApi.patch(`articles/${article_id}`, {
    inc_votes: updatedVote,
  });
  return response;
};

export const postComment = async (article_id, username, body) => {
  const response = await rumorItIsApi.post(`articles/${article_id}/comments`, {
    username: username,
    body: body,
  });
  return response;
};

export const deleteComment = async (comment_id) => {
  const response = await rumorItIsApi.delete(`articles/${comment_id}`);
  return response;
};
