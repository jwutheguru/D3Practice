$(function() {

    var chartContainer = $('#d3chart');
    var pageConfig = window.pageConfig;
    var chartConfig = window.chartConfig;

    var pageTitle = chartConfig.chartTitle || document.title;

    document.title = pageTitle;

    if (pageConfig.showImageExportButton) {
        var saveImage = function(e) {
            var chartSvg = chartContainer.find('svg');

            var svgMarkup = chartSvg.clone()
                .attr({
                    'version': '1.1',
                    'xmlns': 'http://www.w3.org/2000/svg'
                })[0].outerHTML;

            var imageSrc = 'data:image/svg+xml;base64,' + btoa(svgMarkup);

            var canvas = document.createElement('canvas');
            canvas.setAttribute("width", chartConfig.width);
            canvas.setAttribute("height", chartConfig.height);
            var context = canvas.getContext('2d');

            var image = new Image();
            image.onload = function() {
                if (pageConfig.imageExportBackground && 
                    pageConfig.imageExportBackground.toLowerCase() !== 'transparent')
                context.beginPath();
                context.rect(0, 0, canvas.width, canvas.height);
                context.fillStyle = pageConfig.imageExportBackground;
                context.fill();

                context.drawImage(image, 0, 0);

                var canvasData = canvas.toDataURL("image/png");

                var link = document.createElement('a');
                link.download = (chartConfig.chartTitle || 'chart') + '.png';
                link.href = canvasData;
                link.click();
            };
            image.src = imageSrc;
        };

        // create a containing div
        var saveContainer = $('<div>')
            .attr({
                'class': 'save-container'
            })
            .insertAfter(chartContainer);

        // create a button
        var saveButton = $('<button>')
            .attr({
                'class': 'save-button'
            })
            .text("Export Image")
            .click(saveImage)
            .appendTo(saveContainer);
    }
});
