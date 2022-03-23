
// 1 - VARIABLES - declare initial variables and globals

// constants for our graphics area width and height
// add margins to facilitate per-bar labeling

const width = window.innerWidth * .8;
const height = window.innerHeight / 3;
const margins = { top: 10, bottom: 25, left: 10, right: 10 };


// 2 - DATA - load in our data 

// call in our csv data using d3
// then add next steps with '.then' to make data usable
// you can view the data output from this in console in browser


d3.csv('../data/squirrelActivities.csv', d3.autoType).then(data => {
    console.log("data", data)

    
    // 3 - SCALES - define visual x and y scales

    // create SCALES first using variables
    // each scale needs a scale type
    // X Scale is type categorical, based on Activity data
    // for X categorical type use d3.scaleBand
    // Y Scale is type continuous quantitative numeric
    // for Y numeric type use d3.scaleLinear
    // for each scale need a Domain and a Range
    // DOMAIN is your DATA categories/min/max
    // RANGE is your VISUAL categories/min/max
    // scale provides translator between data and visuals
    // for X scale range - visual min 0 and max the window width
    // for X scale domain - our squirrel activity types
    // x domain as "running" "chasing" but pull dynamic data
    // y scale linear so Domain is max and min values to display
    // frequently desired linear min value is 0
    // X range saying "let's go from zero position to..."
    // Y range saying "max lowpoint of ___ then back to zero"

    const xScale = d3.scaleBand()
    .domain(data.map(d=> d.activity))
    .range([0, width])

 
    const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d=> d.count)]) // domain relates to data
    .range([height, 0])  // range relates to visuals

        // see color scales reference here: https://github.com/d3/d3-scale-chromatic

    const colorScale = d3.scaleOrdinal(d3.schemeDark2)
    .domain(data.map(d=> d.activity))
    // can define with your own range per category and empty parens
    // or can define using d3.scheme__ in parens
    //.range(["aqua", "lightblue", "blue","darkblue","black"])


    // 4 - ELEMENTS - append/add elements into HTML via JS

    // container, canvas, pasteboard
    // add SVG by declaring a variable const
    // using d3.select on your <div> id
    // then have JS inject it into HTML by .append

    const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

    // 5 - SELECT-JOIN-DRAW - Select ELEMENTS and JOIN data to them - data-to-pixels


    // rects, graphics - joined to our data
    // first SELECT element to work with and choose graphic/rect
    // then reference DATA desired
    // then JOIN the data to create graphics/rects/bars
    // then add properties to display the bars
    // note you select all even before rects are created
    // d3 then reconciles data = rects, resolving that
    // it creates a rect/graphic for each data object
    // note the syntax again is the "." for chaining

    // 6 - ATTRIBUTES - Continue to add needed and desired attributes to draw

    // add DATA-DRIVEN attributes and visual configuration attributes to your graphics
    // make a relationship to the xScale data
    // make a relationship to the yScale data
    // change the width to relate to your xSCALE band so that it draws to data spec
    // change the height to relate to your ySCALE band so that it draws to data spec
    // note that yScale needs to be SUBTRACTED from the total height due to 0,0 position
    // less data-driven more interpretive/aesthetic styling can be added as attributes


        svg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("width", xScale.bandwidth()-30)
        .attr("height", d=> height - yScale(d.count))
        .attr("x", d=>xScale(d.activity)+15)
        .attr("y", d=>yScale(d.count))
        .attr("fill", d => colorScale(d.activity)) // color option

        // draw bottom 'activity' text
        // MUST also define margins variable up at the top of code
        svg.selectAll("text.activity")
        .data(data)
        .join("text")
        .attr("class", 'activity')
        .attr("x", d => xScale(d.activity) + (xScale.bandwidth() / 2))
        .attr("y", height - margins.bottom)
        .attr("dy", "1em") // adjust the text a bit lower down
        .attr("text-anchor", 'middle') // set the x/y to refer to the middle of the word
        .text(d => d.activity) // set the text

        // extras: chart label
        svg.append("text")      
        .attr("x",  width / 2 )
        .attr("y",  height-250 )
        .style("text-anchor", "middle")
        .text("squirrel activities observed");

        // draw bottom 'activity' text
        svg.selectAll("text.activity")
          .data(data)
          .join("text")
          .attr("class", 'activity')
          .attr("x", d => xScale(d.activity) + (xScale.bandwidth() / 2))
          .attr("y", height - margins.bottom)
          .attr("dy", "1em") // adjust the text a bit lower down
          .attr("text-anchor", 'middle') // set the x/y to refer to the middle of the word
          .text(d => d.activity) // set the text

        // draw top 'count' text
        svg.selectAll("text.count")
          .data(data)
          .join("text")
          .attr("class", 'count')
          .attr("x", d => xScale(d.activity) + (xScale.bandwidth() / 2))
          .attr("y", d => yScale(d.count))
          .attr("dy", "1em") // adjust the text a bit lower down
          .attr("text-anchor", 'middle') // set the x/y to refer to the middle of the word
          .text(d => d3.format(",")(d.count)) // set the text, add a formatter to properly format numbers: https://github.com/d3/d3-format


})


