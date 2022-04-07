
// initialize map - Set up initial map center and zoom level
// relatively central coordinates for NYC: 40.70748615030739, -73.92744598608154
// or gowanus: 40.67987875316114, -73.98754773046211
// zoom levels get closer the higher the number - try 11 or 12 or 13 to start
// the Map class of Leaflet creates a map on the page; pass two parameters to this class of coordinates array plus zoom
// there are more parameters we could define
// you may see "setView()" used as an alternate method
const map = L.map('map', {
  center: [40.67974035151055, -73.99749399522467],
  zoom: 13.5
})


  /* Control panel to display map layers */
  /*
  Add a legend (checkboxes) to the upper-right corner.
  At first, baselayers and overlays are set to `null` (empty legend).
  We will be adding items to the legend as we load layers.
  */  
  let controlLayers;
  
  controlLayers = L.control.layers( null, null, {
    position: "topright",
    collapsed: false
  }).addTo(map);


// display basemap tile layer
// access tiles via URLs and add attribution info
// you can try many options and also create custom basemaps via mapbox
// to create a tile layer, we need to set the URL template for the tile image, the attribution text, and the maximum zoom level
// put it in a variable for more control later

const basemapStreets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  minZoom: 0,
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

controlLayers.addBaseLayer(basemapStreets, 'OSM basemap');


const basemapStamenTerrain = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 19,
	ext: 'png'
}).addTo(map);

controlLayers.addBaseLayer(basemapStamenTerrain, 'Terrain+labels basemap');

/* const Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  subdomains: 'abcd',
  minZoom: 1,
  maxZoom: 16,
  ext: 'jpg'
}).addTo(myMap); */

// see more basemap options at https://leaflet-extras.github.io/leaflet-providers/preview/


// read data from data files
// grab the geojson files and turn each into a map layer
// add data overlay layers
// add geoJSON data
// takes the getJSON functionality plus L.geoJson plus addTo(mapname)


const waterLevelAvg2020 = $.getJSON("../data/2020s-Mean-Monthly-High-Water.geojson", function(data){
  let overlay1 = L.geoJson(data)
  overlay1.addTo(map);
  controlLayers.addOverlay(overlay1, "Water Level Avg 2020");
});

const waterLevelAvg2050 = $.getJSON("../data/2050s-Mean-Monthly-High-Water.geojson", function(data){
  let overlay2 = L.geoJson(data)
  overlay2.addTo(map);
  controlLayers.addOverlay(overlay2, "Water Level Avg 2050");
});

const waterLevelAvg2080 = $.getJSON("../data/2080s-Mean-Monthly-High-Water.geojson", function(data){
  let overlay3 = L.geoJson(data)
  overlay3.addTo(map);
  controlLayers.addOverlay(overlay3, "Water Level Avg 2080");
});

let accessPlans = $.getJSON("../data/Waterfront-Access-Plans.geojson", function(data){
  let overlay4 = L.geoJson(data, {
    style: function (feature) {
      return {color: "orange"};
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup(feature.properties.name);
    }
  })
  overlay4.addTo(map);
  controlLayers.addOverlay(overlay4, "Waterfront Access Plans");
}); 


/* L.geoJson(accessPlans, {
	style: function (feature) {
		return {color: feature.properties.color};
	},
	onEachFeature: function (feature, layer) {
		layer.bindPopup(feature.properties.description);
	}
}).addTo(map); */

// add simple circle marker

const myCircle01 = L.circle([40.67305428283485, -73.99798788949238], {
  color: 'white',
  fillColor: 'yellow',
  fillOpacity: 0.3,
  radius: 500
}).addTo(map);

controlLayers.addOverlay(myCircle01, 'Area of Interest 1');

const myCircle02 = L.circle([40.70115458832984, -73.97741896542865], {
  color: 'white',
  fillColor: 'yellow',
  fillOpacity: 0.3,
  radius: 500
}).addTo(map);

controlLayers.addOverlay(myCircle02, 'Area of Interest 2');


// to add popups/tooltips, we use "binding" to the graphic object

myCircle01.bindPopup("WATER LEVEL RISE MONITOR ZONE: The Area of Interest Near to the Gowanus Canal");

// return to each layer definition above and add all desired layers for user interaction into layer control

