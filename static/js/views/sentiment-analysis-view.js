
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
        function generateChartData(thread) {
            var chartData = [];
            console.log('thread', thread);
            _.each(thread.comments, function(comment) {
                var person1 = thread.members[0].name;
                var person2 = thread.members[1].name;

                var chart_item = {
                    date: new Date(comment.created_time),
                };
                var sentiment_field = '';
                if (comment.from.name == person1) {
                    sentiment_field = 'sentiment1';
                } else {
                    sentiment_field = 'sentiment2';
                }
                chart_item[sentiment_field] = comment.sentiment.score;
                chartData.push(chart_item);
            });
            console.log('chart data', chartData);
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
                "valueField": "sentiment1",
                "useLineColorForBulletBorder":true,
                "type": "smoothedLine"
            },
            {
                "id":"g2",
                "balloonText": "[[category]]<br /><b><span style='font-size:14px;'>value: [[value]]</span></b>",
                "bullet": "round",
                "bulletBorderAlpha": 1,
                "bulletColor":"#FFFFFF",
                "hideBulletsCount": 50,
                "title": "red line",
                "valueField": "sentiment2",
                "useLineColorForBulletBorder":true,
                "type": "smoothedLine"
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
                "minorGridEnabled": true,
                "minPeriod": "mm"
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
