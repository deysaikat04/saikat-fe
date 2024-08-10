export const setObject = async (key: string, value: string) => {
  await localStorage.setItem(key, value);
};

export const clearStorage = async () => {
  await localStorage.clear();
};

export const getObject = async (key: string) => {
  const ret = await localStorage.getItem(key);
  if (ret) {
    return ret;
  }
  return null;
};

export const storeTokenInLocalStorage = async (token = "") => {
  await setObject("tid", token.toString());
};
