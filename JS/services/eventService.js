const BASE_URL = 'https://68742e5bdd06792b9c93509d.mockapi.io/project/api';

export const EventService = {
  async getAll() {
    const res = await fetch(`${BASE_URL}/events`);
    return res.json();
  },

  async create(event) {
    const res = await fetch(`${BASE_URL}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });
    return res.json();
  },

  async getByUserId(userId) {
    const all = await EventService.getAll();
    return all.filter(event => event.userId === userId);
  }
};
