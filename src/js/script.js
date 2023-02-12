// табы
let tabs = document.querySelectorAll('.popular__tab');
let tabsContent = document.querySelectorAll('.popular__content-item');

tabs.forEach(function (tabsBtn) {
	tabsBtn.addEventListener('click', function (e) {
		const path = e.currentTarget.dataset.path;
		tabs.forEach(function (btn) {
			btn.classList.remove('active')
		});
		e.currentTarget.classList.add('active');
		tabsContent.forEach(function (tabsBtn) {
			tabsBtn.classList.remove('active')
		});
		document.querySelector(`[data-target="${path}"]`).classList.add('active');
	});
});


// слайдеры
let swipersPopular = document.querySelectorAll(".popular__swiper");
let swipersImg = document.querySelectorAll(".img-slider");

function slidersInTabs() {
	// слайдеры в табах	
	swipersPopular.forEach(function (value) {
		let swipersPop = new Swiper(value, {
			speed: 800,
			spaceBetween: 20,
			centeredSlides: false,
			slidesPerView: "auto",

			keyboard: {
				enabled: true,
				onlyInViewport: true,
			},

			navigation: {
				nextEl: value.parentNode.querySelector('.popular__arrow-next'),
				prevEl: value.parentNode.querySelector('.popular__arrow-prev'),
			},

			mousewheel: {
				sensitivity: 1,
				EventTarget: value,
			}

		});
	});

	// слайдеры-изображения внутри карточек
	swipersImg.forEach(function (value) {
		let swipersImage = new Swiper(value, {
			loop: true,
			speed: 600,
			spaceBetween: 24,
			centeredSlides: false,
			simulateTouch: true,
			touchRatio: 1,
			slidesPerView: 1,
			slideToClickedSlide: false,

			pagination: {
				el: value.querySelector(".img-slider__pagination"),
				clickable: true,
				bulletClass: 'img-slider__bullets',
				bulletActiveClass: 'active',
			},
			keyboard: {
				enabled: true,
				onlyInViewport: true,
			},
			mousewheel: {
				sensitivity: 1,
				EventTarget: value,
			},

			breakpoints: {
				320: {
					slideToClickedSlide: true,
					mousewheel: false,
				},
				992: {
					slideToClickedSlide: false,
					mousewheel: true,
				},
			},

			observer: true,
			observerParents: true
		});
	});
}

window.onload = function () {
	slidersInTabs();
};


let cards = document.querySelectorAll(".popular__slide");

// взаимодействие с карточкой товара
cards.forEach(card => {
	let minus = card.querySelector(".pop-slide__btn-minus");
	let plus = card.querySelector(".pop-slide__btn-plus");
	let basket = card.querySelector(".pop-slide__btn-basket");
	let basketText = basket.querySelector("span");
	let like = card.querySelector(".pop-slide__add-like");
	let compare = card.querySelector(".pop-slide__add-compare");

	plus.addEventListener("click", function () {
		let number = card.querySelector(".pop-slide__amount");
		return ++number.innerText;
	});

	minus.addEventListener("click", function () {
		let number = card.querySelector(".pop-slide__amount");

		if (number.innerText > 1) {
			return --number.innerText;
		}
	});

	basket.addEventListener("click", function () {
		if (basketText.innerHTML === 'В корзину') {
			basketText.innerHTML = 'Добавлено';
			basket.style.backgroundColor = '#ECF0F4';
		}
		else {
			basketText.innerHTML = 'В корзину';
			basket.style.backgroundColor = '';
		};
	});


	like.addEventListener("click", function () {
		like.classList.toggle("active");
	});

	compare.addEventListener("click", function () {
		compare.classList.toggle("active");
	});

})