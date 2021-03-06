import axios from "axios";
import * as actions from "../api";

axios.defaults.baseURL = "http://localhost:3000/api";
// axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    console.log("Network Error", error); // log error
    // toast.error("Network error."); //display a genereic message
  }
  return Promise.reject(error);
});

export function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

const api =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    try {
      if (
        action.payload.config.hasCustomAct &&
        action.type === actions.apiCallBegan.type
      ) {
        const { customActMapper } = action.payload.config;
        return customActMapper(dispatch, action);
      }
    } catch (err) {}

    if (action.type !== actions.apiCallBegan.type) return next(action);

    const { url, method, data, onStart, onSuccess, onError, isMock, config } =
      action.payload;
    if (isMock) {
      axios.defaults.baseURL = url;
    }
    if (onStart) dispatch({ type: onStart, payload: { data, url } });
    next(action);
    try {
      const response = await axios.request({
        url,
        method,
        data,
      });
      //General
      dispatch(actions.apiCallSuccess(response.data));
      //Specific
      if (Boolean(action.payload.isMock)) {
        dispatch({
          type: onSuccess,
          payload: { data: response.data, isMock, config },
        });
      } else if (onSuccess)
        dispatch({ type: onSuccess, payload: response.data, config });
    } catch (error) {
      //General
      dispatch(actions.apiCallFailed(error.message));
      //Specific
      if (onError) {
        try {
          if (
            (error.response &&
              (error.response.status === 400 ||
                error.response.status === 403 ||
                error.response.status === 401)) ||
            error.response.status === 405 ||
            error.response.status === 404
          ) {
            if (error.response.data) {
              const errorMessage = error.response.data;
              dispatch({ type: "error", payload: { message: errorMessage } });
            }
            dispatch({ type: onError, payload: error.response.data });
          } else dispatch({ type: onError, payload: error.message });
        } catch (error) {
          console.log(error);
          dispatch({ type: onError, payload: error });
        }
      }
    }
  };

export default api;
