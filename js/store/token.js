import getLocalStorage from "./helper/getLocalStorage.js";

// CONSTANTES
const FETCH_STARTED = "token/FETCH_STARTED";
const FETCH_SUCCESS = "token/FETCH_SUCCESS";
const FETCH_ERROR = "token/FETCH_ERROR";

// ACTION CREATORS
const fetchStarted = () => ({ type: FETCH_STARTED });
const fetchSuccess = (data) => ({
  type: FETCH_SUCCESS,
  payload: data,
  localStorage: "token",
});
const fetchError = (error) => ({ type: FETCH_ERROR, payload: error });
export const fetchToken = (user) => async (dispatch) => {
  try {
    const url = "https://dogsapi.origamid.dev/json/jwt-auth/v1/token";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    dispatch(fetchStarted());
    const response = await fetch(url, options);
    const json = await response.json();
    if (response.ok) {
      dispatch(fetchSuccess(json.token));
    } else {
      throw new Error(json.message);
    }
  } catch (error) {
    console.error(error.message);
    dispatch(fetchError(error.message));
  }
};

const initialState = {
  loading: false,
  data: getLocalStorage("token", null),
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STARTED:
      return { ...state, loading: true };
    case FETCH_SUCCESS:
      return { loading: false, data: action.payload, error: null };
    case FETCH_ERROR:
      return { loading: false, data: null, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
