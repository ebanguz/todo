export default function darkMode(btn) {
	const $btn = document.querySelector(btn);
	const $picture = document.querySelector('picture');

	const printTheme = (theme) => {
		$picture.innerHTML = `<source media="(max-width: 375px)" srcset="images/bg-mobile-${theme}.jpg" />
			<source media="(min-width: 376px)" srcset="images/bg-desktop-${theme}.jpg" />
			<img class="background__img" src="images/bg-mobile-${theme}.jpg" alt="background image ${theme}" />`;
	};

	let moon = `<img src="./images/icon-moon.svg" alt="toggler dark theme">`;
	let sun = `<img src="./images/icon-sun.svg" alt="toggler light theme">`;

	const dark = () => {
		$btn.innerHTML = sun;
		printTheme('dark');
		document.body.className = 'theme theme--dark';
		localStorage.setItem('theme', 'dark');
	};
	const light = () => {
		$btn.innerHTML = moon;
		printTheme('light');
		document.body.className = 'theme';
		localStorage.setItem('theme', 'light');
	};

	document.addEventListener('click', (e) => {
		if (e.target.matches(btn) || e.target.matches(btn + ' img')) {
			$btn.innerHTML === moon ? dark() : light();
		}
	});

	document.addEventListener('DOMContentLoaded', () => {
		if (localStorage.getItem('theme') === null) localStorage.setItem('theme', 'light');
		if (localStorage.getItem('theme') === 'light') light();
		if (localStorage.getItem('theme') === 'dark') dark();
	});
}
