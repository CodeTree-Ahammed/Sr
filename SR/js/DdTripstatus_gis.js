var map = null;
var infoWindow = null;
var arr = new Array();
var polygons = [];
var txtid = null;
var CUSTOMER_NAME = null;
var CUSTOMER_NAME1 = null;
var DRIVER_MOBILENUMBER = null;
var DRIVER_NAME = null;
var VEHICLE_NO = null;
var ADDRESS = null;
var ADDRESS1 = null;
var STOCKYARD_NAME = null;
var DISTRICT = null;
var vtsdistance = null;
var actualdistance = null;
function initMap() {
	$("#lblcolor1").html("Vehicle End Point");
	$("#lblcolor2").html("Vehicle Traveling Path");
	$("#lblcolor3").html("Vehicle Start Point");
	$("#st").css({ 'color': '#db1212' });
	$("#lblccode1").css({ 'color': '#594627' });
	$("#lblccode2").css({ 'color': '#db1212' }); 
	$("#lblccode3").css({ 'color': '#00FF00' });
	$("#500r").prop("checked", true);
	
	txtid = location.search.slice(1);
	id = txtid.split('^');
	
	vtsdistance = id[9];
	actualdistance = id[8];
	CUSTOMER_NAME = id[7];
	CUSTOMER_NAME1 = CUSTOMER_NAME.split('%20').join(' ')
	DRIVER_MOBILENUMBER = id[6];
	DRIVER_NAME = id[5];
	VEHICLE_NO = id[4];
	ADDRESS = id[3];
	ADDRESS1 = ADDRESS.split('%20').join(' ')
	STOCKYARD_NAME = id[2];
	DISTRICT = id[1];
	txtid = id[0];
	VtsRoads(500);
	//$("#welcometext").text("Your Transactionid is:" + " " + txtid + "   " + "  " + "Actual Distance:" + " " + actualdistance + "   " + " " + "VTS Distance:" + " " + vtsdistance);

	$("#welcometext").text("Your Transactionid is:" + " " + txtid);
	$("#actualdistance").text("Actual Distance:" + " " + actualdistance);
	$("#vtsdistance").text("VTS Distance:" + " " + vtsdistance);
};
function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	console.log("URL", url);
	console.log("NAME", name);
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

function VtsRoads(radius) {

	var LAT = '17.998426';
	var LONG = '82.739254';
	var location = new google.maps.LatLng(LAT, LONG);
	map = new google.maps.Map(document.getElementById('map'), {
		styles: [
			{
				featureType: "all",
				elementType: "labels",
				stylers: [
					{ visibility: "on" }
				]
			}
		],

		zoom: 10,
		center: location,
		mapTypeId: google.maps.MapTypeId.Roadmap
	});

	//var src = ' http://giripragati.ap.gov.in/TestMap/KML/9.kml';
	//kmlLayer = new google.maps.KmlLayer(src, {
	//    map: map
	//});

	//road
	var hidField1 = txtid;// "TNAP05TC69452002221234095383";//TNAP02TC89692002101003329782
	$.ajax(
		{
			type: 'POST',
			contentType: 'application/json; charset=utf-8',
			url: 'VtsRoads',
			data: "{'Txtid':'" + hidField1 + "'}",
			dataType: "json",
			success: function (response) {
				console.log(JSON.stringify(response));
				var bounds = new google.maps.LatLngBounds();
				var distr = response;
				var marker, i;
				var infowindow = new google.maps.InfoWindow();
				var iconBase = 'http://sandreports.ap.gov.in/imgnew/';
				var icons = {};
				var parameter = 'PHC';
				arr = [];
				var locations = [];
				var features = [];
				var startPt = "";
				var endPt = "";
				var P1 = "";
				var P2 = "";
				var haplocations = [];
				var result = [];

				$('#restatus').text(distr.Data.status);
				arr.push(new google.maps.LatLng(
					parseFloat(distr.Data.source_loc.lat),
					parseFloat(distr.Data.source_loc.lng)
				));


				radiuscircle(distr.Data.source_loc.lat, distr.Data.source_loc.lng, radius, '#808080');
				haplocations.push(distr.Data.source_loc.lat, distr.Data.source_loc.lng, 'Source', DISTRICT, STOCKYARD_NAME);
				locations.push(haplocations);
				features.push({ position: new google.maps.LatLng(distr.Data.source_loc.lat, distr.Data.source_loc.lng), type: 'Source' });
				haplocations = [];
				arr.push(new google.maps.LatLng(
					parseFloat(distr.Data.destination_loc.lat),
					parseFloat(distr.Data.destination_loc.lng)
				));

				radiuscircle(distr.Data.destination_loc.lat, distr.Data.destination_loc.lng, radius, '#008000');
				haplocations.push(distr.Data.destination_loc.lat, distr.Data.destination_loc.lng, 'Destination', CUSTOMER_NAME1, DRIVER_NAME, DRIVER_MOBILENUMBER, VEHICLE_NO, ADDRESS1);
				locations.push(haplocations);
				features.push({ position: new google.maps.LatLng(distr.Data.destination_loc.lat, distr.Data.destination_loc.lng), type: 'Destination' });

				for (var i = 0; i < distr.Data.path.length; i++) {
					haplocations = [];
					if (i == 0) {
						haplocations.push(distr.Data.path[i].lat, distr.Data.path[i].lng, 'startpoint');
					}
					else if (i == (distr.Data.path.length - 1)) {
						haplocations.push(distr.Data.path[i].lat, distr.Data.path[i].lng, 'endpoint');
					}
					else {
						haplocations.push(distr.Data.path[i].lat, distr.Data.path[i].lng, 'point');
					}
					locations.push(haplocations);
					result.push(new google.maps.LatLng(
						parseFloat(distr.Data.path[i].lat),
						parseFloat(distr.Data.path[i].lng)
					));
					bounds.extend(result[result.length - 1])
					if (i == 0) {
						features.push({ position: new google.maps.LatLng(distr.Data.path[i].lat, distr.Data.path[i].lng), type: 'startpoint' });
					}
					else if (i == (distr.Data.path.length - 1)) {
						features.push({ position: new google.maps.LatLng(distr.Data.path[i].lat, distr.Data.path[i].lng), type: 'endpoint' });
					}
					else {


						features.push({ position: new google.maps.LatLng(distr.Data.path[i].lat, distr.Data.path[i].lng), type: 'Points' });
					}
				}
				if (parameter == 'PHC') {
					icons = {
						Source: {
							icon: iconBase + 'home-map.png'
						},
						Destination: {
							icon: iconBase + 'homemap.png'
						},
						Points: {
							icon: iconBase + 'm21size.png'
						},
						point: {
							icon: iconBase + 'm21size.png'
						},
						startpoint: {
							icon: iconBase + 'm2size.png'
						},
						endpoint: {
							icon: iconBase + 'm22size.png'
						},
					};

				}
				var polyline = new google.maps.Polyline({
					path: arr,
					geodesic: true,
					strokeColor: '#008000',
					strokeOpacity: 1.0,
					strokeWeight: 1.5,
				});

				polyline.setMap(map);
				map.fitBounds(bounds);
				infoWindow = new google.maps.InfoWindow;
				var LAT = distr.Data.source_loc.lat;
				var LONG = distr.Data.destination_loc.lng;
				var pt = new google.maps.LatLng(LAT, LONG);
				map.setCenter(pt);
				if (radius == 500) {
					map.setZoom(10);
				}
				else if (radius == 1000) {
					map.setZoom(10);
				}
				else if (radius == 2000) {
					map.setZoom(10);
				}
				else if (radius == 5000) {
					map.setZoom(10);
				}

				for (i = 0; i < locations.length; i++) {
					marker = new google.maps.Marker({
						position: new google.maps.LatLng(locations[i][0], locations[i][1]),
						icon: icons[features[i].type].icon,
						map: map
					});

					google.maps.event.addListener(marker, 'click', (function (marker, i) {
						return function () {
							if (locations[i][2] == 'Source') {

								var contentString = '<h6>Vehicle Trip Source Details</h6>' +
									'<h6>DISTRICT: ' + locations[i][3] + '</h6>' +
									'<h6>STOCK YARD NAME: ' + locations[i][4] + '</h6>'
									;
								var clickparmeter = locations[i][2];
								infowindow.setContent(contentString);
								infowindow.open(map, marker);
							}
							else if (locations[i][2] == 'Destination') {
								var contentString = '<h6>Vehicle Trip Destination Details</h6>' +
									'<h6>CUSTOMER NAME : ' + locations[i][3] + '</h6>' +
									'<h6>DRIVER NAME : ' + locations[i][4] + '</h6>' +
									'<h6>DRIVER MOBILE : ' + locations[i][5] + '</h6>' +
									'<h6>VEHICLE NO : ' + locations[i][6] + '</h6>' +
									'<h6>ADDRESS : ' + locations[i][7] + '</h6>';

								var clickparmeter = locations[i][2];
								infowindow.setContent(contentString);
								infowindow.open(map, marker);
							}
						}
					})(marker, i));
				}
			},
			error: function (result) {
				alert("Error");
			}

		});





}

function radiuscircle(lati, longi, val, colorcode) {
	var wellCircle = new google.maps.Circle({
		strokeColor: colorcode,
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: colorcode,
		fillOpacity: 0.1,
		map: map,
		center: new google.maps.LatLng(lati, longi),
		radius: val
	});

};
function ShowHideDiv(vehicle12, val) {
	if (vehicle12.checked == true) {
		var Array = ["500", "1000", "2000", "5000"];
		for (var i = 0; i < Array.length; i++) {
			if (Array[i] != val) {
				var id = "#" + Array[i] + "r";
				$(id).prop("checked", false);
			}
			else {
				VtsRoads(val);

			}
		}

	}
	else if (vehicle12.checked == false) {
		alert("state changed1");
	}

}

// For District
$(document).ready(function () {
	initMap();
});
