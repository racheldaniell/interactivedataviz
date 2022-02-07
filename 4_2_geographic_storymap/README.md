# leaflet-storymap
Leaflet storymap with scroll-driven navigation for narrative and point markers from easy-to-learn template, with GeoJSON data file.

http://racheldaniell.github.io/leaflet-storymap-basic/index.html

This is a workshop tool based on a fork of the original by slead.github.io from https://github.com/JackDougherty/leaflet-storymap and uses [Handlebars template](http://handlebarsjs.com/) to configure the individual story elements.

## Original Demo
http://slead.github.io/leaflet-storymap/index.html

### Features
- Scroll-driven navigation, using screen swipe, trackpad, or keyboard down-arrow. Initial map displays all point markers.
- Viewers can pan and zoom the map independently of the narration, or click on any point to go directly to that chapter.
- Easy-to-learn template to create your own storymap. Upload text, point coordinates, zoom levels, and image links to a CSV generic spreadsheet, and drag into http://geojson.io to create a GeoJSON data file.
- Images can be stored in local subfolder or pulled from an external URL.
- Works in modern browsers: Chrome, Firefox, Safari, Internet Explorer 9+.

### HTML template
See the section labeled `handlebars template` in index.html and adjust the HTML within this [Handlebars template](http://handlebarsjs.com/) as required. 

The variables within this template are injected at run-time via `script.js`:

```
var output = {
    "containerId": 'container' + feature.properties['id'],
    "chapter": feature.properties['chapter'],
    "imgSrc": feature.properties['image'],
    "srcHref": feature.properties['source-link'],
    "srcText": feature.properties['source-credit'],
    "description": feature.properties['description']
}
```

Add corresponding sections to the HTML template and script to add new elements.


## Requires open-source libraries
- Leaflet.js
- leaflet.extra-markers
- jQuery
- Font Awesome

## Credits
- Adapted from original by slead.github.io from https://github.com/JackDougherty/leaflet-storymap 
- Original adapted from MUX Lab, Map Effects 100: https://github.com/muxlab/map-effects-100, see http://muxlab.github.io/map-effects-100/Leaflet/11_scroll-driven-map-navigation.html
- Thanks [@ilyankou](https://github.com/ilyankou) for improving image display, navigation scroll, and web interface
- Numeric icon markers thanks to https://github.com/coryasilva/Leaflet.ExtraMarkers and StackOverflow suggestions for modification
