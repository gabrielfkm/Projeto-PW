const BASE_URL = 'https://6873e2e0c75558e273558c87.mockapi.io/projeto/user';

export const ProjectService = {
  async getAll() {
    const res = await fetch(`${BASE_URL}/projects`);
    return res.json();
  },

  async create(project) {
    const res = await fetch(`${BASE_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    });
    return res.json();
  },

  async getByUserId(userId) {
    const all = await ProjectService.getAll();
    return all.filter(project => project.userId === userId);
  }
};
