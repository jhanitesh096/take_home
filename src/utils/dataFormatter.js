export const dateFormatter = (data) => {
  if (data) {
    return data?.slice(0, 10);
  } else {
    return "--";
  }
};
