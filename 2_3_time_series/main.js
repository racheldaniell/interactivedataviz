 /* CONSTANTS AND GLOBALS */
const width = window.innerWidth * .7,
  height = window.innerHeight * .7,
  margin = 30;

/* LOAD DATA */
d3.csv('../data/populationOverTime.csv', d => {
  return {
    year: new Date(+d.Year, 0, 1),
    country: d.Entity,
    population: +d.Population
  }
}).then(data => {
  console.log('data :>> ', data);

  // SCALES

  const xScale = d3.scaleTime()
    .domain(d3.extent(data, d=> d.year))
    .range([margin, width-margin])

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, d=> d.population))
    .range([height-margin, margin])

  // CREATE SVG ELEMENT

  const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  // BUILD AND CALL AXES
  // axes added in 2nd class session and updated after class

  const xAxis = d3.axisBottom(xScale)
  const yAxis = d3.axisLeft(yScale)

  svg.append("g")
    .attr("transform", `translate(0,${height-margin})`)
    .call(xAxis)

  svg.append("g")
  //.attr("transform", `translate(0,${height-margin.bottom})`)
  .attr("transform", `translate(${margin}, ${0})`)
      .call(yAxis)

  // sample code for axes
/*   const xAxis = d3.axisBottom(xScale)
  const yAxis = d3.axisLeft(yScale)
 
  svg.append("g")
    .attr("transform", `translate(0,${height-margin.bottom})`)
    .call(xAxis)
 
  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(yAxis)
 */ 


  // LINE GENERATOR FUNCTION
  const lineGen = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.population))

  // DRAW LINE
  svg.selectAll("path.line")
    .data([data])
    .join("path")
    .attr("class", "line")
    .attr("stroke", "blue")
    .attr("fill","none")
    .attr("d", d => lineGen(d))

});