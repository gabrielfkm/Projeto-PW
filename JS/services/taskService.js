const BASE_URL = 'https://68742e5bdd06792b9c93509d.mockapi.io/project/api';

export const TaskService = {
  async getAll() {
    const res = await fetch(`${BASE_URL}/tasks`);
    return res.json();
  },

  async create(task) {
    const res = await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    return res.json();
  },

  async getByProjectId(projectId) {
    const all = await TaskService.getAll();
    return all.filter(task => task.projectId === projectId);
  }
};
