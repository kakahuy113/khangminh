import { getSVGs, Loading } from "./utilities/util";
// import { Fullpage, FullpageOptions } from "./libraries/Fullpage";
import Axios from "axios";
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
	btn.addEventListener("click", function () {
		alert("=> Từ từ code");
	});
};

declare var Swiper : any;

const mainBanner = () => {
	const swiper =  new Swiper(".MainSlider__Banners .swiper-container" , {
		effect: "fade",
		fadeEffect: {
			crossFade: true,
		},
		speed: 1000,
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
const partnerSwiper =() => {
	const swiper = new Swiper(".partner .swiper-container", {
		slidesPerView: 4,
		slidesPerGroup: 1,
		speed: 1000,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
	})
}

document.addEventListener("DOMContentLoaded", async () => {
	getSVGs(".svg");
	Loading();
	//init main banner
	mainBanner();
	//init partner swiper above footer
	partnerSwiper();
	// slider page introduce
	slideAwardIntroduce();
	// ajaxGetMoreVideo
	ajaxGetMoreVideo();
	// create instance fullpage
	// const fpOptions: FullpageOptions = {
	// 	prevEl: ".fp-prev",
	// 	nextEl: ".fp-next",
	// 	speed: 800,
	// 	slideClass: ".fp-slide",
	// 	dots: true,
	// 	on: {
	// 		// event is fired before slide start transition
	// 		beforeSlideChange: function (
	// 			currentSlide,
	// 			nextSlide,
	// 			currentIndex,
	// 			nextIndex,
	// 		) {
	// 			console.log(currentSlide, nextSlide, currentIndex, nextIndex);
	// 		},
	// 		// event is fired after slide end transition
	// 		afterSlideChange: function (currentSlide, currentIndex) {
	// 			console.log(currentSlide, currentIndex);
	// 		},
	// 	},
	// };
	// const fp = new Fullpage(".fp-container", fpOptions);
	// // method slide to a slide with index
	// fp.slideTo(0);
	// // method get current index of fullpage
	// fp.getIndex();
	// // method allow or not allow scroll to slide fullpage: true = allow, false = not allow
	// fp.canScroll(true);
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
