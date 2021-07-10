const d = document;
d.addEventListener('DOMContentLoaded', (e) => {
	const $list = d.querySelector('.list');
	const $form = d.querySelector('form');
	const $template = document.querySelector('#template').content;
	const $fragmento = new DocumentFragment();

	const tasks = [
		// {
		// 	completed: false,
		// 	task: 'progressing',
		// },
		// {
		// 	completed: false,
		// 	task: 'run',
		// },
		// {
		// 	completed: true,
		// 	task: 'eat',
		// },
	];

	//  RENDER FUNCTION
	const renderTasks = () => {
		$list.innerHTML = '';

		tasks.forEach((task, index) => {
			const random = Math.floor(Math.random() * 100);

			$template.querySelector('input').setAttribute('id', random);
			$template.querySelector('label').setAttribute('for', random);
			$template.querySelector('label').textContent = task.task;
			$template.querySelector('.delete-btn').dataset.id = index;

			let clone = document.importNode($template, true);
			$fragmento.appendChild(clone);
		});
		$list.appendChild($fragmento);
	};

	// RESET FORM FUNCTION
	const resetForm = () => {
		$form.reset();
	};

	// ADD FUNCTION
	const addTask = (data) => {
		const {completed, task} = data;
		const entries = {
			completed,
			task,
		};
		tasks.push(entries);
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
		formData.set('completed', false);
		const entries = formData.entries();
		const data = Object.fromEntries(entries);

		addTask(data);
		resetForm();
	});

	// DELETE EVENT
	d.addEventListener('click', (e) => {
		if (e.target.matches('.delete-btn')) {
			deleteTask(e.target.dataset.id);
		}
	});

	// MAIN LOGIC
	renderTasks();
});
