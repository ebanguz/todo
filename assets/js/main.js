import darkMode from './darkMode.js';

const d = document;
const $list = d.querySelector('.list');
const $form = d.querySelector('form');
const $template = document.querySelector('#template').content;
const $fragmento = new DocumentFragment();
const $itemsLeft = d.getElementById('items-left');

const getData = () => {
	const storage = localStorage.getItem('tasks');
	const arrayOfTasks = storage ? JSON.parse(storage) : [];
	return arrayOfTasks;
};

const tasks = getData();

//  RENDER FUNCTION
const renderTasks = () => {
	localStorage.setItem('tasks', JSON.stringify(tasks));

	$list.innerHTML = '';

	tasks.forEach((task, index) => {
		const status = task.completed ? true : false;

		$template.querySelector('input').checked = status;
		$template.querySelector('input').setAttribute('id', index);
		$template.querySelector('label').setAttribute('for', index);
		$template.querySelector('label').textContent = task.task;
		$template.querySelector('.delete-btn').dataset.id = index;

		let clone = document.importNode($template, true);
		$fragmento.appendChild(clone);
	});
	const strLength = tasks.length === 1 ? 'item' : 'items';
	$itemsLeft.textContent = `${tasks.length} ${strLength} left`;

	$list.appendChild($fragmento);
};

// ADD FUNCTION
const addTask = (data) => {
	tasks.push(data);
	renderTasks();
};

// UPDATE
const updateTask = (id) => {
	const {completed, task} = tasks[id];

	const entry = {
		completed: !completed,
		task,
	};

	tasks.splice(id, 1, entry);
	renderTasks();
};

// DELETE FUNCTION
const deleteTask = (id) => {
	tasks.splice(id, 1);
	renderTasks();
};

// SUBMIT EVENT
d.addEventListener('submit', (e) => {
	e.preventDefault();
	const formData = new FormData($form);
	formData.append('completed', '');
	const entries = formData.entries();
	const data = Object.fromEntries(entries);

	addTask(data);
	$form.reset();
});

// DELETE EVENT
d.addEventListener('click', (e) => {
	if (e.target.matches('.delete-btn')) {
		deleteTask(e.target.dataset.id);
	}
});

d.addEventListener('change', (e) => {
	if (e.target.matches('.chk')) {
		updateTask(e.target.id);
	}
});

// MAIN LOGIC
renderTasks();
darkMode('.header__btn');
