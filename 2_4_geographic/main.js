
/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 };

/**
 * LOAD DATA
 * Using a Promise.all([]), we can load more than one dataset at a time
 * usState.json is MULTIPOLYGONS with multi lat, lon
 * stateCapitals.csv is POINTS with lat,lon
 * note we are naming states data set "geojson"
 * note we are naming capitals data set "capitals"
 * console.log if desired to see data in browser
 * */
Promise.all([
  d3.json("../data/usState.json"),
  d3.csv("../data/stateCapitals.csv", d3.autoType),
]).then(([geojson, capitals]) => {
//  console.log(capitals)
  
  // IN SCALES AREA SPECIFY PROJECTION as scale
  // just as regular Scales map data to space/screen
  // so projection will map lat/lon coordinates to screen space
  // this takes a few lines of code
  // just like our scales domain/range, we ref width/height and margins and data set
  // width/height in an array
  // then end array comma data set variable name
  // many projections but one dominant for online
  // we will translate Albers to onlne projection using d3
  // console.log it if you want to preview results

  const projection = d3.geoAlbersUsa()
    .fitSize([
      width - margin.left - margin.right,
      height - margin.top - margin.bottom
    ], geojson)
    // console.log('projection :>> ', projection);

 
  // CREATE SVG ELEMENT 
  // use our classic methodology to append your svg into your html <div>
  // check its creation in your browser if you like
    const svg = d3.select("#container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      //;



  // PREPARE TO JOIN DATA + DRAW GEO OUTLINES
  // DEFINE PATH FUNCTION TO DRAW LINES
  // create variable for a path generator
  // use d3's geoPath and feed it our projection variable 
  // that projection variable relates our geo shape data to screen space

  const pathGen = d3.geoPath(projection)

  // SELECTALL-DATA-JOIN
  // for TWO data sets this time, so 2 JOINS
  // this is most complex section of code

  // First DRAW GEOJSON PATH via SELECT-DATA-JOIN-ATTR for US States
  // this draws our geographic basemap features
  // note the "path.states" - a graphic elment plus a class reference w/in a variable

  const states =
  svg.selectAll("path")  //w/class path.states
    .data(geojson.features)
    .join("path")
    //.attr("class","states")
    .attr("d", d => pathGen(d))
    .attr("fill", "magenta")
    .attr("stroke", "black")


  // SELECT-DATA-JOIN-DRAW-ATTR to APPEND DATA AS SHAPE
  // ATTR to include projection as done with scales
  // add state capitals from CSV 
  // most of code is similar to what done in past tutorials
  // new: at end, need to specify WHERE to put circle based on lat, lon
  // in geo viz we are working with lat, long rather than coordinates for placement
  // we translate lat, long onto screenspace via "transform", "translate"

  svg.selectAll("circle")  //with class circle.capital
    .data(capitals)
    .join("circle")
    .attr("r", 7)
    .attr("fill", "blue")
    .attr("transform", d => {
      // use our projection to get lat/long translated to screenspace
      // ref: https://github.com/d3/d3-geo#_projection
      // need to define x and y as variables
      // then "map"/"translate" them from lat, long
      // use the projection data-to-screenspace we defined earlier
      // relate to our field names/features/properties of lat and long
      // essentially input our lat/long per our projection and output an X and Y position
      const [x, y] = projection([d.longitude, d.latitude])
      return `translate(${x}, ${y})`
    })


 // EXTRA OPTION
  // draw a point directly through your code
  // use lat lon of Grad Ctr, lat: 40.7423, long: -73.9833

  const gcPoint = {latitude: 40.7423, longitude: -73.9833}
  svg.selectAll("circle.point")
  .data([gcPoint])
  .join("circle")
  .attr("r", 12)
  .style("fill", "gold")
  .attr("transform", d => {
    // use our projection to map geo data to screenspace
    // ref: https://github.com/d3/d3-geo#_projection
    const [x, y] = projection([d.longitude, d.latitude])
    return `translate(${x}, ${y})`
  })


});