const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

window.onload = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(t => addTask(t.text, t.done));
};

function addTask(text = input.value, done = false) {
  if (!text.trim()) return;

  const li = document.createElement('li');
  li.textContent = text;
  li.className = done ? 'done' : '';
  li.onclick = () => {
    li.classList.toggle('done');
    saveTasks();
  };

  const del = document.createElement('button');
  del.textContent = 'Delete';
  del.className = 'delete-btn';
  del.onclick = (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  };

  li.appendChild(del);
  list.appendChild(li);
  input.value = '';
  saveTasks();
}

function saveTasks() {
  const items = [];
  list.querySelectorAll('li').forEach(li => {
    const text = li.childNodes[0].textContent;
    const done = li.classList.contains('done');
    items.push({ text, done });
  });
  localStorage.setItem('tasks', JSON.stringify(items));
}
