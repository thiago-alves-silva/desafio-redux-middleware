// CONSTANTES
const FETCH_STARTED = "user/FETCH_STARTED";
const FETCH_SUCCESS = "user/FETCH_SUCCESS";
const FETCH_ERROR = "user/FETCH_ERROR";

// ACTION CREATORS
const fetchStarted = () => ({ type: FETCH_STARTED });
const fetchSuccess = (data) => ({ type: FETCH_SUCCESS, payload: data });
const fetchError = (error) => ({ type: FETCH_ERROR, payload: error });

export const fetchUser = (token) => async (dispatch) => {
  try {
    const url = "https://dogsapi.origamid.dev/json/api/user";
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    dispatch(fetchStarted());
    const response = await fetch(url, options);
    const json = await response.json();
    if (response.ok) {
      dispatch(fetchSuccess(json));
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
  data: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STARTED:
      return { ...state, loading: true };
    case FETCH_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case FETCH_ERROR:
      return { loading: false, data: null, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
