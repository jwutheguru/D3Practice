$(function() {

    // alias data and config
    var data = window.d3Data;
    var config = window.d3Config;

    // process data
    data.forEach(function(d) {
        d.date = +d.date;//new Date(+d.date * 1000);
        d.value = +d.value;
    });

    // graph dimensions
    var margin = {top: 70, right: 30, bottom: 20, left: 50};
    var width = 800 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    // data range
    var xMin = d3.min(data, function(d) { return d.date; });
    var xMax = d3.max(data, function(d) { return d.date; });

    var yMin = d3.min(data, function(d) { return d.value; });
    var yMax = d3.max(data, function(d) { return d.value; });

    // graph padding
    var xPadding = 21600; // half a day in seconds
    var yPadding = (yMax - yMin) / data.length / 2;

    // scale functions (no banana for scale)
    var xScale = d3.scale.linear()
        // .domain(d3.extent(data, function(d) { return d.date; }))
        .domain([ xMin - xPadding, xMax + xPadding ])
        .range([0, width]);

    var yScale = d3.scale.linear()
        // .domain(d3.extent(data, function(d) { return d.value; }))
        .domain([ yMin - yPadding, yMax + yPadding ])
        .range([height, 0]);

    // x and y axes
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom')
        .innerTickSize(-height).outerTickSize(0) // grid lines
        .tickPadding(10)
        .tickValues(data.map(function(d) { return d.date; }))
        .tickFormat(function (d, i) {
            var date = new Date(+d * 1000);
            return date.getUTCFullYear() + "-" + 
                (date.getUTCMonth() + 1) + "-" +
                date.getUTCDate();
        });

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient('left')
        .innerTickSize(-width).outerTickSize(0) // grid lines
        .tickPadding(10)
        .ticks(20); // .tickValues(yScale.domain());

    // line function
    var valueLine = d3.svg.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return yScale(d.value); });

    // svg canvas
    var svg = d3.select("#d3chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    // draw the line for the value in data
    svg.append("path")
        .data(data)
        .attr("class", "line")
        .attr("d", valueLine(data));

    // chart title
    svg.append("text")
        .attr("class", "title")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .text(config.chartTitle);

});
