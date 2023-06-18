export default class CheckboxLogic {
  constructor(selector) {
    if (typeof selector === 'string') {
      this.selector = document.querySelector(selector);
    } else {
      throw new Error('Не правильно был передан селектор');
    }
    
    this.form = this.selector.querySelector('.tasks-form');

    this.inputTasks = this.inputTasks.bind(this);
    this.form.addEventListener('submit', this.inputTasks);

    this.tasksDesktop = this.selector.querySelector('.tasks__desktop');

    this.tasksDesktop.addEventListener('click', (e) => {
      e.preventDefault();

      if (e.target.closest('.tasks__item')) {
        const target = e.target.closest('.tasks__item');
        if (target.classList.contains("done")) {
          target.classList.remove("done");
        } else {
          target.classList.add("done");
        }
      }
      
    })
    
  }

  setCookie(name, value) {
    
  }

  getCookie() {
    
  }

  inputTasks(e) {
    e.preventDefault();

    const value = e.target.querySelector('.tasks-value').value;

    this.renderTasks(value.trim());
    e.target.querySelector('.tasks-value').value = '';
  }

  renderTasks(value) {
    const html = `
      <li class="tasks__item">
        <label>
          <span>${value}</span>
          <input class="checkbox" type="checkbox">
          <div class="checkbox-icon"></div>
        </label>
      </li>
    `;

    const tasksDesktop = this.selector.querySelector('.tasks__desktop');
    tasksDesktop.insertAdjacentHTML('beforeend', html);
  }
}