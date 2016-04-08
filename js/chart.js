$(function() {

    // alias data and config
    var data = window.d3Data;
    var pageConfig = window.pageConfig;
    var chartConfig = window.chartConfig;
    var chartStyles = window.chartStyles;

    // process data
    data.forEach(function(d) {
        d.date = +d.date;//new Date(+d.date * 1000);
        d.value = +d.value;
    });

    // graph dimensions
    var margin = chartConfig.margin;
    var width = chartConfig.width - margin.left - margin.right;
    var height = chartConfig.height - margin.top - margin.bottom;

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
        .orient('bottom')
        .scale(xScale)
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
        .orient('left')
        .scale(yScale)
        .innerTickSize(-width).outerTickSize(0) // grid lines
        .tickPadding(10)
        .ticks(chartConfig.yAxisTicksCount); // .tickValues(yScale.domain());

    // line function
    var valueLine = d3.svg.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return yScale(d.value); });

    // svg canvas
    var svg = d3.select("#d3chart")
        .append("svg")
        .attr({
            "width": width + margin.left + margin.right,
            "height": height + margin.top + margin.bottom
        })
        .append("g")
        .attr({
            "transform": "translate(" + margin.left + "," + margin.top + ")"
        });

    // add the X Axis
    var xAxisElement = svg.append("g")
        .attr({
            "class": "x axis",
            "transform": "translate(0," + height + ")"
        })
        .call(xAxis) // create axis with xAxis function
        .style(chartStyles.axisTicks); // style axis

    // style X Axis grid lines
    xAxisElement
        .selectAll("line") // gets grid lines
        .style(chartStyles.gridLines); // style grid lines

    // rotate the X Axis ticks text if specified
    if (chartConfig.xAxisTicksRotation) {
        xAxisElement.selectAll("text")
            .style("text-anchor", "start")
            .attr("transform", "rotate(" + chartConfig.xAxisTicksRotation + ")");
    }

    // X Axis Label
    svg.append("text")
        .attr({
            "class": "x axis axis-label",
            "x": (width / 2),
            "y": (height + margin.bottom) - (margin.bottom / 3),
            "text-anchor": "middle"
        })
        .style(chartStyles.axisLabel)
        .text(chartConfig.xAxisLabel);

    // add the Y Axis
    var yAxisElement = svg.append("g")
        .attr({
            "class": "y axis"
        })
        .call(yAxis)
        .style(chartStyles.axisTicks);

    // style Y Axis grid lines
    yAxisElement
        .selectAll("line")
        .style(chartStyles.gridLines);

    // Y Axis Label
    var yAxisLabelPos = {
        x: (0 - margin.left) + (margin.left / 3),
        y: (height / 2)
    };
    svg.append("text")
        .attr({
            "class": "y axis axis-label",
            "x": yAxisLabelPos.x,
            "y": yAxisLabelPos.y,
            "text-anchor": "middle",
            "transform": "rotate(-90," + yAxisLabelPos.x + "," + yAxisLabelPos.y + ")"
        })
        .style(chartStyles.axisLabel)
        .text(chartConfig.yAxisLabel);

    // draw the line for the value in data
    svg.append("path")
        .data(data)
        .attr({
            "class": "line",
            "d": valueLine(data)
        })
        .style(chartStyles.lineStyle);

    // chart title
    svg.append("text")
        .attr({
            "class": "title",
            "x": (width / 2),
            "y": (0 - margin.top) + (margin.top / 1.5),
            "text-anchor": "middle"
        })
        .style(chartStyles.chartTitle)
        .text(chartConfig.chartTitle);

    // chart border
    svg.append("rect")
        .attr({
            "x": 0,
            "y": 0,
            "width": width,
            "height": height
        })
        .style(chartStyles.chartBorder);

});
