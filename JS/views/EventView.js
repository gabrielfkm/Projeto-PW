export const EventView = {
  renderCalendar({ events, currentDate, onDayClick }) {
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

    // Dias da semana
    daysOfWeek.forEach(d => {
      const el = document.createElement('div');
      el.classList.add('days-of-week');
      el.textContent = d;
      calendarEl.appendChild(el);
    });

    // Espaços vazios antes do 1º dia
    for (let i = 0; i < firstDay; i++) {
      const empty = document.createElement('div');
      empty.classList.add('empty');
      calendarEl.appendChild(empty);
    }

    // Dias do mês
    for (let day = 1; day <= lastDate; day++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = events.filter(ev => ev.date === dateKey);

      const dayEl = document.createElement('div');
      dayEl.classList.add('day');
      dayEl.textContent = day;

      if (dayEvents.length > 0) {
        dayEvents.forEach(ev => {
          const evEl = document.createElement('div');
          evEl.className = 'event';
          evEl.textContent = ev.title;
          dayEl.appendChild(evEl);
        });

        if (dayEvents.some(ev => ev.title.toLowerCase().includes('prazo') || ev.title.toLowerCase().includes('fim'))) {
          dayEl.classList.add('orange');
        } else {
          dayEl.classList.add('highlight');
        }
      }

      dayEl.onclick = () => onDayClick(dateKey, dayEvents);
      calendarEl.appendChild(dayEl);
    }

    monthYearEl.textContent = `${monthNames[month]} ${year}`;
  }
};
