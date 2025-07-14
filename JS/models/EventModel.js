const EVENT_API = 'https://68742e5bdd06792b9c93509d.mockapi.io/project/api/events';

export const EventModel = {
  async getAll() {
    const res = await fetch(EVENT_API);
    return await res.json();
  },

  async getByDate(date) {
    const res = await fetch(`${EVENT_API}?date=${date}`);
    return await res.json();
  },

  async create(event) {
    const res = await fetch(EVENT_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    });
    return await res.json();
  },

  async update(id, updatedEvent) {
    const res = await fetch(`${EVENT_API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEvent)
    });
    return await res.json();
  },

  async delete(id) {
    const res = await fetch(`${EVENT_API}/${id}`, { method: 'DELETE' });
    return res.ok;
  }
};
