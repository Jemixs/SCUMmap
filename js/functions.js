var url = ('http://' + window.location.hostname + '/');
var iconsUrl = './assets/images/';
var tilesUrl = "./map/{z}/{x}/{y}.png";
var maxNativeZoom = 5;
var mapMinZoom = 1;
var mapMaxZoom = 5;

var mapSize = 8192;
var tileSize = 256;
var mapBounds = 4096;

L.CRS.MySimple = L.extend({}, L.CRS.Simple, {
	transformation: new L.Transformation(1 / 16, 0, -1 / 16, 256)
});

var myBounds = [[0,0],[mapBounds, mapBounds]];

var map = L.map('map', {
	maxNativeZoom: maxNativeZoom,
	minZoom: mapMinZoom,
	maxZoom: mapMaxZoom,
	zoomControl: false,
	fullscreenControl: true,
	fullscreenControlOptions: {
		position: 'topright'
	},
	crs: L.CRS.MySimple

}).setView([2048,2048], 2);

L.tileLayer(tilesUrl, {
	maxNativeZoom: maxNativeZoom,
	minZoom: mapMinZoom,
	maxZoom: mapMaxZoom,
	tileSize: tileSize,
	noWrap: true,
	tms: false,
	bounds: myBounds,
	continuousWorld: true
}).addTo(map);

map.setMaxBounds([[-3000, -3000], [7000, 7000]]);

////// JS ////////

var selRead = document.querySelector('.js-switch');
var readSwitch = new Switch(selRead, {size: 'small', onSwitchColor: '#3ca374'});

new ClipboardJS('.btn');

////////////////////////

 // Set the button title text for the polygon button
 L.drawLocal.draw.toolbar.buttons.polyline = 'Нарисовать линию';
 L.drawLocal.draw.toolbar.buttons.polygon = 'Нарисовать фигуру';
 L.drawLocal.draw.toolbar.buttons.rectangle = 'Нарисовать квадрат';
 L.drawLocal.draw.toolbar.buttons.circle = 'Нарисовать круг';

 L.drawLocal.draw.handlers.polyline.tooltip.start = 'Нажмите что бы начать';
 L.drawLocal.draw.handlers.polygon.tooltip.start = 'Нажмите что бы начать';
 L.drawLocal.draw.handlers.circle.tooltip.start = 'Нажмите что бы начать';

 var popup = L.popup();
 new L.Control.Zoom({position: 'topright'}).addTo(map);
 

// SIDEBAR - START//
var befA = 'home';
$(".item #"+befA+" i").css("display","none");
$(".item #"+befA+" i").after('<i class="fas fa-chevron-left"></i>');
$(".tab .item a").click(function(e) {
	var clId = $(this).attr('id');
	e.preventDefault;
	if ($(".newBar").css("display") == "block") {
		if (clId != befA) {
			$(".side-pane .pane-item").each(function(e) {
				$(this).removeClass("active");
			});
			$(".item a").each(function(e) {
				$("i.fa-chevron-left").remove();
				$(".item i").css("display","block");
			});
			$(".side-pane #"+clId).addClass("active");
			$(".item #"+clId+">i").css("display","none");
			$(".item #"+clId+">i").after('<i class="fas fa-chevron-left"></i>');
		}else{
			$(".tabs-ico").css("left","20");
			$(".newBar").hide("fast");
			$(".item #"+clId+" i.fa-chevron-left").remove();
			$(".item #"+clId+">i").css("display","block");
		}
		befA = clId;
	}else{
		$(".tabs-ico").css("left","368");
		$(".newBar").show("fast");
		var clId = $(this).attr('id');
		$(".side-pane .pane-item").each(function(e) {
			$(this).removeClass("active");
		});
		$(".side-pane #"+clId).addClass("active");
		$(".item #"+clId+" i").css("display","none");
		$(".item #"+clId+" i").after('<i class="fas fa-chevron-left"></i>');
	}
});

// SIDEBAR //

var layerGroups = [];
var textLayer = [];
var globalMarkers = [];
var transparentMarker = L.icon({
	iconUrl: iconsUrl+'alpha_marker.png',
	iconSize: [1, 1],
	iconAnchor: [iWidth, iHeight],
	popupAnchor: [0, -iHeight]
});
for (var i = 0; i < textMarkers.length; i++) {
  // If the group doesn't exists
  if (layerGroups.textmarkers == undefined) {
    // Create the group
    layerGroups.textmarkers = new L.LayerGroup();
}
  // Add the marker
  var textMarker = new L.marker(textMarkers[i].coords, { opacity: 0.0, icon: transparentMarker }); //opacity may be set to zero
  textMarker.bindTooltip(textMarkers[i].name, {permanent: true, direction: "top", className: "text-label", offset: [0, 0]});
  textMarker.addTo(layerGroups.textmarkers); // Adds the text markers to map.
  //layerGroups.textmarkers.addTo(map);
}

function getIcon(index) {
	var icon = markers[index].icon;
	var markerIcon = L.icon({
		iconUrl: iconsUrl+icon+'.png',
    iconSize: [34,40], // size of the icon
    iconAnchor:   [18, 18], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -18],
    // point from which the popup should open relative to the iconAnchor
});
	return markerIcon;
}

var policeS = 0;
var bunkerS = 0;
var outpostS = 0;
var waterS = 0;
var hunterS = 0;
var caveS = 0;

for (i = 0; i < markers.length; i++){
	if (markers[i].group == 'police-state') {
		policeS++;
	}
	if (markers[i].group == 'bunkers') {
		bunkerS++;
	}
	if (markers[i].group == 'outpost') {
		outpostS++;
	}
	if (markers[i].group == 'water-stream') {
		waterS++;
	}
	if (markers[i].group == 'hunter-home') {
		hunterS++;
	}
	if (markers[i].group == 'cave') {
		caveS++;
	}
}
$('span.citySs').html(textMarkers.length);
$('span.policeS').html(policeS);
$('span.bunkers').html(bunkerS);
$('span.outpostS').html(outpostS);
$('span.waterS').html(waterS);
$('span.hunterS').html(hunterS);
$('span.caveS').html(caveS);
$('span.zoneS').html(zone.length);

// GAME MARKERS
for (var i = 0; i < markers.length; i++) {
  // if the group doesn't exists in layergroups
  if (layerGroups[markers[i].group] == undefined) {
    // Create the group
    layerGroups[markers[i].group] = new L.LayerGroup();
}
if (markers[i].desc == undefined) {
	markers[i].desc = "";
}
var ilist = "";
var x = (markers[i].coords[1]).toFixed(0);
var y = (markers[i].coords[0]).toFixed(0);

var origin_x = (markers[i].coords[1]);
var origin_y = (markers[i].coords[0]);

var markerUrl = (url+"?marker="+y+","+x);
markerUrl = encodeURI(markerUrl);

  // Add the marker
  var marker = L.marker([x, y], {icon: getIcon(i),title: markers[i].group}).addTo(layerGroups[markers[i].group]);
  globalMarkers.push(marker);
}
for (var i = 0; i < zone.length; i++) {
  // if the group doesn't exists in layergroups
  if (layerGroups[zone[i].group] == undefined) {
    // Create the group
    layerGroups[zone[i].group] = new L.LayerGroup();
}
var x = (zone[i].coords[1]).toFixed(0);
var y = (zone[i].coords[0]).toFixed(0);
var origin_x = (zone[i].coords[1]);
var origin_y = (zone[i].coords[0]);
  // Add the marker
  var marker = L.circle([x, y], {radius: zone[i].rad,color: zone[i].col}).addTo(layerGroups[zone[i].group]);
  marker.bindTooltip(zone[i].name, {permanent: true, direction: "top", className: "text-label", offset: [0, 15] });
  globalMarkers.push(marker);
}
///////////////
for (var i = 0; i < boxs.length; i++) {
  // if the group doesn't exists in layergroups
  if (layerGroups[boxs[i].group] == undefined) {
    // Create the group
    layerGroups[boxs[i].group] = new L.LayerGroup();
}
var x = (boxs[i].coords[1]).toFixed(0);
var y = (boxs[i].coords[0]).toFixed(0);
var origin_x = (boxs[i].coords[1]);
var origin_y = (boxs[i].coords[0]);
  // Add the marker
  var boxNs = new L.Marker([x,y], {
  	icon: new L.DivIcon({
  		className: 'mapBox',
  		html: `<span class="mapBox">${boxs[i].name}</span>`
  	})
  }).addTo(layerGroups[boxs[i].group]);
  globalMarkers.push(boxNs);
}

map.on('zoomend', function (e) {
	if (map.getZoom() == 4) {
		$("span.mapBox").css("transform","scale(2)");
	}
	if (map.getZoom() == 3) {
		$("span.mapBox").css("transform","scale(1.5)");
	}
	if (map.getZoom() == 2) {
		$("span.mapBox").css("transform","scale(1)");
	}
	if (map.getZoom() == 1) {
		$("span.mapBox").css("transform","scale(0.8)");
	}
});


$(document).ready(function() {
	map.addLayer(layerGroups['boxN']);
	map.addLayer(layerGroups['textmarkers']);
});

function tog(element, layer) {
	if (element == 'nocheck') {
		map.addLayer(layerGroups[layer]);
	} else if(element == 'check'){
		map.removeLayer(layerGroups[layer]);
	}
}

// TOGGLE ALL LAYERS
var allmarkers = document.getElementById('allmarkers');
function toggleAll(element) {
	if (element.checked) {
		$('.mark-list li a').each(function() {
			$(this).removeClass();
			$(this).addClass('check');
		});
		for (var key in layerGroups) {
			map.addLayer(layerGroups[key]);
		}
		$(".heatmap-canvas").show();
		$('#showAll').html('Скрыть все');
	} else {
		$('.mark-list li a').each(function() {
			$(this).removeClass();
			$(this).addClass('nocheck');
		});
		for (var keys in layerGroups) {
			map.removeLayer(layerGroups[keys]);
		}
		$(".heatmap-canvas").hide();
		$('#showAll').html('Показать все');

	}
}

allmarkers.onchange = function() {toggleAll(this)};

$(allmarkers).click(function(){
	if($(this).prop("checked") == true){
		var toggled, activemarkers = [];
		$('.markers-list input').each(function() {
			toggled = {id: $(this).attr('id'), value: $(this).prop('checked')};
			activemarkers.push(toggled);
		});
	}
});

$('.mark-list').on("click", "a", function(e) {
	if (this.className == 'check') {
		tog(this.className, this.id);
		$(this).removeClass('check');
		$(this).addClass('nocheck');
	}else{
		tog(this.className, this.id);
		$(this).removeClass('nocheck');
		$(this).addClass('check');
	}
	e.preventDefault();
});

// Available markers to add on click
var mapMarkers = [];
var markerIconTypes = [];
for (var i in mapMarkers) {
	var icon = mapMarkers[i].icon;
	var iWidth = mapMarkers[i].width;
	var iHeight = mapMarkers[i].height;
  // make the icon while we are here
  markerIconTypes[i] = L.icon({
  	className: "",
  	iconUrl: iconsUrl + icon.replace(/ /g, "") + '.png',
  	iconSize: [iWidth, iHeight],
  	iconAnchor: [iWidth / 2, iHeight / 2,],
  	popupAnchor: [0, -iHeight / 2]
  });
};

var userMarkLayer = true;
$("#usMark").on("click",function() {
	if (userMarkLayer == true) {
		grLayer.remove();
		userMarkLayer=false;
	}else{
		grLayer.addTo(map);
		userMarkLayer=true;
	}
});
///////////////////////////////////////////////

var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

var options = {
	position: 'topright',
	draw: {
		polyline: {
			shapeOptions: {
				color: '#bada55',
				weight: 5
			}
		},
		polygon: {
                allowIntersection: false, // Restricts shapes to simple polygons
                shapeOptions: {
                	color: '#bada55'
                }
            },
            circle: false, // Turns off this drawing tool
            rectangle: {
            	shapeOptions: {
            		clickable: false
            	}
            },
            marker: false,
            circlemarker: false
        },
        edit: {
            featureGroup: editableLayers, //REQUIRED!!
            remove: true
        }
    };
    
    var drawControl = new L.Control.Draw(options);
    map.addControl(drawControl);

//////// INCLUDE FUNCTION START ////////////

var params = window
.location
.search
.replace('?','')
.split('&')
.reduce(
	function(p,e){
		var a = e.split('=');
		p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
		return p;
	},
	{}
	);

function randomInteger(min, max) {
	var rand = min - 0.5 + Math.random() * (max - min + 1)
	rand = Math.round(rand);
	return rand;
}

function randomString() {
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var string_length = 7;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}

///////// INCLUDE FUNCTION END /////////////////
var newUr = randomString();
var globalUrl = newUr;

if (window.location.href.indexOf("?map=") > -1) { 
	$.ajax({
		url: '/connector',
		type: 'POST',
		cashe: false,
		data: {type: 'load', url: params['map']},
		dataType: 'json',
		success: function(data) {
			var deparsData = JSON.parse(data);
			if (deparsData.loaded == 1) {
				dodo(data);
				$("#copUrl").val(url+'?map='+params['map']);
				$(".copButton").attr("data-clipboard-text",url+'?map='+params['map']);
				globalUrl = params['map'];
			}else if(deparsData.loaded == 0){
				$("#copUrl").val(url+'?map='+window.newUr);
				$(".copButton").attr("data-clipboard-text",url+'?map='+window.newUr);
				history.pushState('', '', `?map=${window.newUr}`);
			}
		}
	});
}else{
	/*history.pushState(null, null, '/?map='+newUr);*/
	$("#copUrl").val(url+'?map='+newUr);
	$(".copButton").attr("data-clipboard-text",url+'?map='+newUr);
	history.pushState('', '', `?map=${window.newUr}`);
}

var userIp;
$.ajax({
	url: 'https://api.ipdata.co/?api-key=21f794afdf8b2100090c53f276b7af2579cadf19ae3edf12fe0c6f16',
	type: 'get',
	success: function(data) {
		userIp = data.ip;
	},
	async: false
});

//////////////////////////////////////////////////////

var myIcon = L.icon({
	iconUrl: iconsUrl+'point.png',
	iconSize: [50, 65],
	iconAnchor: [24, 60]
});
var userIcon = L.icon({
	iconUrl: iconsUrl+'point-user.png',
	iconSize: [50, 65],
	iconAnchor: [24, 60]
});

var grLayer = [];
grLayer = new L.LayerGroup();
map.on(L.Draw.Event.CREATED, function (e) {
	var type = e.layerType,
	layer = e.layer;
	editableLayers.addLayer(layer);
});
var allowMark = true;
map.on('draw:drawstart', function (evt) {
	allowMark = false;
});
map.on('draw:drawstop', function (evt) {
	allowMark = true;
});
map.on('draw:editstart', function (e) {
	allowMark = false;
});
map.on('draw:editstop', function (e) {
	allowMark = true;
});
map.on('draw:deletestart', function (evt) {
	allowMark = false;
});
map.on('draw:deletestop', function (e) {
	allowMark = true;
});
map.on('draw:deleted', function (e) {
	for (var i in e.layers._layers) {
		var paintId = e.layers._layers[i].defaultOptions.markId;
		$.ajax({
			url: '/connector',
			type: 'POST',
			cashe: false,
			data: {type: 'delete', url: globalUrl, edId: paintId, class: "draw"}
		});
	}
}); 

map.on('draw:edited', function (e) {
	allowMark = true;
	for (var i in e.layers._layers) {
		var edLay = e.layers._layers[i];
		var shape = edLay.toGeoJSON();
		var paintId = e.layers._layers[i].defaultOptions.markId;
		$.ajax({
			url: '/connector',
			type: 'POST',
			cashe: false,
			data: {type: 'update', url: globalUrl, dataM: shape, edId: paintId, class: "draw"}
		});
	}
});

map.on('draw:created', function (e) {
	var mID = randomInteger(2000,5000);
	var type = e.layerType;
	var layer = e.layer;

	var shape = layer.toGeoJSON();
	var shape_for_db = JSON.stringify(shape);

	var dataD = `{"${mID}":{"owner":"${window.userIp}","data":${shape_for_db}}}`;
	$.ajax({
		url: '/connector',
		type: 'POST',
		cashe: false,
		data: {type: 'creat', url: globalUrl, class: "draw", data: dataD, owner: window.userIp}
	});
});

var edit = true;
function dodo(data) {
	var ss = JSON.parse(data);

	if (ss.read == 1 && ss.own != userIp) {
		window.edit = false;
		readSwitch.disable();
		$(".leaflet-draw").css("display","none");
	}else if (ss.read == 0 && ss.own != userIp) {
		readSwitch.disable();
	}

	if (ss.read == 1) {
		readSwitch.on();
	}else if(ss.read == 0){
		readSwitch.off();
	}

	for (var i in ss.markUser) {
		var markOwn = ss.markUser[i].owner;
		var lat = ss.markUser[i].latting[0];
		var lng = ss.markUser[i].latting[1];

		if (markOwn == userIp) {
			if (ss.read == 0 || ss.own == userIp)
				var marU = L.marker([lat,lng],{icon:myIcon, markId: i, draggable: true}).addTo(grLayer);
			else 
				var marU = L.marker([lat,lng],{icon:myIcon, markId: i, draggable: false}).addTo(grLayer);

			var markToolt = marU.bindTooltip(ss.markUser[i].name,{offset:[0,-45],direction:'top',interactive: 'true',className: "my-label",permanent: true});

			if (ss.read == 0 || ss.own == userIp) {
				marU.on("dragend", function(e) {
					var newLat = [e.target._latlng.lat,e.target._latlng.lng];
					var markids = this.options.markId;

					$.ajax({
						url: '/connector',
						type: 'POST',
						cashe: false,
						data: {type: 'update', url: globalUrl, udp: "lat", markid: markids, data: newLat, class: "marker"}
					});
				});

				marU.on("click", function(e) {
					var markerID = this.options.markId;
					$.ajax({
						url: '/connector',
						type: 'POST',
						cashe: false,
						data: {type: 'delete', url: globalUrl, markId: markerID, class: "marker"}
					});
					this.unbindTooltip();
					map.removeLayer(this);
				});

				marU.on("contextmenu", function(e) {
					var theMark = this;
					var theMarId = theMark.options.markId;

					var htmMark = `
					<input id="nMark" type="text" placeholder="Название" maxlength="20">
					<div style="display:flex; justify-content: center;">
					</div>
					`;

					$.sweetModal({
						title: 'Наименовать маркер',
						content: htmMark,
						theme: $.sweetModal.THEME_DARK,
						buttons: {
							someAction: {
								label: 'Сохранить',
								classes: '',
								action: function() {
									var contInp = $('#nMark').val();
									if (contInp != '') {
										theMark.setTooltipContent(contInp);
									}

									$.ajax({
										url: '/connector',
										type: 'POST',
										cashe: false,
										data: {type: 'update', url: globalUrl, markid: theMarId, name: contInp, class: "marker", udp: "name"}
									});
								}
							},
						}
					});

					if (theMark.getTooltip()._content != '') {
						$('#nMark').val(theMark.getTooltip()._content);
					}
				})
			}
		}else{ 
			var marU = L.marker([lat,lng],{icon:userIcon, markId: i}).addTo(grLayer);
			var markToolt = marU.bindTooltip(ss.markUser[i].name,{offset:[0,-45],direction:'top',interactive: 'true',className: "my-label",permanent: true});
			marU.on("click", function(e) {
				e.preventDefault;
			});
		}
	}
	for (var i in ss.markDraw) {
		var theId = i;
		var owner = ss.markDraw[i].owner;

		if (owner == userIp) {
			var geojsonLayer = L.geoJson(ss.markDraw[i].data,{"style":{"color":"#f357a1"},"markId":i});
			var setPol = geojsonLayer.getLayers()[0].addTo(editableLayers);
		}else{
			var newLay = L.geoJson(ss.markDraw[i].data,{"style":{"color":"#b46de7"},"markId":i}).addTo(grLayer);
		}
	}

	grLayer.addTo(map);
}

$(document).ready(function() {
	if(edit == true) {
		map.on('click', function(e) {
			if (e.latlng.lat < 0 || e.latlng.lat > 4095 || e.latlng.lng < 0 || e.latlng.lng > 4095) {
			}else{
				if (allowMark) {
					var mID = randomInteger(2000,5000);
					var userMarkers = L.marker(e.latlng, {
						icon: myIcon,
						draggable: true,
						markid: mID
					}).on('contextmenu', rightClick).addTo(map);
					var markToolt = userMarkers.bindTooltip('',{offset:[0,-45],direction:'top',interactive: 'true',className: "my-label",permanent: true});

					userMarkers.on("click", function(e) {
						var markerID = this.options.markid;
						$.ajax({
							url: '/connector',
							type: 'POST',
							cashe: false,
							data: {type: 'delete', url: globalUrl, markId: markerID, class: "marker"}
						});
						this.unbindTooltip();
						map.removeLayer(this);
					});

					var newMarkData = `{"${mID}":{"name":"","latting":[${e.latlng.lat},${e.latlng.lng}],"owner":"${window.userIp}"}}`;

					$.ajax({
						url: '/connector',
						type: 'POST',
						cashe: false,
						data: {type: 'creat', url: globalUrl, class: "marker", data: newMarkData, owner: window.userIp}
					});

					userMarkers.on("dragend", function(e) {
						newLat = [e.target._latlng.lat,e.target._latlng.lng];
						var markids = this.options.markid;

						$.ajax({
							url: '/connector',
							type: 'POST',
							cashe: false,
							data: {type: 'update', url: globalUrl, markid: markids, data: newLat, class: "marker", udp: "lat"}
						});
					});

					var htmMark = `
					<input id="nMark" type="text" placeholder="Название" maxlength="20">
					<div style="display:flex; justify-content: center;">
					</div>
					`;
					$.sweetModal({
						title: 'Наименовать маркер',
						content: htmMark,
						theme: $.sweetModal.THEME_DARK,
						buttons: {
							someAction: {
								label: 'Сохранить',
								classes: '',
								action: function() {
									var contInp = $('#nMark').val();
									if (contInp != '') {
										userMarkers.setTooltipContent(contInp);
									}

									$.ajax({
										url: '/connector',
										type: 'POST',
										cashe: false,
										data: {type: 'update', url: globalUrl, markid: mID, name: contInp, class: "marker", udp: "name"}
									});
								}
							},
						}
					});
				}
			}
		});

		function rightClick(e) {
			var theMark = this;
			var theId =  theMark.options.markid;
			var htmMark = `
			<input id="nMark" type="text" placeholder="Название" maxlength="20">
			<div style="display:flex; justify-content: center;">
			</div>
			`;
			
			$.sweetModal({
				title: 'Наименовать маркер',
				content: htmMark,
				theme: $.sweetModal.THEME_DARK,
				buttons: {
					someAction: {
						label: 'Сохранить',
						classes: '',
						action: function() {
							var contInp = $('#nMark').val();
							if (contInp != '') {
								theMark.setTooltipContent(contInp);
							}

							$.ajax({
								url: '/connector',
								type: 'POST',
								cashe: false,
								data: {type: 'update', url: globalUrl, markid: theId, name: contInp, class: "marker", udp: "name"}
							});
						}
					},
				}
			});

			if (theMark.getTooltip()._content != '') {
				$('#nMark').val(theMark.getTooltip()._content);
			}
		}
	}
});

$(".viewSwich").on("click", ".switch", function(e) {
	if (edit == true) {
		var switchStatus = readSwitch.getChecked();
		$.ajax({
			url: '/connector',
			type: 'POST',
			cashe: false,
			data: {type: 'upSwich', url: globalUrl, data: switchStatus}
		});
	}
})