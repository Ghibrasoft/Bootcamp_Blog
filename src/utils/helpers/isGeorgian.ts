export const isGeorgian = (value: any) => {
  const georgianRegex = /^[\u10A0-\u10FF\s]+$/;
  return georgianRegex.test(value);
};
