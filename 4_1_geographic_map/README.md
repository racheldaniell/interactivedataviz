# Section 4 | Tutorial 1 | Interactive Map

The goals for this tutorial are:

- to be exposed to Leaflet and how to create a map, add a basemap, and add overlay/thematic map layers
- to revisit GeoJSON data, and how geographical features on our earth translate to projected visual shapes in web-based map visualizations
- to gain practice styling map data layers and adding popups


## Setup + Serve:

You should already have a local copy of your repository from the [tutorial 1](../1_1_getting_started/README.md). Start by getting a [basic server](../1_1_getting_started/3_BASIC_SERVER.md) up and running. This should include all the changes you've made thus far.

Once your local serve is up and reacting to code changes, you're ready to begin working on your tutorial assignment.
As you're building, don't forget you can always reference the [demo code branch](https://github.com/racheldaniell/interactivedataviz/tree/demo) for additional context.

## Exercise:

- [ ] Implement a new Leaflet map project, using any basemap and geogrpahic area that interests you 

- [ ] Using the us state geojson data provided in the [data folder](../data/), or any other geojson of your choice, add a polygon or line or point data layer and style it (feel free to pull in data of the world or of another country if you like).
AND/OR: Manually add custom points or lines or polygons to your map using Leaflet.js. 

- [ ] Add popups to your map via markers or circles, either as custom text or based on data within your data sources.

- [ ] Make intentional design decisions -- colors, opacities, choices in which aspects to style, etc. should be relevant to your data and create a strong visual feel.

**BONUS:**

- [ ] Take the us state capitals CSV data provided in the [data folder](../data/) or any other CSV format file of your choice that contains columns for lat and lon and add that to your map using Papaparse or another csv parsing tool. 

- [ ] Take a non-GeoJSON/non-CSV format geospatial data layer (shapefile, KMZ, etc.) in QGIS or from an external source and convert it to GeoJSON (either by exporting its features as GeoJSON from QGIS or through an online tool like geojson.io), then add that new GeoJSON file to your interactive map (the NYC one from class or your new map).

- [ ] If you use React.js in your general web development, try creating a Leaflet map using React-Leaflet https://react-leaflet.js.org. OR if you use Vue.js in your general web development, try creating a Leaflet map using Vue Leaflet https://vue2-leaflet.netlify.app/ .

- [ ] Make a custom basemap using Mapbox Studio with specific design choices to modify the basemap look (https://www.mapbox.com/mapbox-studio) and use that in your interactive map.


