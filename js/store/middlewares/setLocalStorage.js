const setLocalStorage = (store) => (next) => (action) => {
  const result = next(action);
  if (action.localStorage !== undefined) {
    localStorage.setItem(action.localStorage, JSON.stringify(action.payload));
  }
  return result;
};

export default setLocalStorage;
