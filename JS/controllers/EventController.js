import { EventModel } from '../models/EventModel.js';
import { EventView } from '../views/EventView.js';

export const EventController = {
  async init() {
    const user = JSON.parse(localStorage.getItem('user'));
    const events = await EventModel.getByUserId(user.id);
    EventView.renderEvents(events);
  },

  async create(formData) {
    const user = JSON.parse(localStorage.getItem('user'));
    const newEvent = { ...formData, userId: user.id };
    await EventModel.create(newEvent);
    this.init();
  }
};
