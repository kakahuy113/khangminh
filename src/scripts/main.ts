import { getSVGs, Loading } from "./utilities/util";
// import { Fullpage, FullpageOptions } from "./libraries/Fullpage";
import Axios from "axios";
import { commonController } from "./libraries/CommonController";
declare var Swiper: any;
declare var $: any;
declare var player:any,loadVideoById:any;

const slideAwardIntroduce = () => {
	const mySwiper = new Swiper(".introduce__wrapper.t-2 .swiper-container", {
		loop: true,
		speed: 800,
		centeredSlides: true,
		slidesPerView: 3,
		breakpoints: {
			// when window width is >= 320px
			320: {
			slidesPerView: 1,
			spaceBetween: 20
			},
			1024: {
			slidesPerView: 3,
			spaceBetween: 20
			},
		},
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
			$(".video__item").removeClass("d-none");
			btn.classList.add("d-none");
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
	const swiper = new Swiper(".MainSlider__Banners .swiper-container", {
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
	});
};
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
		breakpoints: {
			300: {
				slidesPerView: 3,
			},
			600: {
				slidesPerView: 4,
			}
		}
	});
};

const swiperProductHome = () => {
	const swiper = new Swiper(".product__wrapper .swiper-container", {
		slidesPerView: 3,
		slidesPerGroup: 1,
		spaceBetween: 40,
		navigation: {
			nextEl: ".product__wrapper .swiper-button-next",
			prevEl: ".product__wrapper .swiper-button-prev",
		},
		breakpoints: {
			300: {
				slidesPerView: 1
			},
			550: {
				spaceBetween: 20,
				slidesPerView: 2,
			},
			800: {
				slidesPerView: 3
			}
		}
	});
};

const swiperourproduct = () => {
	const swiper = new Swiper(".home__ourproducts .swiper-container", {
		slidesPerView: 3,
		slidesPerColumn: 2,
		spaceBetween: 10,
		navigation: {
			nextEl: ".home__ourproducts .swiper-button-next",
			prevEl: ".home__ourproducts .swiper-button-prev",
		},
		breakpoints: {
			300: {
				slidesPerView: 1,
			},
			550: {
				slidesPerView: 2,
			},
			750: {
				spaceBetween: 10,
			},
			1440: {
				spaceBetween: 40,
			}
		}
	});
};

const swiperRelateNews = () => {
	const swiper = new Swiper(".relate-news .swiper-container", {
		slidesPerView: 3,
		slidesPerGroup: 1,
		spaceBetween: 10,
		navigation: {
			nextEl: ".relate-news .swiper-button-next",
			prevEl: ".relate-news  .swiper-button-prev",
		},
		breakpoints: {
			300: {
				slidesPerView: 1,
			},
			500: {
				slidesPerView: 2,
			},
			700: {
				slidesPerView: 3,
			}
		}
	});
};

const swiperProductDetail = () => {
	const swiper = new Swiper(".detail__listImg .swiper-container", {
		direction: "vertical",
		slidesPerView: 3,
	});
};
const addIdPopup = () => {
	const listItem = document.querySelectorAll(".gallery__item");
	for (let i = 0; i < listItem.length; i++) {
		$(".item__img")
			.eq(i)
			.attr("data-fancybox", "Images-" + i);
		$(".item__img")
			.eq(i)
			.children(".listImg__gallery")
			.children("a")
			.attr("data-fancybox", "Images-" + i);
	}
	$(".gallery__item").click(function (e: any) {
		var p = $(this)
			.children(".item__txt")
			.children(".txt")
			.children("p")
			.text();
		$(this).children(".item__img").attr("data-caption", p);
	});
};

const showVideo = () => {
	const listVideo = document.querySelectorAll(".video__item");
	const video = document.getElementsByClassName("video__item");
	const preview = document.getElementsByClassName("video__item-preview");
	if (listVideo.length > 3) {
		for (let i = 0; i < listVideo.length; i++) {
			if (i > 2) {
				$(".video__item").eq(i).addClass("d-none");
			}
		}
	}
	
	if (video) {
		listVideo.forEach((element,index) => {
			//get images
			const id = $(element).children().children().attr("data-id");
			const src = 'http://img.youtube.com/vi/'+id+'/maxresdefault.jpg';
			$(element).children().children().children().attr("src",src);
			//get_video
		});
		$(video).click(function (e:any) { 
			e.preventDefault();
			const idVideo = $(this).find(".videoItem__thumbnail").attr("data-id");
			const srcVideo = "https://www.youtube.com/embed/"+ idVideo +"?rel=0&showinfo=0&controls=1&enablejsapi=1&origin=http%3A%2F%2Flocalhost%3A8000&widgetid=1";
			$(".videoItem__src.first iframe").attr("src",srcVideo);
			const imgItem = $(this).children().children().children().attr("src");
			$(".videoItem__thumbnail.first img").attr("src",imgItem);
			const content = $(this).find(".videoItem__content").html();
			$(".videoItem__content.first").html(content);
			
		});
		$(video).first().trigger("click");
	}
	if(preview){
		$(preview).click(function (e:any) { 
			e.preventDefault();
			$(this).find(".videoItem__thumbnail").addClass("d-n");
		});
	}
};
//init submenu
const initClassSubMenu = () => {
	const header = document.querySelector("header");
	const items__MainMenu = document.querySelectorAll(
		".header__nav--bottom ul li",
	);
	// ADD LOADING HEADER
	header.setAttribute('loading', '');
	const init = () => {
		return new Promise((resolve, reject) => {
			items__MainMenu.forEach((item) => {
				const isHaveSub = item.querySelectorAll("ul");
				// CHECK MAIN MENU IS HAVE SUB ???
				if (isHaveSub.length > 0) {
					// ADD CLASS IS HAVE SUB
					item.classList.add("ishavesubmenu");
					// ADD CLASS LIST MENU LV1
					isHaveSub.forEach((item) => {
						item.classList.add("navBar--lv1");
					});
					// ADD CLASS ITEM MENU LV1
					const items__MenuLv1 = item.querySelectorAll("li");
					items__MenuLv1.forEach((item) => {
						item.classList.add("navBar__item--lv1");
					});
				}
			});
			resolve();
		});
	}
	init().then(() => {
		setTimeout(() => {
			header.removeAttribute('loading');
			header.setAttribute('loaded', '');
		}, 300);
	})
};
//active menu
const activeMenu = () => {
	const link = window.location.href;
	const listSubLink = document.querySelectorAll(
		".header__nav--bottom ul.navBar--lv1 li",
	);
	listSubLink.forEach((item) => {
		const href = item.querySelector("a").getAttribute("href");
		if (link.includes(href)) {
			item.classList.add("active");
			item.parentElement.parentElement.classList.add("active");
		}
	});
	const listNavLink = document.querySelectorAll(".header__nav--bottom ul li");
	listNavLink.forEach((item) => {
		const href = item.querySelector("a").getAttribute("href");
		if (link.includes(href)) {
			item.classList.add("active");
		}
	});
};
const ajaxFormContact = () => {
	$(".contact__form .btn__submit--contact").on("click", function (e: any) {
		e.preventDefault();
		const _thisBtn = $(this);
		const url = _thisBtn.attr("data-url");
		const formData = new FormData();
		const nameText = $(".contact__form form .form-group textarea").attr(
			"name",
		);
		const valText = $(".contact__form form .form-group textarea").val();
		$(".contact__form .form-group input").each(function () {
			const name = $(this).attr("name");
			const value = $(this).val();
			formData.append(name, value);
		});
		formData.append(nameText, valText);
		if ($(".contact__form .form form").valid() === true) {
			$.ajax({
				url: url,
				type: "post",
				data: formData,
				processData: false,
				contentType: false,
				beforeSend: function () {
					_thisBtn.attr("disabled", "disabled");
				},
				success: function (res: any) {
					alert(`${res.Message}`);
					window.location.reload();
					_thisBtn.removeAttr("disabled");
				},
			});
		}
		else{
			$(".contact__form .form-group input").addClass("input-validation-error");
		}
	});
};
// ACTIVE LANGGUAGE
const activeLanguage = () => {
	const htmlLang = document.querySelector("html").getAttribute("lang");
	const items__language = document.querySelectorAll(
		".header__nav--top .languages__item",
	);
	items__language.forEach((item) => {
		if (item.getAttribute("data-language") == htmlLang) {
			item.classList.add("active");
		}
	});
};
// change height backgournd sub nav
const changeHeightBackgroundSubNav = () => {
		const submenu = document.querySelectorAll<HTMLElement>(
			".header__nav--bottom ul li.ishavesubmenu",
		);
	
		submenu.forEach((item) => {
			item.addEventListener("mouseenter", () => {
				const height = item.querySelector<HTMLElement>("ul").offsetHeight;
				document
					.querySelector(".background-submenu")
					.setAttribute("style", `height: ${height}px`);
			});
			item.addEventListener("mouseleave", () => {
				document
					.querySelector(".background-submenu")
					.setAttribute("style", `height: 0px`);
			});
		});
};
//login
const Login = () => {
	$("#login form .form-button button").on("click", (e: any) => {
		e.preventDefault();
		const url = $(e.target).attr("data-url")
		const formData = new FormData();
		$('#login form .form-group input').each(function () {
			const name = $(this).attr('name');
			const value = $(this).val();
			formData.append(name, value);
		});

		if($("#login form").valid() === true ) {
			Axios.post(`${url}` , formData).then((res:any) => {
				if(res.Code == 200) {
					window.location.reload();
				}
				if(res.Code == 400) {
					alert(`${res.Message}`)
				}
		})
		}
	});
};
//register
const Register = () => {
	$("#register form .form-button button").on("click", (e: any) => {
		e.preventDefault();
		const url = $(e.target).attr("data-url")
		const formData = new FormData();
		$('#register form .form-group input').each(function () {
			const name = $(this).attr('name');
			const value = $(this).val();
			formData.append(name, value);
		});
		if($("#register form").valid() === true) {
			Axios.post(`${url}` , formData).then((res:any) => {
				if(res.Code == 200) {
					$("#login input[type=text]").val(`${res.username}`);
					$("#login input[type=password]").val(`${res.password}`);
					$("#login form .form-button button").trigger("click");
					window.location.reload();
				}
				if(res.Code == 400) {
					alert(`${res.Message}`)
				}
		})
		}
	});
};
//turn of when click
const turnOffPopupWhenClicked = () => {
	//set default hash = false
	// $.fancybox.defaults.animationEffect = "fade";
	$.fancybox.defaults.hash = false;
	// $.fancybox.defaults.hideScrollbar = false;
	$('[data-fancybox]').fancybox({
		beforeShow : () => {
			$(".fake-toolbar").css("display" , "block");
			$("header").css("margin-right" , "5px")
		},
		afterClose : () => {
			$(".fake-toolbar").css("display" , "none")
			$("header").css("margin-right" , "0")
		}
	});
	$('[data-fancybox="register2"]').click(() => {
		$.fancybox.close();
	})
	$('[data-fancybox="register2"]').fancybox({
		src: '#register',
	});
};
// show text when love empty
const showTextWhenLoveEmpty = () => {
	if(document.querySelector(".love-list")) {
		const listItem = document.querySelectorAll(".list-of-love .item-wrapper")
		const num = listItem.length;
		if(num > 0) {
			document.querySelector<HTMLElement>(".empty-list").style.display = "none"
		} else {
			document.querySelector<HTMLElement>(".add-all").style.display = "none"
		}
	}
}

const actionLoginPage = () => {
	const check  = () => {
		let isLogin: any = document.querySelector<HTMLElement>(".account-item")
			.getAttribute("data-login");
		if(isLogin == "true" ) {
			isLogin = true
		} else {
			isLogin = false
		}
		return isLogin;
	}
	const isLogin = check();
	if(isLogin) {
		$(".account-box").css("display" , "none")
		$(".account-item").on("click" , (e:any) => {
			e.preventDefault();
			$.fancybox.open({
				src: "#account",
				type: "inline"
			})
		})
	} else {
		$(".check").on("click", (e:any) => {
			e.preventDefault();
			$.fancybox.open({
				src: "#login",
				type: "inline"
			})
		})
	}
}

const viewImagesDetail = () =>{
	const listThumbnail= document.querySelectorAll(".detail__listImg .previews");
	if(listThumbnail){
		listThumbnail.forEach(element => {
			const id =$(element).attr("data-id");
			if(id !== ""){
				$(element).parent().addClass("video");
				$(element).addClass("video-x");
				const src = 'http://img.youtube.com/vi/'+id+'/0.jpg';
				$(".previews.video-x").attr("src",src);
			}
		});
	}
	$(".previews").click(function(e:any){
		e.preventDefault();
		$(".previews").parent().removeClass("active");
		const id = $(this).attr("data-id");
		if(id !== ""){
			$(".detail__mainImg img").addClass("d-n");
			$(".detail__mainImg .youtube-api").removeClass("d-n");
			const idYt = $(".youtube-api").attr("id");
			let url = $('#' + idYt).attr('src');
			$('#' + idYt).attr('src', url + "&autoplay=1");
		}
		else
		{
			$(".detail__mainImg .youtube-api").addClass("d-n");
			$(".detail__mainImg img").removeClass("d-n");
			const src = $(this).attr('src');
			const alt = $(this).attr("alt");
			$(".detail__mainImg img").attr('src',src);
			$(".detail__mainImg img").attr('alt',alt);
		} 
		$(this).parent().addClass("active");
	});
	$(".previews").first().trigger("click");
}

const changeQty = () =>{
	$(".lower").click(function(e:any){
	const qty = Number($("#qty_product").val());
		if(qty == 1){
			$(".lower").addClass("no-action");
		}else{
			$("#qty_product").val(qty-1);
		}
	});
	$(".upper").click(function(e:any){
	const qty = Number($("#qty_product").val());
	if(qty==1){
		$(".lower").removeClass("no-action");
	}
		$("#qty_product").val(qty+1);
	});
	//
}

const showContentDesc = () =>{
	$(".desc__item .item__content").addClass("no-active");
	$(".desc__item h3").addClass("no-active");
	$(".desc__item h3").click(function(e:any){
		const parent = $(this).parent();
		$(parent).children(".item__content").toggleClass("no-active");
		$(this).toggleClass("no-active");
	})
}

const showInfoToManage = () => {
	$(".self-info").on("click" , (e:any) => {
		$("#address").addClass("hide")
		$("#self-info").removeClass("hide")
	})
	document.querySelectorAll(".address-form").forEach(item => {
		item.addEventListener("click" , () => {
			$("#self-info").addClass("hide")
			$("#address").removeClass("hide")
		})
	})
	$(".self-info").trigger("click");
}

const cartQuantity = () => {
	$('.quantity-input .minus').each(function() {
		$(this).on("click", function() {
			let alertContent = $(this).attr('data-alert');
			let curVal = Number($(this).siblings("input").val())
			if (curVal <= 0) {
				curVal = 0;
				alert(alertContent);
			} else {
				curVal -= 1;
			}
			$(this).siblings("input").val(curVal)
		})
	})

	$('.quantity-input .plus').each(function() {
		$(this).on("click", function() {
			let alertContent = $(this).attr('data-alert');
			let curVal = Number($(this).siblings("input").val())
			if (curVal >= 5) {
				curVal = 5;
				alert(alertContent)
			} else {
				curVal += 1;
			}
			$(this).siblings("input").val(curVal)
		})
	})

	$('.quantity-input .quantity').each(function() {
		const alertContentMax = $('.quantity-input .plus').attr('data-alert');
		const alertContentMin = $('.quantity-input .minus').attr('data-alert');
		$(this).on("keyup", function() {
			if ($(this).val() >= 5) {
				// alert(alertContentMax)
				$(this).val(5);
			} else if ($(this).val() <= 0) {
				// alert(alertContentMin)
				$(this).val(0);
			}
		})
	})
}

// SHOW BACK TO TOP
const showBackToTop = () => {
	$(window).scroll(function () {
		if ($(this).scrollTop() > 800) {
			$('#back_to_top').addClass('show');
		} else {
			$('#back_to_top').removeClass('show');
		}
	});

	$('#back_to_top').on('click', function (e: any) {
		e.preventDefault();
		$('html,body').animate({
			scrollTop: 0,
		});
	});
};
const getMoreQuestion = () =>{
	const list = $(".guide__item");
	for (let i = 0; i < list.length; i++) {
			if(i>2){
				$(".guide__item").eq(i).addClass("d-none");
			}
	}
	$(".guide__btn--more").click(function(){
		$(".guide__item").removeClass("d-none");
		$(".guide__btn--more").addClass("d-none");
	});
}

const ajaxQuestion = () => {
	$(".btn__submit--guide").on("click", function (e: any) {
		e.preventDefault();
		const _thisBtn = $(this);
		const url = _thisBtn.attr("data-url");
		const formData = new FormData();
		const nameText = $(".guide__input textarea").attr(
			"name",
		);
		const valText = $(".guide__input textarea").val();
		$(".guide__input input").each(function () {
			const name = $(this).attr("name");
			const value = $(this).val();
			formData.append(name, value);
		});
		formData.append(nameText, valText);
		if ($(".guide__form form").valid() === true) {
			$.ajax({
				url: url,
				type: "post",
				data: formData,
				processData: false,
				contentType: false,
				beforeSend: function () {
					_thisBtn.attr("disabled", "disabled");
				},
				success: function (res: any) {
					alert(`${res.Message}`);
					window.location.reload();
					_thisBtn.removeAttr("disabled");
				},
			});
		}
	});
};

const payContinue = () =>{
	// $(".pay__method").addClass("d-n");
	// $(".pay__ship").addClass("d-n");
	$(".mtItem__radio").click(function(){
		$(".method__item").removeClass("active");
		$(this).parent().addClass("active");
	});
	$(".check__true").click(function(){
		$(this).children(".img").toggleClass("v-h");
	});
	$(".location__item.checkbox").click(function(){
		$(".location__2").slideToggle("slow");
	});
	$(".btn__next-pay.step-1").click(function(e:any){
		e.preventDefault();
		const _thisBtn = $(this);
		const url = _thisBtn.attr("data-url");
		const formData = new FormData();
		$(".location__input input").each(function () {
			const name = $(this).attr("name");
			const value = $(this).val();
			formData.append(name, value);
		});
		if ($(".pay__location form").valid() === true) {
			$.ajax({
				url: url,
				type: "post",
				data: formData,
				processData: false,
				contentType: false,
				beforeSend: function () {
					_thisBtn.attr("disabled", "disabled");
				},
				success: function (res: any) {
					alert(`${res.Message}`);
					window.location.reload();
					_thisBtn.removeAttr("disabled");
				},
			});
		$(".pay__location").slideUp("slow");
		$(".pay__method").slideDown("slow");
		$(".pay__title b").removeClass("d-n");
		$(".pay__title.location span").addClass("d-n");
		$(".pay__title.location .checked").removeClass("v-h");
		}
		
	});
	$(".btn__next-pay.step-2").click(function(){
		$(".pay__ship").slideDown("slow");
	});
	$(".pay__title.location").click(function(){
		$(".pay__location").slideDown("slow");
	});
}

// INIT BUTTON BACK
const initElementButtonBackSubMenu = () => {
	const menusLv1 = document.querySelectorAll('.navBar--lv1');
	menusLv1.forEach((item) => {
		const mainMenu = document.querySelector('.header__nav--bottom .nav__wrapper');
		const btn__content = mainMenu.getAttribute('data-btn-back-content');
		const btn__wrapper = document.createElement('li');
		// GẮN NÚT MẶC ĐỊNH
		btn__wrapper.classList.add(
			'navBar__item--lv1',
			'mobile'
		);
		item.prepend(btn__wrapper);
		// INER HTML
		btn__wrapper.innerHTML = `<a href="javascript:;" class="navBar__back">${btn__content}</a>`;
	});
};

// show menu in moble
const menuMoble = () => {
	const btn = document.querySelector(".hamburger_menu	")
	const mainMenu = document.querySelector(".header__nav--bottom .nav__wrapper")
	const itemHaveSubMenu = document.querySelectorAll(".ishavesubmenu")
	const overlay = document.querySelector('#overlay');

	if(btn) {
		btn.addEventListener("click", (e) => {
			document.querySelector('body').classList.toggle('disabled');
			btn.classList.toggle("active")
			mainMenu.classList.toggle('show');
			overlay.classList.toggle('show');
			itemHaveSubMenu.forEach((item) => {
				item.querySelector('.navBar--lv1').classList.remove('show');
			});
		})
	}
	
	// SHOW SUB MENU
	itemHaveSubMenu.forEach((item) => {
		const menuLv1 = item.querySelector('.navBar--lv1');
		const btnBack = menuLv1.querySelector('.navBar__back');
		// SHOW MENU LV 1
		item.addEventListener('click', (e) => {
			menuLv1.classList.add('show');
		});
		// BACK TO MAIN MENU
		if (btnBack) {
			btnBack.addEventListener('click', (e) => {
				console.log(1);
				e.stopPropagation();
				menuLv1.classList.remove('show');
			});
		} else {
			console.log(`Không tồn tại element :=> .navBar__back`);
		}
	});
	if (overlay) {
		overlay.addEventListener('click', (e) => {
			mainMenu.classList.remove('show');
			overlay.classList.remove('show');
			btn.classList.remove('active');
			itemHaveSubMenu.forEach((item:any) => {
				item.querySelector('.navBar--lv1').classList.remove('show');
			});
		});
	}
}
//find header 
const lookUpHeader = () => {
	$(".wrapper__utilities .left form button").on("click", function (e: any) {
		e.preventDefault();
		const _thisBtn = $(this);
		const url = _thisBtn.attr("data-url");
		const formData = new FormData();
		$(".left form input").each(function () {
			const name = $(this).attr("name");
			const value = $(this).val();
			formData.append(name, value);
		});
			$.ajax({
				url: url,
				type: "post",
				data: formData,
				processData: false,
				contentType: false,
				beforeSend: function () {
					_thisBtn.attr("disabled", "disabled");
				},
				success: function (res: any) {
					alert(`${res.Message}`);
					window.location.reload();
					_thisBtn.removeAttr("disabled");
				},
			});
	});
}

const getMapApi = () =>{
	const listMap = document.querySelectorAll("li.introMap__item");
	if(listMap){
		listMap.forEach(element => {
			console.log(1);
		});
	}
}
document.addEventListener("DOMContentLoaded", async () => {
	getSVGs(".svg");
	Loading();
	//commonController
	commonController();
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
	activeMenu();
	//switch language
	activeLanguage();
	// swiperProductDetail
	swiperProductDetail();
	//add id popup
	addIdPopup();
	//change height background submenu
	changeHeightBackgroundSubNav();
	showVideo();
	// gui contact
	ajaxFormContact();
	// ajaxQuestion
	ajaxQuestion();
	Login();
	Register();
	//turn of popuu when click
	turnOffPopupWhenClicked();
	//show empty list
	showTextWhenLoveEmpty();
	//action for login page
	actionLoginPage();
	//show info account manage page
	showInfoToManage();
	viewImagesDetail();
	changeQty();
	showContentDesc();
	//cart quantity
	cartQuantity();
	//show back to top
	showBackToTop();
	getMoreQuestion();
	cartQuantity();
	payContinue();
	// init btn back sub menu
	initElementButtonBackSubMenu();
	//show menu moblie
	menuMoble();
	//look up header
	lookUpHeader();
	getMapApi();
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
