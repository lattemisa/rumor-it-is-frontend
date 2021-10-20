export const adjustDate = (date) => {
  const date1 = new Date(date);
  let year = date1.getFullYear();
  let month = date1.getMonth() + 1;
  let day = date1.getDate();
  return `${day}/${month}/${year}`;
};

export const getNumberOfDaysFromCreation = (date) => {
  const createdAt = new Date(date);
  const today = new Date();
  var diffDays = parseInt((today - createdAt) / (1000 * 60 * 60 * 24), 10);

  return diffDays;
};
