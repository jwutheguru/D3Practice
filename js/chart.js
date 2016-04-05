$(function() {

    // graph dimensions
    var margin = {top: 50, right: 20, bottom: 20, left: 50};
    var width = 800 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    // date formatter
    var dateFormatter = d3.time.format("%Y-%m-%d"); // ie 2016-03-27

    // x and y ranges
    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    // x and y axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom");//.ticks(myData.length);

    var yAxis = d3.svg.axis().scale(y)
        .orient("left");//.ticks(10)

    // line chart line
    var valueLine = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.value); });

    // svg canvas
    var svg = d3.select("#linechart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // get and process data
    var data = window.myData;
    data = data.map(function(curr, idx) { 
        return {
            date: curr.date, //dateFormatter(new Date(curr.date * 1000)),
            value: +curr.value
        };
    });

    // scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    // draw the line for the value in data
    svg.append("path")
        .attr("class", "line")
        .attr("d", valueLine(data));

    // add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

});
