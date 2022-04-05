# Section 3 | Tutorial 4 | Geographic

The goals for this tutorial are:

- to think through content creation needs and design choices for storymaps
- to understand choices in basemap/tile map service selection
- to gain exprience creating storymaps with custom data points

## Setup + Serve:

You should already have a local copy of your repository from the [tutorial 1](../1_1_getting_started/README.md). Start by getting a [basic server](../1_1_getting_started/3_BASIC_SERVER.md) up and running. This should include all the changes you've made thus far.

Once your local serve is up and reacting to code changes, you're ready to begin working on your tutorial assignment.
As you're building, don't forget you can always reference the [class code branch](https://github.com/InteractiveDataVis/Interactive-Data-Vis-Fall2021/tree/class/) or the [demo code branch](https://github.com/InteractiveDataVis/Interactive-Data-Vis-Fall2021/tree/demo/) for additional context.

## Assignment:

- [ ] Create a new storymap: Using your own CSV of geographically oriented story points for a data-driven geospatial narrative, (including lat/long data for each point), create a new map-based "scrollytelling" story. Think through how the user will experience your storymap and create content, zoom levels, and transitions appropriate to the experience you want to create. Add a basemap and your points to the map. You may want to storyboard the content before creating it on your map.

- [ ] Try a different basemap/tile map service source and design than used in in-class demo storymaps.

- [ ] Make intentional design decisions -- colors, fonts, default zoom levels, basemap source and design, etc. to be relevant to your data.

**BONUS:**

- [ ] Add multimedia such as images or video to your hover/popups for several points.

## Deploy + Submit

Once you've completed the assignment, use the Github workflow to deploy your work to **your fork** of the course repository. Post the following as a comment to the appropriate post on the [commons site](https://data73200sp2022.commons.gc.cuny.edu/):
1. a link to your committed code repository (your link will look something like: `https://github.com/[YOUR_USERNAME]/Interactive-Data-Vis-SP2022/[TUTORIAL_PATH]/`)
2. a link to your deployed example (your link will look something like: `https://[YOUR_USERNAME].github.io/Interactive-Data-Vis-SP2022/[TUTORIAL_PATH]/`)




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
