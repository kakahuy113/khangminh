import { getSVGs, Loading } from "./utilities/util";
// import { Fullpage, FullpageOptions } from "./libraries/Fullpage";
import Axios from "axios";
var CommonController = require("./libraries/CommonController")

declare var Swiper: any;
declare var $: any;

const slideAwardIntroduce = () => {
	const mySwiper = new Swiper(".introduce__wrapper.t-2 .swiper-container", {
		loop: true,
		speed: 800,
		centeredSlides: true,
		slidesPerView: 3,
		navigation: {
			nextEl: ".introduce__wrapper.t-2 .swiper-button-next",
			prevEl: ".introduce__wrapper.t-2 .swiper-button-prev",
		},
	});
};

const ajaxGetMoreVideo = () => {
	const btn = document.querySelector(".btn__seeMore");
	if (btn) {
		btn.addEventListener("click", function () {
			alert("=> Từ từ code");
		});
	}
};

export const debounce = <F extends (...args: any[]) => any>(
	func: F,
	waitFor: number,
) => {
	let timeout: ReturnType<typeof setTimeout> | null = null;

	const debounced = (...args: Parameters<F>) => {
		if (timeout !== null) {
			clearTimeout(timeout);
			timeout = null;
		}
		timeout = setTimeout(() => func(...args), waitFor);
	};

	return debounced as (...args: Parameters<F>) => ReturnType<F>;
};

const keyupSearchLocation = () => {
	const listLocation = document.querySelectorAll(".info__text.location p");
	const itemLocation = document.querySelectorAll(".introMap__item");
	const btnSearch: any = document.querySelector("#location-search");
	let content: any = [];
	listLocation.forEach((p) => {
		content.push(p.textContent);
	});
	if (btnSearch) {
		btnSearch.addEventListener(
			"keyup",
			debounce(function () {
				var inputValue = (<HTMLInputElement>(
					document.getElementById("location-search")
				)).value;
				for (let i = 0; i < content.length; i++) {
					if (content[i].search(inputValue) == -1) {
					} else {
						let indexContent = content.indexOf(content[i]);
						for (let j = 0; j < listLocation.length; j++) {
							var elementP = listLocation[indexContent];
							var parent =
								elementP.parentElement.parentElement
									.parentElement;
							parent.classList.add("active");
							break;
						}
					}
				}
				itemLocation.forEach((item) => {
					let classItem = item.className;
					if (classItem.includes("active") == false) {
						item.classList.add("d-none");
						item.classList.remove("active");
					} else {
						item.classList.remove("d-none");
						item.classList.remove("active");
					}
				});
			}, 2000),
		);
	}
};
//swiper main baner
const mainBanner = () => {
	const swiper =  new Swiper(".MainSlider__Banners .swiper-container" , {
		effect: "fade",
		fadeEffect: {
			crossFade: true,
		},
		speed: 1000,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		pagination: {
			el: ".MainSlider__Banners .swiper-pagination",
			type: "bullets",
			clickable: true,
		},
	})
}
//swiper partner
const partnerSwiper = () => {
	const swiper = new Swiper(".partner .swiper-container", {
		slidesPerView: 4,
		slidesPerGroup: 1,
		speed: 1000,
		simulateTouch: false,
		loop: true,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
	})
}

const swiperProductHome = () => {
	const swiper = new Swiper(".product__wrapper .swiper-container", {
		slidesPerView: 3,
		slidesPerGroup: 3,
		spaceBetween: 40,
		navigation: {
			nextEl: '.product__wrapper .swiper-button-next',
			prevEl: '.product__wrapper .swiper-button-prev',
		  },
	})
}

const swiperourproduct = () => {
	const swiper = new Swiper(".home__ourproducts .swiper-container", {
		slidesPerView: 3,
		slidesPerColumn: 2,
		spaceBetween: 40,
		navigation: {
			nextEl: '.home__ourproducts .swiper-button-next',
			prevEl: '.home__ourproducts .swiper-button-prev',
		  },
	})
}


const swiperRelateNews = () => {
	const swiper = new Swiper(".relate-news .swiper-container", {
		slidesPerView: 3,
		slidesPerGroup: 1,
		spaceBetween: 10,
		navigation: {
			nextEl: '.relate-news .swiper-button-next',
			prevEl: '.relate-news  .swiper-button-prev',
		  },
	})
}

const swiperProductDetail = () =>{
	const swiper = new Swiper(".detail__listImg .swiper-container", {
		direction:'vertical',
	})
}
const addIdPopup = () =>{
	$('.fnb__images').fancybox({
	
	})
}
//init submenu
const initClassSubMenu = () => {
	const items__MainMenu = document.querySelectorAll(
		'.header__nav--bottom ul li'
	);
	return new Promise((resolve, reject) => {
		items__MainMenu.forEach((item) => {
			const isHaveSub = item.querySelectorAll('.subnav');
			// CHECK MAIN MENU IS HAVE SUB ???
			if (isHaveSub.length > 0) {
				// ADD CLASS IS HAVE SUB
				item.classList.add('ishavesubmenu');
				// ADD CLASS LIST MENU LV1
				isHaveSub.forEach((item) => {
					item.classList.add('navBar--lv1');
				});
				// ADD CLASS ITEM MENU LV1
				const items__MenuLv1 = item.querySelectorAll(
					'.navBar__item'
				);
				items__MenuLv1.forEach((item) => {
					item.classList.add('navBar__item--lv1');
				});
			}
		});
		resolve();
	});
}

//active menu
const activeMenu = () => {
	const link = window.location.href;
	const listSubLink = document.querySelectorAll(".header__nav--bottom .subnav .subnav-link")
	listSubLink.forEach(item => {
		const href = item.querySelector("a").getAttribute("href");
		if(link.includes(href)) {
			item.classList.add("active")
			item.parentElement.parentElement.parentElement.classList.add("active")
		}
		
	});
	const listNavLink = document.querySelectorAll(".header__nav--bottom ul li")
	listNavLink.forEach(item => {
		const href = item.querySelector("a").getAttribute("href")
		if(link.includes(href)) {
			item.classList.add("active")
		}
	})
}
// ACTIVE LANGGUAGE
const activeLanguage = () => {
	const htmlLang = document.querySelector('html').getAttribute('lang');
	const items__language = document.querySelectorAll(
		'.header__nav--top .languages__item'
	);
	items__language.forEach((item) => {
		if (item.getAttribute('data-language') == htmlLang) {
			item.classList.add('active');
		}
	});
};

document.addEventListener("DOMContentLoaded", async () => {
	getSVGs(".svg");
	Loading();
	var language = new CommonController();
	//init main banner
	mainBanner();
	//init partner swiper above footer
	partnerSwiper();
	// slider page introduce
	slideAwardIntroduce();
	// ajaxGetMoreVideo
	ajaxGetMoreVideo();
	keyupSearchLocation();
	//swiper home proudct
	swiperProductHome();
	//swiper ourproduct home
	swiperourproduct();
	//swiper relate news
	swiperRelateNews();
	//sub class menu
	initClassSubMenu();
	//active menu
	activeMenu()
	//switch language
	activeLanguage();
	// swiperProductDetail
	swiperProductDetail();
	//add id popup
	addIdPopup();
});

const fetchData = () => {
	const formData = new FormData();
	formData.append("FirstName", "Sơn");
	formData.append("LastName", "Vũ");
	Axios.post("/user", formData).then(function (response) {
		console.log(response);
	});

	Axios.get("./api/test.json")
		.then((response) => {
			return response;
		})
		.finally(() => {});
};
