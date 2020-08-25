import { getSVGs, Loading } from "./utilities/util";
import Axios from "axios";

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
