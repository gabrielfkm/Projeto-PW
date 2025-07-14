import { EventModel } from '../models/EventModel.js';
import { EventView } from '../views/EventView.js';

export const EventController = {
  events: [],
  currentDate: new Date(),

  async init() {
    this.events = await EventModel.getAll();
    this.renderCalendar();
    this.setupMonthNavigation();
  },

  renderCalendar() {
    EventView.renderCalendar({
      events: this.events,
      currentDate: this.currentDate,
      onDayClick: this.showEventModal.bind(this)
    });
  },

  showEventModal(date, eventsForDay) {
    const modal = document.getElementById('eventModal');
    const titleInput = document.getElementById('eventTitle');
    const dateInput = document.getElementById('eventDate');
    const descInput = document.getElementById('eventDescription');

    titleInput.value = '';
    dateInput.value = date;
    descInput.value = '';
    modal.style.display = 'block';

    // Botão Salvar
    window.saveEdit = async () => {
      const newEvent = {
        title: titleInput.value.trim(),
        date: dateInput.value,
        description: descInput.value.trim()
      };

      if (!newEvent.title || !newEvent.date || !newEvent.description) {
        alert('Preencha todos os campos!');
        return;
      }

      await EventModel.create(newEvent);
      this.events = await EventModel.getAll();
      modal.style.display = 'none';
      this.renderCalendar();
    };

    // Botão Excluir
    window.deleteEvent = async () => {
      if (eventsForDay.length === 0) return;
      const confirmDelete = confirm('Deseja realmente excluir o evento?');
      if (confirmDelete) {
        await EventModel.delete(eventsForDay[0].id);
        this.events = await EventModel.getAll();
        modal.style.display = 'none';
        this.renderCalendar();
      }
    };

    window.closeModal = () => {
      modal.style.display = 'none';
    };
  },

  setupMonthNavigation() {
    document.querySelectorAll('.calendar-nav button')[0].onclick = () => {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.renderCalendar();
    };
    document.querySelectorAll('.calendar-nav button')[1].onclick = () => {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.renderCalendar();
    };
  }
};
