// Page Configuration
window.pageConfig = {
    showImageExportButton: true, // displays a button to save chart as a .png image
    imageExportBackground: 'transparent' // default background for chart exported image, i.e. 'transparent' or 'white'
};

// Chart Configuration
window.chartConfig = {
    chartTitle: 'My Awesome Chart', // chart title

    width: 800, // chart width
    height: 550, // chart height
    margin: { top: 80, right: 30, bottom: 60, left: 70 }, // modify these if chart is clipped

    lineStrokeColor: 'steelblue', // line color
    lineStrokeWidth: 2, // line width

    // axis labels
    xAxisLabel: 'Date',
    yAxisLabel: 'Value',

    yAxisTicksCount: 20, // number of ticks for Y Axis
    // no xAxisTicksCount because we want each date to be a tick

    xAxisTicksRotation: 0 // rotate the text on the ticks for the X Axis
};

// Chart Element Styles
window.chartStyles = {
    lineStyle: {
        "fill": "none",
        "stroke": window.chartConfig.lineStrokeColor,
        "stroke-width": window.chartConfig.lineStrokeWidth,
        "shape-rendering": "crispEdges"
    },

    chartTitle: {
        "font-family": "Helvetica, Arial, sans-serif",
        "font-size": "2em",
        "font-weight": "bold",
        "text-align": "center"
    },

    axisLabel: {
        "font-family": "sans-serif",
        "font-size": "14px",
        "font-weight": "bold",
        "text-align": "center"
    },

    axisTicks: {
        "font-family": "sans-serif",
        "font-size": "10px",
    },

    gridLines: {
        "fill": "none",
        "stroke": "lightgrey",
        "stroke-width": 1,
        "shape-rendering": "crispEdges"
    },

    chartBorder: {
        "fill": "none",
        "stroke": "lightgrey",
        "stroke-width": 1,
        "shape-rendering": "crispEdges"
    }
};