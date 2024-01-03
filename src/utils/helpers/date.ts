export const formatDate = (date: string) => {
  const dateObj = new Date(date);

  const formattedDate = dateObj.toLocaleDateString("en-US");
  return formattedDate;
};
