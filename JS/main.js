import { AuthController } from './controllers/AuthController.js';
import { ProjectController } from './controllers/ProjectController.js';
import { TaskController } from './controllers/TaskController.js';
import { EventController } from './controllers/EventController.js';

// Utilitário para detectar a página atual
const currentPage = window.location.pathname;

document.addEventListener('DOMContentLoaded', () => {
  if (currentPage.includes('login.html')) {
    initAuth();
  }

  if (currentPage.includes('dashboard.html') || currentPage.includes('projetos.html')) {
    ProjectController.init();
  }

  if (currentPage.includes('tarefas.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('projectId');
    if (projectId) {
      TaskController.init(projectId);
    }
  }

  if (currentPage.includes('agenda.html')) {
    EventController.init();
  }
  }
});

// Lida com o envio dos formulários de login e cadastro
function initAuth() {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  if (loginForm) {
    loginForm.addEventListener('submit', async e => {
      e.preventDefault();
      const email = loginForm.querySelector('input[type="email"]').value;
      const password = loginForm.querySelector('input[type="password"]').value;
      await AuthController.login(email, password);
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', async e => {
      e.preventDefault();
      const name = registerForm.querySelector('input[placeholder="Nome Completo"]').value;
      const email = registerForm.querySelector('input[type="email"]').value;
      const password = registerForm.querySelector('input[placeholder="Senha"]').value;
      await AuthController.register({ name, email, password });
    });
  }
}

