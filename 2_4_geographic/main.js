/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 };

/**
 * LOAD DATA
 * Using a Promise.all([]), we can load more than one dataset at a time
 * */
Promise.all([
  d3.json("../data/usState.json"),
  d3.csv("../data/stateCapitals.csv", d3.autoType),
]).then(([geojson, capitals]) => {
  
  //  IN SCALES AREA SPECIFY PROJECTION as scale
 const projection = d3.geoAlbersUsa()
  .fitSize([width - margin.left - margin.right, height - margin.top - margin.bottom], geojson)

  // CREATE SVG ELEMENT
const svg = d3.select("#container")
  .append("svg")
  .attr("width", width)
  .attr("height", height)

  // extra added after class: chart label
  svg.append("text")      
  .attr("x",  width *.5 )
  .attr("y",  height-margin.bottom)
  .style("text-anchor", "middle")
  .text("Geo Points & Single Point Transition");
  
  // PREPARE TO JOIN DATA + DRAW GEO OUTLINES
  // DEFINE PATH FUNCTION TO DRAW LINES
const pathGen = d3.geoPath(projection)

  // SELECTALL-DATA-JOIN
  // for TWO data sets this time, so 2 JOINS
const states = 
svg.selectAll("path")
  .data(geojson.features)
  .join("path")
  .attr("d", d => pathGen(d))
  .attr("fill", "magenta")
  .attr("stroke", "black")

svg.selectAll("circle")
  .data(capitals)
  .join("circle")
  .attr("r", 3) 
  .attr("fill", "gold")
  .attr("transform", d => {
    const [x, y] = projection([d.longitude, d.latitude])
    return `translate(${x}, ${y})`
  })


  // First DRAW GEOJSON PATH via SELECT-DATA-JOIN-ATTR for US States
  // APPEND GEOJSON PATH  
  
  
  // SELECT-DATA-JOIN-DRAW-ATTR to APPEND DATA AS SHAPE

   // extra added after class: single manual point with TRANSITION on enter
  // draw a point directly through code
  // draw point for CUNY graduate center
  // add transition on entry of drawn object to highlight it visually
  // nonte the example below was added after class for reference for projects

  const gradCenterPoint =  { latitude: 40.7423, longitude: -73.9833 };

  svg.selectAll("circle.point")
    .data([gradCenterPoint])
    .join(enter => enter
      .append("circle")
      .attr("class", "point")
      .attr("r", 30)
         // use our projection to go from long, lat => x, y
        // note LONG is X and LAT is Y
        // ref: https://github.com/d3/d3-geo#_projection
      .attr("transform", d=> {
        const [x, y] = projection([d.longitude, d.latitude])
        return `translate(${x}, ${y})`
      })
      .attr("fill", "deepskyblue")
      .call(enter => enter.transition()
          .delay(200) // in ms
          .duration(5000)  //in ms
          .attr("r", 10)
          .attr("fill", "blue")
          )
    )

});