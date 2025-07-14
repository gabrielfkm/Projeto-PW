import { EventModel } from '../models/EventModel.js';

EventView.renderCalendar({
  events: this.events,
  currentDate: this.currentDate,
  onDayClick: this.showEventModal.bind(this)
});


export const EventController = {
  events: [],

  async init() {
    this.events = await EventModel.getAll();
    this.renderCalendar();
  },

  async renderCalendar() {
    const calendarEl = document.getElementById('calendar');
    const monthYearEl = document.getElementById('monthYear');
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
                        'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    calendarEl.innerHTML = '';

    daysOfWeek.forEach(d => {
      const dayEl = document.createElement("div");
      dayEl.textContent = d;
      dayEl.classList.add("days-of-week");
      calendarEl.appendChild(dayEl);
    });

    for (let i = 0; i < firstDay; i++) {
      const empty = document.createElement("div");
      empty.classList.add("empty");
      calendarEl.appendChild(empty);
    }

    for (let day = 1; day <= lastDate; day++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEl = document.createElement("div");
      dayEl.classList.add("day");
      dayEl.textContent = day;

      const dayEvents = this.events.filter(ev => ev.date === dateKey);
      if (dayEvents.length > 0) {
        dayEvents.forEach(ev => {
          const evEl = document.createElement("div");
          evEl.className = "event";
          evEl.textContent = ev.title;
          dayEl.appendChild(evEl);
        });

        if (dayEvents.some(ev => ev.title.toLowerCase().includes("prazo") || ev.title.toLowerCase().includes("fim"))) {
          dayEl.classList.add("orange");
        } else {
          dayEl.classList.add("highlight");
        }

        dayEl.onclick = () => this.showEventModal(dateKey, dayEvents);
      } else {
        dayEl.onclick = () => this.showEventModal(dateKey, []);
      }

      calendarEl.appendChild(dayEl);
    }

    monthYearEl.textContent = `${monthNames[month]} ${year}`;
  },

  showEventModal(date, eventsForDay) {
    const modal = document.getElementById('eventModal');
    const eventTitle = document.getElementById('eventTitle');
    const eventDate = document.getElementById('eventDate');
    const eventDescription = document.getElementById('eventDescription');

    // Limpar modal
    eventTitle.value = '';
    eventDate.value = date;
    eventDescription.value = '';

    modal.style.display = 'block';

    // Permitir salvar evento
    window.saveEdit = async () => {
      const newEvent = {
        title: eventTitle.value.trim(),
        description: eventDescription.value.trim(),
        date: eventDate.value
      };

      if (!newEvent.title || !newEvent.description) {
        alert('Preencha todos os campos!');
        return;
      }

      await EventModel.create(newEvent);
      this.events = await EventModel.getAll();
      modal.style.display = 'none';
      this.renderCalendar();
    };

    // Permitir excluir o primeiro evento do dia (ou pode ser modificado para vários)
    window.deleteEvent = async () => {
      if (eventsForDay.length === 0) return;
      const confirmed = confirm('Deseja excluir este evento?');
      if (confirmed) {
        await EventModel.delete(eventsForDay[0].id);
        this.events = await EventModel.getAll();
        modal.style.display = 'none';
        this.renderCalendar();
      }
    };

    window.closeModal = () => {
      modal.style.display = 'none';
    };
  }
};
