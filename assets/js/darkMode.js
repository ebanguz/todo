export default function darkMode(btn) {
	const $btn = document.querySelector(btn);
	// const elements = document.querySelectorAll('[data-dark]');

	let moon = `<img src="./images/icon-moon.svg" alt="toggler dark theme">`;
	let sun = `<img src="./images/icon-sun.svg" alt="toggler light theme">`;

	const dark = () => {
		$btn.innerHTML = sun;
		document.body.className = 'theme theme-dark';
		localStorage.setItem('theme', 'dark');
	};
	const light = () => {
		$btn.innerHTML = moon;
		document.body.className = 'theme';
		localStorage.setItem('theme', 'light');
	};

	document.addEventListener('click', (e) => {
		if (e.target.matches(btn) || e.target.matches(btn + ' img')) {
			$btn.innerHTML === moon ? dark() : light();
			console.log(document.body.className);
		}
	});

	document.addEventListener('DOMContentLoaded', () => {
		if (localStorage.getItem('theme') === null) localStorage.setItem('theme', 'light');
		if (localStorage.getItem('theme') === 'light') light();
		if (localStorage.getItem('theme') === 'dark') dark();
	});
}
