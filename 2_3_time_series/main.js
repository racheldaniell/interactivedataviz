
//CONSTANTS AND GLOBALS
const width = innerWidth * 0.7,
    height = innerHeight * 0.7,
    margin = {top: 10, bottom: 30, left: 80, right: 10};

//LOAD DATA
// instead of having D3 interpret the data types with d3.autotype, we will have it return specific types through "return" function
    d3.csv('../data/populationOverTime.csv', d => {
      return {
        year: new Date(+d.Year,0,1), // year, month, day
        country: d.Entity,
        population: +d.Population
      }
     }).then(data => {
      console.log('data :>> ', data);
     

//SCALES

    const xScale = d3.scaleTime()
    .domain(d3.extent(data, d=> d.year))
    .range([margin.left, width-margin.right])
 
  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, d=> d.population))
    .range([height-margin.bottom, margin.top])
  

const svg = d3.select("#container")
   .append("svg")
   .attr("width", width)
   .attr("height", height)


// axes scales

const xAxis = d3.axisBottom(xScale)
.ticks(6)
  
const yAxis = d3.axisLeft(yScale)

  const xAxisGroup = svg.append("g")
  .attr("class", "xAxis")
  .attr("transform", `translate(${0}, ${height - margin.bottom})`)
  .call(xAxis)

const yAxisGroup = svg.append("g")
  .attr("class", "yAxis")
  .attr("transform", `translate(${margin.left}, ${0})`)
  .call(yAxis)



  const lineGen = d3.line()
  .x(d=> xScale(d.year))
  .y(d=> yScale(d.population))



/* svg.selectAll("path")
.data(data)  
.join("path")
//.attr("class", "line")
.attr("stroke", "blue")
.attr("fill","none")
.attr("d", d => lineGen(d))
  
 */  

svg.selectAll("path.line")
.data([data]) 
.join(enter => enter
 .append("path")
 .style("opacity", 0)
 .style("fill", "none")
 .attr("d", d => lineGen(d))
 .call(enter => enter.transition()
   .duration(5000) // in ms
   .delay((d, i) => 200*i)
   .style("stroke", "blue")
   .style("stroke-width", 5)
   .style("opacity", 1)
 )
)
 .attr("class", 'line')

});