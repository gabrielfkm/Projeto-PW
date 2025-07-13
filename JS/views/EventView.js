export const EventView = {
  renderEvents(events) {
    const container = document.getElementById('calendar-events');
    container.innerHTML = '';

    if (events.length === 0) {
      container.innerHTML = '<p>Sem eventos agendados.</p>';
      return;
    }

    events.forEach(event => {
      const el = document.createElement('div');
      el.className = 'event-item';
      el.innerHTML = `
        <h4>${event.title}</h4>
        <p>${event.date}</p>
        <p>${event.description}</p>
      `;
      container.appendChild(el);
    });
  }
};
