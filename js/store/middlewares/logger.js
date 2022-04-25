const logger = (store) => (next) => (action) => {
  console.group(action.type || "FUNCTION");
  console.log("PREV_STORE", store.getState());
  const result = next(action);
  console.log("CURRENT_STORE", store.getState());
  console.groupEnd();
  return result;
};

export default logger;
