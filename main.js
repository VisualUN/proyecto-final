var map = L.map('map', { maxZoom: 11 }).setView([4.592164298, -74.072166378], 11);
var myChart = null;
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
    // end charts


}

updateMap(0);