export const getQueryString = (queries, isGetAll = true) => {
  const queriesArr = Object.entries(queries).reduce((result, [key, value]) => {
    if (isGetAll) return result.concat(`${key}=${value}`);
    if (key !== "skip" && key !== "limit") {
      return result.concat(`${key}=${value}`);
    }
    return result;
  }, []);
  return queriesArr.join("&");
};
