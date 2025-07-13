import { EventService } from '../services/eventService.js';

export const EventModel = {
  async getAll() {
    return await EventService.getAll();
  },

  async getByUserId(userId) {
    const events = await EventService.getAll();
    return events.filter(event => event.userId === userId);
  },

  async create(event) {
    return await EventService.create(event);
  }
};
