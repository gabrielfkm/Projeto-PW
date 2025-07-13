import { AuthModel } from '../models/AuthModel.js';
import { AuthView } from '../views/AuthView.js';

export const AuthController = {
  async login(email, password) {
    const user = await AuthModel.login(email, password);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      window.location.href = '../pages/dashboard.html';
    } else {
      AuthView.showLoginError('Email ou senha inválidos.');
    }
  },

  async register(data) {
    try {
      await AuthModel.register(data);
      AuthView.showRegisterSuccess();
      window.location.href = '../pages/login.html';
    } catch (e) {
      AuthView.showRegisterError('Erro ao cadastrar.');
    }
  }
};
