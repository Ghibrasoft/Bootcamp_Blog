export const formatDate = (date: string) => {
  const dateObj = new Date(date);

  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1; // months are zero-based
  const year = dateObj.getFullYear();

  // ensure two-digit format for day and month
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  const formattedDate = `${formattedMonth}.${formattedDay}.${year}`;
  return formattedDate;
};
