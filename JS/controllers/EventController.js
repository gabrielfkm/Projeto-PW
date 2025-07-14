import { EventModel } from '../models/EventModel.js';
import { EventView } from '../views/EventView.js';

// Corrigido: mantendo a data global
let currentDate = new Date();

export const EventController = {
  events: [],

  async init() {
    this.events = await EventModel.getAll();
    this.renderCalendar();
    this.setupNavigation();
  },

  renderCalendar() {
    const calendarEl = document.getElementById('calendar');
    const monthYearEl = document.getElementById('monthYear');
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    calendarEl.innerHTML = '';

    // Cabeçalho dos dias da semana
    daysOfWeek.forEach(day => {
      const dayEl = document.createElement("div");
      dayEl.textContent = day;
      dayEl.classList.add("days-of-week");
      calendarEl.appendChild(dayEl);
    });

    // Dias vazios antes do primeiro dia do mês
    for (let i = 0; i < firstDay; i++) {
      const empty = document.createElement("div");
      empty.classList.add("empty");
      calendarEl.appendChild(empty);
    }

    // Dias do mês
    for (let day = 1; day <= lastDate; day++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEl = document.createElement("div");
      dayEl.classList.add("day");
      dayEl.textContent = day;

      const eventsForDay = this.events.filter(e => e.date === dateKey);

      if (eventsForDay.length > 0) {
        eventsForDay.forEach(ev => {
          const evEl = document.createElement("div");
          evEl.className = "event";
          evEl.textContent = ev.title;
          dayEl.appendChild(evEl);
        });

        dayEl.classList.add(eventsForDay.some(ev => ev.title.toLowerCase().includes("prazo") || ev.title.toLowerCase().includes("fim")) ? "orange" : "highlight");
        dayEl.onclick = () => this.showEventModal(dateKey, eventsForDay);
      } else {
        dayEl.onclick = () => this.showEventModal(dateKey, []);
      }

      calendarEl.appendChild(dayEl);
    }

    monthYearEl.textContent = `${monthNames[month]} ${year}`;
  },

  setupNavigation() {
    document.querySelector(".calendar-nav button:nth-child(1)").addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      this.renderCalendar();
    });

    document.querySelector(".calendar-nav button:nth-child(3)").addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      this.renderCalendar();
    });
  },

  showEventModal(dateKey, eventsForDay) {
    const modal = document.getElementById("eventModal");
    const eventTitle = document.getElementById("eventTitle");
    const eventDate = document.getElementById("eventDate");
    const eventDescription = document.getElementById("eventDescription");

    // Preparar formulário
    modal.style.display = "block";
    eventDate.value = dateKey;
    eventTitle.value = "";
    eventDescription.value = "";

    window.saveEdit = async () => {
      const title = eventTitle.value.trim();
      const description = eventDescription.value.trim();

      if (!title || !description) {
        alert("Preencha todos os campos!");
        return;
      }

      const newEvent = { title, description, date: dateKey };
      await EventModel.create(newEvent);
      this.events = await EventModel.getAll();
      modal.style.display = "none";
      this.renderCalendar();
    };

    window.deleteEvent = async () => {
      if (eventsForDay.length === 0) return;
      if (confirm("Deseja excluir o evento?")) {
        await EventModel.delete(eventsForDay[0].id);
        this.events = await EventModel.getAll();
        modal.style.display = "none";
        this.renderCalendar();
      }
    };

    window.closeModal = () => modal.style.display = "none";
  }
};
