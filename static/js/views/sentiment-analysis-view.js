
var app = app || {};

app.SentimentAnalysisView = Backbone.View.extend({
            
    events : {
        
    },
    
    initialize : function(model, parentView) {
        this.model = model;
        this.parentView = parentView;
        return this;
    },
    
    render: function () {
        var source   = $('#sentiment-analysis-view').html();
        var template = Handlebars.compile(source);
        var html     = template(this.model);
        this.$el.html(html);
        return this;
    },
    
    drawGraph: function(e) {
        console.log('drawing chart');
        // this method is called when chart is first inited as we listen for "dataUpdated" event
        function zoomChart() {
            // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
            chart.zoomToIndexes(chartData.length - 40, chartData.length - 1);
        }

        // generate some random data, quite different range
        function generateChartData(analysis) {
            var chartData = [];
            var firstDate = new Date();
            firstDate.setDate(firstDate.getDate() - 5);

            for (var i = 0; i < 1000; i++) {
                // we create date objects here. In your data, you can have date strings
                // and then set format of your dates using chart.dataDateFormat property,
                // however when possible, use date objects, as this will speed up chart rendering.
                var newDate = new Date(firstDate);
                newDate.setDate(newDate.getDate() + i);

                var visits1 = Math.round(Math.random() * (40 + i / 5)) + 20 + i;
                var visits2 = Math.round(Math.random() * (40 + i / 5)) + 20 + i;
 
                chartData.push({
                    date: newDate,
                    visits1: visits1,
                    visits2: visits2
                });
            }
            return chartData;
        }

        var chartData = generateChartData(this.model);
        var chart = AmCharts.makeChart("chartdiv", {
            "type": "serial",
            "theme": "none",
            "pathToImages": "http://www.amcharts.com/lib/3/images/",
            "dataProvider": chartData,
            "valueAxes": [{
                "axisAlpha": 0.2,
                "dashLength": 1,
                "position": "left",
                "axisColor": "#FF6600",
            },
            {
                "axisAlpha": 0.2,
                "dashLength": 1,
                "position": "left",
                "axisColor": "#FCD202",
            }],

            "mouseWheelZoomEnabled":true,
            "graphs": [{
                "id":"g1",
                "balloonText": "[[category]]<br /><b><span style='font-size:14px;'>value: [[value]]</span></b>",
                "bullet": "round",
                "bulletBorderAlpha": 1,
                "bulletColor":"#FFFFFF",
                "hideBulletsCount": 50,
                "title": "red line",
                "valueField": "visits1",
                "useLineColorForBulletBorder":true
            },
            {
                "id":"g2",
                "balloonText": "[[category]]<br /><b><span style='font-size:14px;'>value: [[value]]</span></b>",
                "bullet": "round",
                "bulletBorderAlpha": 1,
                "bulletColor":"#FFFFFF",
                "hideBulletsCount": 50,
                "title": "red line",
                "valueField": "visits2",
                "useLineColorForBulletBorder":true
            }],
            "chartScrollbar": {
                "autoGridCount": true,
                "graph": "g1",
                "scrollbarHeight": 40
            },
            "chartCursor": {
                "cursorPosition": "mouse"
            },
            "categoryField": "date",
            "categoryAxis": {
                "parseDates": true,
                "axisColor": "#DADADA",
                "dashLength": 1,
                "minorGridEnabled": true
            },
            "exportConfig":{
              menuRight: '20px',
              menuBottom: '30px',
              menuItems: [{
              icon: 'http://www.amcharts.com/lib/3/images/export.png',
              format: 'png'   
              }]  
            }
        });
        
        chart.addListener("rendered", zoomChart);
        zoomChart();
    }
});
