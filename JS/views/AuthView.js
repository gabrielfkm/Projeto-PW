export const AuthView = {
  showLoginError(msg) {
    alert(`Erro ao logar: ${msg}`);
  },

  showRegisterSuccess() {
    alert("Cadastro realizado com sucesso!");
  },

  showRegisterError(msg) {
    alert(`Erro no cadastro: ${msg}`);
  }
};
