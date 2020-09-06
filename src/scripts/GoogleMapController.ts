// import {} from "googlemaps";
// declare var google:any;
// //let map: google.maps.Map;
// let markers: google.maps.Marker[] = [];
// let infoWindow: google.maps.InfoWindow = new google.maps.InfoWindow();
// declare var google: any;

// let mapOption = {
// 	gestureHandling: "cooperative",
// 	zoom: 12,
// };

// export class LocationInfo {
// 	order: number; // Thứ tự nằm trong mảng ở mảng html
// 	lat: number;
// 	lng: number;
// 	title: string;
// 	address: string;
// 	phone: string;
// }

// const initMarkers = (map: google.maps.Map) => {
// 	if (markers.length > 0) {
// 		for (let i = 0; i < markers.length; i++) {
// 			markers[i].setMap(null);
// 		}
// 	}
// 	markers = [];
// 	const bounds = new google.maps.LatLngBounds();
// 	if (document.querySelector(".introMap__list ul")) {
// 		// Get location information in html
// 		document.querySelectorAll(".introMap__list ul li:not(.d-none)").forEach((item, index) => {
// 			let location: LocationInfo = {
// 				order: index,
// 				lat: Number(item.getAttribute("data-lat")),
// 				lng: Number(item.getAttribute("data-lng")),
// 				title: item.getElementsByTagName("h6")[0].innerHTML,
// 				address: item.getElementsByClassName("location")[0].innerHTML,
// 				phone: item.getElementsByClassName("phone")[0].innerHTML,
// 			};
// 			let marker = new google.maps.Marker({
// 				map: map,
// 				icon: "",
// 				title: item.getElementsByTagName("h6")[0].innerHTML,
// 				position: new google.maps.LatLng(
// 								Number(item.getAttribute("data-lat")),
// 										Number(item.getAttribute("data-lng"))),
// 			});
// 			bounds.extend(marker.position);
// 			markers.push(marker);
// 			showInfoMarkerOnMap(map, infoWindow, marker, location);

// 			item.addEventListener("click", () => {
// 				google.maps.event.trigger(markers[index], "click");
// 			});
// 		})
// 	}

// 	map.fitBounds(bounds);
// };

// const showInfoMarkerOnMap = (map: google.maps.Map, infoWindow: google.maps.InfoWindow, marker: google.maps.Marker, location: LocationInfo) => {
// 	google.maps.event.addListener(marker, "click", function () {
// 		infoWindow.setContent(`
// 			<div class='map-markers'>
// 				<h3>${location.title}</h3>
// 				<p>${location.address}</p>
// 				<p>${location.phone}</p>
// 			</div>
// 		`);
// 		infoWindow.open(map, marker);
// 		map.panTo(marker.getPosition());
// 		map.setZoom(12);
// 	});

// 	google.maps.event.addListener(map, "click", function () {
// 		infoWindow.close();
// 	});
// };

// const addFilterEvent = (map: google.maps.Map) => {
// 	document
// 		.querySelectorAll(".introMap__input select")
// 		.forEach((item, index) => {
// 			item.addEventListener("change", (element) => {
// 				filterFunction(map, item)
// 			});
// 		});
// 	document
// 		.querySelector(".introMap__input input[name='address']")
// 		.addEventListener(
// 			"keyup",
// 			debounce(function (event) {
// 				filterFunction(map, event.target)
// 			}, 2000),
// 		);

// }

// const filterFunction = (map: google.maps.Map, item: any) => {
// 	const selectName = item.getAttribute("name");
// 	// Address filter
// 	if (selectName === "address") {
// 		// Trigger Country Select Box
// 		filterFunction(map, document.querySelector(
// 			".introMap__input select[name='country']",
// 		));
// 	}
// 	// Country Select Box
// 	if (selectName === "country") {
// 		document
// 			.querySelectorAll(
// 				".introMap__input select[name='city'] option",
// 			)
// 			.forEach((option) => {
// 				if (
// 					option.getAttribute("data-country") ==
// 					(<HTMLSelectElement>item).value
// 				) {
// 					(<HTMLOptionElement>(
// 						option
// 					)).hidden = false;
// 				} else if (
// 					(<HTMLOptionElement>option).value == "0"
// 				) {
// 				} else {
// 					(<HTMLOptionElement>(
// 						option
// 					)).hidden = true;
// 					(<HTMLSelectElement>(
// 						document.querySelector(
// 							".introMap__input select[name='city']",
// 						)
// 					)).value = "0";
// 				}
// 			});
			
// 		// Trigger City Select Box
// 		filterFunction(map, document.querySelector(
// 			".introMap__input select[name='city']",
// 		));
// 	}
// 	// City Select Box
// 	else if (selectName === "city") {
// 		document
// 			.querySelectorAll(
// 				".introMap__input select[name='district'] option",
// 			)
// 			.forEach((option) => {
// 				if (
// 					option.getAttribute("data-city") ==
// 					(<HTMLSelectElement>item).value
// 				) {
// 					(<HTMLOptionElement>(
// 						option
// 					)).hidden = false;
// 				} else if (
// 					(<HTMLOptionElement>option).value == "0"
// 				) {
// 				} else {
// 					(<HTMLOptionElement>(
// 						option
// 					)).hidden = true;
// 					(<HTMLSelectElement>(
// 						document.querySelector(
// 							".introMap__input select[name='district']",
// 						)
// 					)).value = "0";
// 				}
// 			});

// 		// Trigger Disctrict Select Box
// 		filterFunction(map, document.querySelector(
// 			".introMap__input select[name='district']",
// 		));
// 	}
// 	// District Select Box
// 	else
// 	{
// 		// District Selected is default
// 		if (Number((<HTMLSelectElement>item).value) == 0) {
// 			var cityValue = Number(
// 				(<HTMLSelectElement>(
// 					document.querySelector(
// 						".introMap__input select[name='city']",
// 					)
// 				)).value
// 			);
// 			// City Selected is default
// 			if (cityValue == 0) {
// 				var countryValue = Number(
// 					(<HTMLSelectElement>(
// 						document.querySelector(
// 							".introMap__input select[name='country']",
// 						)
// 					)).value
// 				);
				
// 				var isHideAll = true;
// 				document.querySelectorAll(
// 					".introMap__input select[name='city'] option[data-country='" + countryValue + "']"
// 						).forEach(city => {
// 							console.log(isHideAll)
// 							document.querySelectorAll(
// 								".introMap__input select[name='district'] option[data-city='" + (<HTMLOptionElement>city).value + "']"
// 									).forEach((disctrict, index) => {
// 										console.log(disctrict)
// 										showLocation((<HTMLOptionElement>disctrict).value, isHideAll)
// 										isHideAll = isHideAll ? !isHideAll : isHideAll;
// 									});
// 						});
// 			} else {
// 				document.querySelectorAll(
// 					".introMap__input select[name='district'] option[data-city='" + cityValue + "']"
// 						).forEach((disctrict, index) => {
// 							showLocation((<HTMLOptionElement>disctrict).value, index == 0)
// 						});
// 			}
// 		} else {
// 			showLocation((<HTMLSelectElement>item).value, true)
// 		}
		
// 		initMarkers(map);
// 	}

// }

// const showLocation = (value: string, isHiddenAll: boolean) => {
// 	const addressValue = (<HTMLInputElement>document.querySelector(".introMap__input input[name='address']")).value;
// 	console.log(isHiddenAll, addressValue)
// 	document
// 		.querySelectorAll(".introMap__list ul li")
// 		.forEach(element => {
// 			if (isHiddenAll) {
// 				element.classList.add("d-none");
// 			}
// 			if (element.getAttribute("data-district") == value) {
// 				if (addressValue == "") {
// 					element.classList.remove("d-none");
// 				}
// 				else {
// 					if (element.querySelector(".location").innerHTML.includes(addressValue)) {
// 						element.classList.remove("d-none");
// 					}
// 				}
// 			}
// 		});
// }

// export const debounce = <F extends (...args: any[]) => any>(
// 	func: F,
// 	waitFor: number,
// ) => {
// 	let timeout: ReturnType<typeof setTimeout> | null = null;

// 	const debounced = (...args: Parameters<F>) => {
// 		if (timeout !== null) {
// 			clearTimeout(timeout);
// 			timeout = null;
// 		}
// 		timeout = setTimeout(() => func(...args), waitFor);
// 	};

// 	return debounced as (...args: Parameters<F>) => ReturnType<F>;
// };

// const initialize = () => {
// 	// Html must have #map
// 	if (document.querySelector("#map")) {
// 		let map: google.maps.Map = new google.maps.Map(document.querySelector("#map"), mapOption);
// 		// Location markers have filter box
// 		if (document.querySelector(".introMap__list ul")) {
// 			addFilterEvent(map);
// 			// Trigger filter event
// 			filterFunction(map, document.querySelector(
// 				".introMap__input select[name='country']",
// 			));
// 		} 
// 		else
// 		{
// 			initMarkers(map);
// 		}
// 		let listener = google.maps.event.addListener(map, "idle", () => {
// 			if (map.getZoom() > 12) {
// 				map.setZoom(12);
// 			}
// 			google.maps.event.removeListener(listener);
// 		});
// 		// google.maps.event.addListener(map, "bounds_changed", getLocationList);
// 	}
// };

// document.addEventListener("DOMContentLoaded", async () => {
// 	google.maps.event.addDomListener(window, "load", initialize);
// });
