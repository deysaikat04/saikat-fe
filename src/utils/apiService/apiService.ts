import axios, { AxiosRequestConfig } from "axios";
import { BASE_API_URL } from "../../constants";
import { getObject } from "../localStorage";

class ApiService {
  constructor() {
    // listener to update token in axios header when token changes in localstorage in other open tabs
    window.addEventListener("storage", async () => {
      const localStorageToken: string | null = await getObject("tid");
      if (localStorageToken) {
        axios.defaults.headers.common[
          "authorization"
        ] = `bearer ${localStorageToken}`;
      }
    });

    axios.interceptors.request.use(async function (config) {
      // if (!config.headers) {
      //   throw new Error("Expected `config.headers` to not be undefined");
      // }
      // const expirationTime = await getObject("txp");
      // const currentTimeInMs = new Date().getTime();
      // const expirationTimeInMs =
      //   new Date(expirationTime || "").getTime() - FIVE_MINUTES_IN_MILLISECONDS;
      // if (expirationTimeInMs < currentTimeInMs) {
      //   await firebase.auth().currentUser?.reload();
      //   const token = await firebase.auth().currentUser?.getIdToken(true);
      //   const idTokenResult = await firebase
      //     .auth()
      //     .currentUser?.getIdTokenResult(true);
      //   await storeTokenInLocalStorage({
      //     token,
      //     expirationTime: idTokenResult?.expirationTime,
      //   });
      //   config.headers.authorization = `bearer ${token}`;
      //   axios.defaults.headers.common["authorization"] = `bearer ${token}`;
      // }

      const localStorageToken: string | null = await getObject("tid");
      if (localStorageToken) {
        config.headers.authorization = `bearer ${localStorageToken}`;
        axios.defaults.headers.common[
          "authorization"
        ] = `bearer ${localStorageToken}`;
      }
      return config;
    });
  }

  get(url: string, config: AxiosRequestConfig = {}) {
    return axios.get(BASE_API_URL + url, config);
  }
  delete(url: string, config: AxiosRequestConfig = {}) {
    return axios.delete(BASE_API_URL + url, config);
  }
  post(
    url: string,
    payload?: Record<string, unknown> | FormData,
    config: AxiosRequestConfig = {}
  ) {
    return axios.post(BASE_API_URL + url, payload, config);
  }
  put(
    url: string,
    payload: Record<string, unknown>,
    config: AxiosRequestConfig = {}
  ) {
    return axios.put(BASE_API_URL + url, payload, config);
  }
  patch(
    url: string,
    payload?: Record<string, unknown>,
    config: AxiosRequestConfig = {}
  ) {
    return axios.patch(BASE_API_URL + url, payload, config);
  }
  setHeader(headerName: string, value: string) {
    axios.defaults.headers.common[headerName] = value;
  }
}

const apiService = new ApiService();
export default apiService;
