export const setObject = async (key: string, value: string) => {
  await localStorage.setItem(key, value);
};

export const clearStorage = async () => {
  await localStorage.clear();
};

export const getObject = async (key: string) => {
  const ret = await localStorage.get({ key: key });
  if (ret) {
    return ret.value;
  }
  return null;
};

export const storeTokenInLocalStorage = async (token = "") => {
  await setObject("tid", token.toString());
};
