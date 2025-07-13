import { UserService } from '../services/userService.js';

export const AuthModel = {
  async login(email, password) {
    const users = await UserService.getAll();
    return users.find(user => user.email === email && user.password === password);
  },

  async register({ name, email, password }) {
    return await UserService.create({ name, email, password });
  }
};
