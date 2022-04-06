# Section 4 | Tutorial 2 | Story Map

The goals for this tutorial are:

- to think through content creation needs and design choices for storymaps
- to understand choices in basemap/tile map service selection
- to gain exprience creating storymaps with custom data points

## Setup + Serve:

You should already have a local copy of your repository from the [tutorial 1](../1_1_getting_started/README.md). Start by getting a [basic server](../1_1_getting_started/3_BASIC_SERVER.md) up and running. This should include all the changes you've made thus far.

Once your local serve is up and reacting to code changes, you're ready to begin working on your tutorial assignment.
As you're building, don't forget you can always reference the [class code branch](https://github.com/InteractiveDataVis/Interactive-Data-Vis-Fall2021/tree/class/) or the [demo code branch](https://github.com/InteractiveDataVis/Interactive-Data-Vis-Fall2021/tree/demo/) for additional context.

## Assignment:

- [ ] Create a new storymap: Make a new copy of the CSV model template containing your own geographically oriented story points for a data-driven geospatial narrative, (including lat/lon data for each point), and use it to create a new map-based "scrollytelling" story. Think through how the user will experience your storymap and create content, zoom levels, and transitions appropriate to the experience you want to create. Add a basemap and your points to the map. It is recommended that you storyboard the content as step-by-step "moments"/"places" in your data story before creating it on your map (try hand-drawing or using a software tool like InDesign or even PowerPoint/Google Slides).

- [ ] Try a different basemap/tile map service source and design than was used in in-class demo storymap.

- [ ] Make intentional design decisions -- colors, fonts, default zoom levels, basemap source and design, etc. to be relevant to your data.

**BONUS:**

- [ ] Add multimedia such as images or video to your hover/popups for several points in your data story.

## Deploy + Submit

Once you've completed the assignment, use the Github workflow to deploy your work to **your fork** of the course repository. Post the following as a comment to the appropriate post on the [commons site](https://data73200sp2022.commons.gc.cuny.edu/):
1. a link to your committed code repository (your link will look something like: `https://github.com/[YOUR_USERNAME]/Interactive-Data-Vis-SP2022/[TUTORIAL_PATH]/`)
2. a link to your deployed example (your link will look something like: `https://[YOUR_USERNAME].github.io/Interactive-Data-Vis-SP2022/[TUTORIAL_PATH]/`)


--------------------------------------
# Notes and credits related to the template code models used in this tutorial:

# leaflet-storymap
Leaflet storymap with scroll-driven navigation for narrative and point markers from easy-to-learn template, with GeoJSON data file.

This is a teaching and workshop tool based on a modified version of an original code model by slead.github.io see: https://github.com/JackDougherty/leaflet-storymap and uses [Handlebars template](http://handlebarsjs.com/) to configure the individual story elements. Original demo:
http://slead.github.io/leaflet-storymap/index.html


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
- Original also credits [@ilyankou](https://github.com/ilyankou) for improving image display, navigation scroll, and web interface

