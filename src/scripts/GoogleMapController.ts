import {} from "googlemaps";

let locationsInput: LocationInfo[] = [];
let map: any;
let markers: any;
declare var google: any;

let mapOption = {
	gestureHandling: "cooperative",
	zoom: 12,
};

export class LocationInfo {
	lat: number;
	lng: number;
	title: string;
	address: string;
	phone: string;
}

const addMarkers = (infoWindow: any) => {
	markers = [];
	const bounds = new google.maps.LatLngBounds();
	locationsInput.forEach((location: any, index: any) => {
		let locationLatLng = new google.maps.LatLng(location.lat, location.lng);
		let marker = new google.maps.Marker({
			map: map,
			title: location.title,
			position: locationLatLng,
			icon: location.icon,
		});
		bounds.extend(marker.position);
		markers.push(marker);
		showInfoMarkerOnMap(infoWindow, marker, index);
	});

	map.fitBounds(bounds);
};

const showInfoMarkerOnMap = (infoWindow: any, marker: any, index: any) => {
	google.maps.event.addListener(marker, "click", function () {
		infoWindow.setContent(`
			<div class='map-markers'>
				<h3>${locationsInput[index].title}</h3>
				<p>${locationsInput[index].address}</p>
				<p>${locationsInput[index].phone}</p>
			</div>
		`);
		infoWindow.open(map, marker);
		map.panTo(marker.getPosition());
		map.setZoom(12);
	});
	google.maps.event.addListener(map, "click", function () {
		infoWindow.close();
	});
};

const getLocationList = () => {
	if (document.querySelector(".introMap__list ul")) {
		console.log(locationsInput)
		// Get location information in html
		var items = document.querySelectorAll(".introMap__list ul li")
		for (let index = 0; index < items.length; index++) {
			locationsInput.push({
				lat: Number(items[index].getAttribute("data-lat")),
				lng: Number(items[index].getAttribute("data-lng")),
				title: items[index].getElementsByTagName("h6")[0].innerHTML,
				address: items[index].getElementsByClassName("location")[0].innerHTML,
				phone: items[index].getElementsByClassName("phone")[0].innerHTML,
			});

			items[index].addEventListener("click", () => {
				google.maps.event.trigger(markers[index], "click");
			});
		}
	}
};

const initialize = () => {
	map = new google.maps.Map(document.querySelector("#map"), mapOption);
	addMarkers(new google.maps.InfoWindow());
	let listener = google.maps.event.addListener(map, "idle", () => {
		if (map.getZoom() > 12) {
			map.setZoom(12);
		}
		google.maps.event.removeListener(listener);
	});
	// google.maps.event.addListener(map, "bounds_changed", getLocationList);
};

document.addEventListener("DOMContentLoaded", async () => {
	if (document.querySelector("#map")) {
		google.maps.event.addDomListener(window, "load", initialize);

		if (document.querySelector(".introMap__list ul")) {
			getLocationList();
			document
				.querySelectorAll(".introMap__input select")
				.forEach((item, index) => {
					item.addEventListener("change", (element) => {
						const selectName = item.getAttribute("name");
						if (selectName === "country") {
							document
								.querySelectorAll(
									".introMap__input select[name='city'] option",
								)
								.forEach((option) => {
									console.log(item);
									if (
										option.getAttribute("data-country") ==
										item.getAttribute("value")
									) {
									}
									// else {
									// 	option.
									// }
								});
						} else if (selectName === "city") {
						} else {
						}
					});
				});
		}
	}
});
