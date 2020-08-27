"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.debounce = void 0;
var util_1 = require("./utilities/util");
// import { Fullpage, FullpageOptions } from "./libraries/Fullpage";
var axios_1 = require("axios");
var slideAwardIntroduce = function () {
    var mySwiper = new Swiper(".introduce__wrapper.t-2 .swiper-container", {
        loop: true,
        speed: 800,
        centeredSlides: true,
        slidesPerView: 3,
        navigation: {
            nextEl: ".introduce__wrapper.t-2 .swiper-button-next",
            prevEl: ".introduce__wrapper.t-2 .swiper-button-prev"
        }
    });
};
var ajaxGetMoreVideo = function () {
    var btn = document.querySelector(".btn__seeMore");
    if (btn) {
        btn.addEventListener("click", function () {
            alert("=> Từ từ code");
        });
    }
};
exports.debounce = function (func, waitFor) {
    var timeout = null;
    var debounced = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (timeout !== null) {
            clearTimeout(timeout);
            timeout = null;
        }
        timeout = setTimeout(function () { return func.apply(void 0, args); }, waitFor);
    };
    return debounced;
};
var keyupSearchLocation = function () {
    var listLocation = document.querySelectorAll(".info__text.location p");
    var itemLocation = document.querySelectorAll(".introMap__item");
    var btnSearch = document.querySelector("#location-search");
    var content = [];
    listLocation.forEach(function (p) {
        content.push(p.textContent);
    });
    if (btnSearch) {
        btnSearch.addEventListener("keyup", exports.debounce(function () {
            var inputValue = (document.getElementById("location-search")).value;
            for (var i = 0; i < content.length; i++) {
                if (content[i].search(inputValue) == -1) {
                }
                else {
                    var indexContent = content.indexOf(content[i]);
                    for (var j = 0; j < listLocation.length; j++) {
                        var elementP = listLocation[indexContent];
                        var parent = elementP.parentElement.parentElement
                            .parentElement;
                        parent.classList.add("active");
                        break;
                    }
                }
            }
            itemLocation.forEach(function (item) {
                var classItem = item.className;
                if (classItem.includes("active") == false) {
                    item.classList.add("d-none");
                    item.classList.remove("active");
                }
                else {
                    item.classList.remove("d-none");
                    item.classList.remove("active");
                }
            });
        }, 2000));
    }
};
document.addEventListener("DOMContentLoaded", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        util_1.getSVGs(".svg");
        util_1.Loading();
        // slider page introduce
        slideAwardIntroduce();
        // ajaxGetMoreVideo
        ajaxGetMoreVideo();
        keyupSearchLocation();
        return [2 /*return*/];
    });
}); });
var fetchData = function () {
    var formData = new FormData();
    formData.append("FirstName", "Sơn");
    formData.append("LastName", "Vũ");
    axios_1["default"].post("/user", formData).then(function (response) {
        console.log(response);
    });
    axios_1["default"].get("./api/test.json")
        .then(function (response) {
        return response;
    })["finally"](function () { });
};
