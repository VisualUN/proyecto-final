var map = L.map('map', { maxZoom: 11 }).setView([4.592164298, -74.072166378], 11);
var myChart = null;
var myChart2 = null;
var myRadarChart = null;
//var mes = 0;
const coords = [
    [0, 0],
    [4.6302747, -74.1616385],
    [4.6124945, -74.1427709],
    [4.6593254, -74.0865351],
    [4.704233, -74.03885],
    [4.612909, -74.114037],
    [4.556652, -74.091644],
    [4.572943, -74.129428],
    [4.809480, -74.054409],
    [4.685278, -74.084984],
    [4.625092, -74.067169],
    [4.742957, -74.081278],
    [4.676602, -74.140628]
]


$(document).ready(function() {
    $('#selector').change(function() {
        // $(this).val() will work here
        let month = $(this).val();
        updateMap(month);

    });
});

function updateMap(mes) {
    try {
        map.remove();
    } catch (err) { console.log(err) }

    map = L.map('map', { maxZoom: 11 }).setView([4.592164298, -74.072166378], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    /*
    L.marker([4.592164298, -74.072166378]).addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();
    */

    var heatPoints = [];
    var zone_names = [];
    var contamination_values = [];
    console.log(data[mes])
        //console.log(coords)
    var i = 0;
    Object.keys(data[mes]).forEach(function(key) {
        console.table('Key : ' + key + ', Value : ' + data[mes][key])
        let contaminationvalue = data[mes][key];
        let heatPoint = [coords[i][0], coords[i][1], contaminationvalue * 5]

        //pins
        if (i != 0 && contaminationvalue != 0) {
            L.marker([coords[i][0], coords[i][1]]).addTo(map).bindPopup("En " + key + " el valor promedio partículas pm2.5 es: " + contaminationvalue + ' µg/m³');
            heatPoints.push(heatPoint);
            zone_names.push(key);
            contamination_values.push(contaminationvalue);
            let heat = L.heatLayer([heatPoint], { radius: contaminationvalue, blur: 35, minOpacity: 2, maxZoom: 11 }).addTo(map);
        }
        i = i + 1;
    })

    //Charts
    if (myChart != null) {
        $('#myChart').remove(); // this is my <canvas> element
        $('#chart-container').append('<canvas id="myChart"  style="background: white;height: 18em"></canvas>');
    }
    var ctx = document.getElementById('myChart').getContext('2d');

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: zone_names.slice(1),
            datasets: [{
                label: 'Valor promedio partículas pm2.5 en µg/m³',
                data: contamination_values.slice(1),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',

                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderWidth: 3
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    if (myChart2 != null) {
        $('#myChart2').remove(); // this is my <canvas> element
        $('#chart2-container').append('<canvas id="myChart"  style="background: white;height: 18em"></canvas>');
    }
    var ctx2 = document.getElementById('myChart2').getContext('2d');

    myChart2 = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: zone_names.slice(1),
            datasets: [{
                label: 'Valor promedio partículas pm2.5 en µg/m³',
                data: contamination_values.slice(1),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',

                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderWidth: 3
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    if (myRadarChart != null) {
        $('#myRadarChart').remove(); // this is my <canvas> element
        $('#chart-radar-container').append('<canvas id="myChart"  style="background: white;height: 18em"></canvas>');
    }
    var ctxChart = document.getElementById('myRadarChart').getContext('2d');

    myRadarChart  = new Chart(ctxChart, {
        type: 'radar',
        data: {
            labels: zone_names.slice(1),
            datasets: [{
                label: 'Valor promedio partículas pm2.5 en µg/m³',
                data: contamination_values.slice(1),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',

                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderWidth: 3
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    // end charts


}

am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    var chart = am4core.create("chartdiv", am4charts.XYChart);
    
    chart.data = [
        {
          "Periodo": "2019-01",
          "Total": 203,
          "Moda": 15
        },
        {
          "Periodo": "2019-02",
          "Total": 314,
          "Moda": 25
        },
        {
          "Periodo": "2019-03",
          "Total": 352,
          "Moda": 28
        },
        {
          "Periodo": "2019-04",
          "Total": 251,
          "Moda": 20
        },
        {
          "Periodo": "2019-05",
          "Total": 188,
          "Moda": 13
        },
        {
          "Periodo": "2019-06",
          "Total": 124,
          "Moda": 8
        },
        {
          "Periodo": "2019-07",
          "Total": 137,
          "Moda": 8
        },
        {
          "Periodo": "2019-08",
          "Total": 148,
          "Moda": 10
        },
        {
          "Periodo": "2019-09",
          "Total": 155,
          "Moda": 11
        },
        {
          "Periodo": "2019-10",
          "Total": 161,
          "Moda": 14
        },
        {
          "Periodo": "2019-11",
          "Total": 181,
          "Moda": 14
        },
        {
          "Periodo": "2019-12",
          "Total": 202,
          "Moda": 15
        }
      ];
      
    
    //create category axis for years
    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "Periodo";
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.location = 0;
    
    //create value axis for income and expenses
    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.opposite = true;
    
    
    //create columns
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = "Periodo";
    series.dataFields.valueX = "Total";
    series.name = "Total";
    series.columns.template.fillOpacity = 0.5;
    series.columns.template.strokeOpacity = 0;
    series.tooltipText = "Total en {categoryY}: {valueX.value}";
    
    //create line
    var lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.categoryY = "Periodo";
    lineSeries.dataFields.valueX = "Moda";
    lineSeries.name = "Moda";
    lineSeries.strokeWidth = 3;
    lineSeries.tooltipText = "Moda en {categoryY}: {valueX.value}";
    
    //add bullets
    var circleBullet = lineSeries.bullets.push(new am4charts.CircleBullet());
    circleBullet.circle.fill = am4core.color("#fff");
    circleBullet.circle.strokeWidth = 2;
    
    //add chart cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "zoomY";
    
    //add legend
    chart.legend = new am4charts.Legend();
    
    }); // end am4core.ready()

updateMap(0);