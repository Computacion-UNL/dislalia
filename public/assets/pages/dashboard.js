


$(window).resize(function () {
    dashboard();
    //  Resource bar
    $(".resource-barchart").sparkline([5, 6, 2, 4, 9, 1, 2, 8, 3, 6, 4, 2, 1, 5], {
        type: 'bar',
        barWidth: '15px',
        height: '80px',
        barColor: '#fff',
        tooltipClassname: 'abc'
    });
});

function dashboard() {

};

Highcharts.chart('barchart', {

    title: {
        text: 'Graficas Juegos'
    },
    xAxis: {

        categories: ['Adivina la Palabra', 'Juego de Palabras', 'Juego de Memoria', 'Trabalenguas', 'Juego de Imágenes']
    },
    labels: {
        items: [{
            html: 'Total de actividades',
            style: {
                left: '130px',
                top: '18px',
                color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
            }
        }]
    },
    series: [{
        type: 'column',
        name: 'Error',
        data: totalError,
        color: '#f57c00'
    }, {
        type: 'column',
        name: 'Aciertos',
        data: [4, 3, 5, 7, 6],
        color: '#2BBBAD'
    }, {
        type: 'spline',
        name: 'Average',
        data: [3.5, 2.67, 3, 6.33, 3.33],
        marker: {
            lineWidth: 2,
            lineColor: Highcharts.getOptions().colors[3],
            fillColor: 'white'
        }
    }, {
        type: 'pie',
        name: 'Total consumption',
        data: [{
            name: 'Error',
            y: 13,
            color: '#f57c00'
        }, {
            name: 'Aciertos',
            y: 23,
            color: '#2BBBAD'

        }],
        center: [40, 20],
        size: 100,
        showInLegend: false,
        dataLabels: {
            enabled: false
        }
    }]
});


Highcharts.chart('piechart', {
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
        }
        //  backgroundColor:'#fff'
    },
    title: {
        text: 'Pastel de juegos'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }
    },
    series: [{
        type: 'pie',
        name: 'Aciertos de Actividades',
        data: [
            {
                name: 'Adivina la Palabra',
                y: 40.0,
                sliced: true,
                selected: true,
                color: '#2BBBAD'
            },
            {
                name: 'Juego de Palabras',
                y: 26.8,
                color: '#39444e'
            },
            {
                name: 'Juego de Memoria',
                y: 12.8,
                color: '#2196F3'
            },
            {
                name: 'Trabalenguas',
                y: 8.5,
                color: '#3F729B'
            },
            {
                name: 'Juego de Imágenes',
                y: 6.2,
                color: '#f57c00'
            }
        ]
    }]
});
