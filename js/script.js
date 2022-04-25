import store from "./store/configureStore.js";
import { fetchToken } from "./store/token.js";
import { fetchUser } from "./store/user.js";

const login = async () => {
  let token = store.getState().token.data;
  if (!token) {
    await store.dispatch(fetchToken({ username: "dog", password: "dog" }));
    token = store.getState().token.data;
  }
  store.dispatch(fetchUser(token));
};

const render = () => {
  const state = store.getState();
  const tokenStatusElement = document.querySelector("#token");
  const userStatusElement = document.querySelector("#user");

  const tokenSetStatus = () => {
    if (state.token.loading) tokenStatusElement.innerText = "Gerando token...";
    else if (state.token.error) {
      tokenStatusElement.parentElement.classList.add("error");
      tokenStatusElement.innerText = "Falha ao gerar o token";
    } else if (state.token.data) {
      tokenStatusElement.parentElement.classList.add("ok");
      tokenStatusElement.setAttribute("title", state.token.data);
      tokenStatusElement.innerText = "Token gerado";
    }
  };

  const userSetStatus = () => {
    if (!state.token.data) userStatusElement.innerText = "Aguardando token...";
    else if (state.user.loading)
      userStatusElement.innerText = "Buscando usuário...";
    else if (state.user.error) {
      userStatusElement.parentElement.classList.add("error");
      userStatusElement.innerText = "Falha ao localizar o usuário";
    } else if (state.user.data) {
      userStatusElement.parentElement.classList.add("ok");
      userStatusElement.setAttribute("title", JSON.stringify(state.user.data));
      userStatusElement.innerText = "Usuário encontrado";
    }
  };

  tokenSetStatus();
  userSetStatus();
};

store.subscribe(render);
login();
