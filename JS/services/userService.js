const BASE_URL = 'https://6873e2e0c75558e273558c87.mockapi.io/projeto/user';

export const UserService = {
  async getAll() {
    const res = await fetch(`${BASE_URL}/users`);
    return res.json();
  },

  async create(user) {
    const res = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    return res.json();
  }
};
