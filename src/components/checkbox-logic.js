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
    // localStorage.clear();
    this.tasksDesktop = this.selector.querySelector('.tasks__desktop');

    this.docLoad("tasks");
    this.setDataForCheckbox();

    this.tasksDesktop.addEventListener('click', (e) => {
      e.preventDefault();

      if (e.target.closest('.tasks__item')) {
        const target = e.target.closest('.tasks__item');
        const checkbox = target.querySelector('.checkbox');
        const value = target.querySelector('span').textContent;
        const storage = JSON.parse(this.getStorage('tasks'));
        let checkboxIndex = checkbox.dataset.index;

        if (checkbox.checked) {
          checkbox.checked = false;
        } else {
          checkbox.checked = true;
        }
        console.log(checkbox.checked);
        
        if (target.classList.contains("done")) {
          target.classList.remove("done");
        } else {
          target.classList.add("done");
        }
        console.log(checkbox, checkboxIndex, value, checkbox.checked);

        storage[checkboxIndex] = { value: value, isChecked: checkbox.checked };
        localStorage.setItem('tasks', JSON.stringify(storage));
      }

      this.setDataForCheckbox();
      

      
    })

    
  }

  setStorage(name, value, isChecked = false) {
    const storage = JSON.parse(localStorage.getItem(name)) ?? [];
    storage.push({ value: value, isChecked: isChecked });
    localStorage.setItem(name, JSON.stringify(storage));
  }

  getStorage(name) {
    const storage = localStorage.getItem(name);

    if (storage !== undefined || storage !== null) {
      return storage;
    } else {
      return null;
    }
  }

  setDataForCheckbox() {
    const checkbox = document.querySelectorAll('.checkbox');
    checkbox.forEach((item, index) => {
      item.setAttribute('data-index', index);
    });
  }

  inputTasks(e) {
    e.preventDefault();

    const value = e.target.querySelector('.tasks-value').value;

    this.renderTasks(value.trim());
    this.setDataForCheckbox();
    this.setStorage('tasks', value);
    e.target.querySelector('.tasks-value').value = '';
  }

  renderTasks(value, isChecked) {
    let html = '';

    if (isChecked) {
      html = `
        <li class="tasks__item done">
          <label>
            <span>${value}</span>
            <input class="checkbox" type="checkbox" checked>
            <div class="checkbox-icon"></div>
          </label>
        </li>
      `;
    } else {
      html = `
      <li class="tasks__item">
        <label>
          <span>${value}</span>
          <input class="checkbox" type="checkbox">
          <div class="checkbox-icon"></div>
        </label>
      </li>
    `;
    }

    const tasksDesktop = this.selector.querySelector('.tasks__desktop');
    tasksDesktop.insertAdjacentHTML('beforeend', html);
  }

  docLoad(name) {
    const storage = this.getStorage(name)
    if (storage !== null) {
      const values = JSON.parse(storage);
      values.forEach(item => {
        this.renderTasks(item.value, item.isChecked);
      })
    }
  }
}