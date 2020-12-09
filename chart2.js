var options = {
    series: [{
            name: 'Kennedy',
            data: [25, 35, 37, 28, 23, 16]
        }, {
            name: 'Carvajal',
            data: [29, 49, 52, 38, 34, 30]
        },
        {
            name: 'CdAR',
            data: [17, 29, 32, 24, 13, 7]
        },
        {
            name: 'Usaquen',
            data: [15, 20, 23, 22, 20, 15]
        },
        {
            name: 'Puente Aranda',
            data: [18, 25, 27, 20, 18, 12]
        },
        {
            name: 'San Cristobal',
            data: [13, 16, 18, 14, 9, 15]
        }
    ],
    chart: {
        height: 350,
        type: 'area'
    },
    dataLabels: {
        enabled: true,

    },
    stroke: {
        curve: 'smooth'
    },
    xaxis: {
        type: 'string',
        categories: ["2019-01", "2019-02", "2019-03", "2019-04", "2019-05", "2019-06"]
    },
    tooltip: {
        enabled: false,
        x: {
            format: 'dd/MM/yy HH:mm'
        },
    },
};

var chart = new ApexCharts(document.querySelector("#chartJoh"), options);
chart.render();