const API_URL = 'https://6873e2e0c75558e273558c87.mockapi.io/projeto/user/projetos';

export class ProjectModel {
  static async getAll() {
    const res = await fetch(API_URL);
    return res.json();
  }

  static async create(projectData) {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData)
    });
    return res.json();
  }

  static async delete(id) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  }

  static async update(id, updatedData) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    });
    return res.json();
  }
}
