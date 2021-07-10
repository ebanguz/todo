const d = document;
const $list = d.querySelector('.list');
const $form = d.querySelector('form');
const $template = document.querySelector('#template').content;
const $fragmento = new DocumentFragment();
const $itemsLeft = d.getElementById('items-left');

const getData = () => {
	const storage = localStorage.getItem('test');
	const arrayOfTasks = storage ? JSON.parse(storage) : [];
	return arrayOfTasks;
};

const tasks = getData();
// console.table(tasks);

//  RENDER FUNCTION
const renderTasks = () => {
	$list.innerHTML = '';
	console.log('%c First List', 'font-weight: bold; color:red');
	console.table(tasks);

	tasks.forEach((task, index) => {
		const status = task.completed;
		$template.querySelector('input').checked = task.completed;
		console.log(index + ' ' + task.completed);
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
	const {completed, task} = data;
	const entries = {
		completed,
		task,
	};
	tasks.push(entries);
	localStorage.setItem('test', JSON.stringify(tasks));

	renderTasks();
};

// UPDATE
const updateTask = (id) => {
	const {completed, task} = tasks[id];

	const entries = {
		completed: !completed,
		task,
	};

	tasks.splice(id, 1, entries);
	localStorage.setItem('test', JSON.stringify(tasks));
	renderTasks();
};

// DELETE FUNCTION
const deleteTask = (id) => {
	tasks.splice(id, 1);
	localStorage.setItem('test', JSON.stringify(tasks));
	renderTasks();
};

// SUBMIT EVENT
d.addEventListener('submit', (e) => {
	e.preventDefault();
	const formData = new FormData($form);
	formData.set('completed', false);
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
		console.table(tasks);
		updateTask(e.target.id);
	}
});

// MAIN LOGIC
renderTasks();
