export const isMinTwoWords = (value: any) => {
  const words = value.split(/\s+/);
  return words.length >= 2;
};
