
var totalError = '';

var globalURL = "http://localhost:3000/"
$(document).ready(function () {
    cargardatosadiviagrafica();
    cargardatosjuegoimagenesgrafica();
    cargardatosjuegomemoriagrafica();
    cargardatosjuegopalabragrafica();
    cargardatostrabalenguagrafica();
});

function cargardatosadiviagrafica() {
    var url = globalURL + "graficaPuntos/";
    var ids = $("#jugador").val();
    var texto = 'Adivina la Palabra';
    $.ajax({
        url: url,
        data: 'id=' + ids + '&texto=' + texto,
        method: "GET",
        contentType: "application/json",
        success: function (data, textStatus, jqXHR) {
            var datas = '';
            var aciertos = '';
            var sumae = 0;
            var sumaa = 0;
            $.each(data, function (index, item) {
                sumae += parseInt(item.error);
                sumaa += parseInt(item.aciertos);
            });

            datas += '<option value=' + sumae + '>' + sumae + '</option>';
            aciertos += '<option value=' + sumaa + '>' + sumaa + '</option>';
            $("#Erroradivina").html(datas);
            $("#Aciertosadivina").html(aciertos);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
        }
    });

}
function cargardatosjuegopalabragrafica() {
    var url = globalURL + "graficaPuntos/";
    var ids = $("#jugador").val();
    var texto = 'Juego de Palabras';
    $.ajax({
        url: url,
        data: 'id=' + ids + '&texto=' + texto,
        method: "GET",
        contentType: "application/json",
        success: function (data, textStatus, jqXHR) {
            var datas = '';
            var aciertos = '';
            var sumae = 0;
            var sumaa = 0;
            $.each(data, function (index, item) {
                sumae += parseInt(item.error);
                sumaa += parseInt(item.aciertos);
            });

            datas += '<option value=' + sumae + '>' + sumae + '</option>';
            aciertos += '<option value=' + sumaa + '>' + sumaa + '</option>';
            $("#Errorjuegopalabra").html(datas);
            $("#Aciertosjuegopalabra").html(aciertos);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
        }
    });

}

function cargardatosjuegomemoriagrafica() {
    var url = globalURL + "graficaPuntos/";
    var ids = $("#jugador").val();
    var texto = ' Juego de Memoria';
    $.ajax({
        url: url,
        data: 'id=' + ids + '&texto=' + texto,
        method: "GET",
        contentType: "application/json",
        success: function (data, textStatus, jqXHR) {
            var sumae = 0;
            var sumaa = 0;
            var datas = '';
            var aciertos = '';
            $.each(data, function (index, item) {
                sumae += parseInt(item.error);
                sumaa += parseInt(item.aciertos);
            });

            datas += '<option value=' + sumae + '>' + sumae + '</option>';
            aciertos += '<option value=' + sumaa + '>' + sumaa + '</option>';
            $("#Errorjuegomemoria").html(datas);
            $("#Aciertosjuegomemoria").html(aciertos);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
        }
    });

}
function cargardatostrabalenguagrafica() {

    var url = globalURL + "graficaPuntos/";
    var ids = $("#jugador").val();
    var texto = 'Trabalenguas';
    $.ajax({
        url: url,
        data: 'id=' + ids + '&texto=' + texto,
        method: "GET",
        contentType: "application/json",
        success: function (data, textStatus, jqXHR) {
            var datas = '';
            var aciertos = '';
            var sumae = 0;
            var sumaa = 0;
            $.each(data, function (index, item) {
                sumae += parseInt(item.error);
                sumaa += parseInt(item.aciertos);
            });

            datas += '<option value=' + sumae + '>' + sumae + '</option>';
            aciertos += '<option value=' + sumaa + '>' + sumaa + '</option>';
            $("#Errortrabalen").html(datas);
            $("#Aciertostrabalen").html(aciertos);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
        }
    });

}
function cargardatosjuegoimagenesgrafica() {
    var url = globalURL + "graficaPuntos/";
    var ids = $("#jugador").val();
    var texto = 'Juego de Imágenes';
    $.ajax({
        url: url,
        data: 'id=' + ids + '&texto=' + texto,
        method: "GET",
        contentType: "application/json",
        success: function (data, textStatus, jqXHR) {
            var datas = '';
            var aciertos = '';
            var sumae = 0;
            var sumaa = 0;
            $.each(data, function (index, item) {
                sumae += parseInt(item.error);
                sumaa += parseInt(item.aciertos);
            });

            datas += '<option value=' + sumae + '>' + sumae + '</option>';
            aciertos += '<option value=' + sumaa + '>' + sumaa + '</option>';
            $("#Errorjuegoimagenes").html(datas);
            $("#Aciertosjuegoimagenes").html(aciertos);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
        }
    });

}

const printCharts = () => {

    renderModelsChart();
    renderModelsChartPastel();
    renderModelsChartPastelAciertos();
}

const renderModelsChart = () => {

    let erroradivina = recorrerSelect(document.getElementById("Erroradivina"));
    let errorjuegopalabra = recorrerSelect(document.getElementById("Errorjuegopalabra"));
    let errorjuegomemoria = recorrerSelect(document.getElementById("Errorjuegomemoria"));
    let errortrabalen = recorrerSelect(document.getElementById("Errortrabalen"));
    let errorjuegoimagenes = recorrerSelect(document.getElementById("Errorjuegoimagenes"));
    let aciertosadivina = recorrerSelect(document.getElementById("Aciertosadivina"));
    let aciertosjuegopalabra = recorrerSelect(document.getElementById("Aciertosjuegopalabra"));
    let aciertosjuegomemoria = recorrerSelect(document.getElementById("Aciertosjuegomemoria"));
    let aciertostrabalen = recorrerSelect(document.getElementById("Aciertostrabalen"));
    let aciertosjuegoimagenes = recorrerSelect(document.getElementById("Aciertosjuegoimagenes"));
    const totalError = erroradivina.concat(errorjuegopalabra, errorjuegomemoria, errortrabalen, errorjuegoimagenes,);
    const totoalAciertos = aciertosadivina.concat(aciertosjuegopalabra, aciertosjuegomemoria, aciertostrabalen, aciertosjuegoimagenes);
    const labels = ['Adivina la Palabra', 'Juego de Palabras', 'Juego de Memoria', 'Trabalenguas', 'Juego de Imágenes'];
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Error',
                data: totalError,
                backgroundColor: 'rgba(54, 162, 235, 0.2) ',
                stack: 'Stack 0',
            },
            {
                label: 'Aciertos',
                data: totoalAciertos,
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                stack: 'Stack 0',
            },

        ]
    };
    const config = {
        type: 'bar',
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Barras de estadísticas'
                },
            },
            responsive: true,
            interaction: {
                intersect: false,
            },
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                }
            }
        }
    };
    new Chart('modelsChart', config);
}
const renderModelsChartPastel = () => {

    let erroradivina = recorrerSelect(document.getElementById("Erroradivina"));
    let errorjuegopalabra = recorrerSelect(document.getElementById("Errorjuegopalabra"));
    let errorjuegomemoria = recorrerSelect(document.getElementById("Errorjuegomemoria"));
    let errortrabalen = recorrerSelect(document.getElementById("Errortrabalen"));
    let errorjuegoimagenes = recorrerSelect(document.getElementById("Errorjuegoimagenes"));
    const totalError = erroradivina.concat(errorjuegopalabra, errorjuegomemoria, errortrabalen, errorjuegoimagenes,);
    const labels = ['Adivina la Palabra', 'Juego de Palabras', 'Juego de Memoria', 'Trabalenguas', 'Juego de Imágenes'];
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Errores En el juego',
                data: totalError,
                backgroundColor: getDataColors(50),
            }
        ]
    };
    const config = {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Figura pastel'
                }
            }
        },
    };
    new Chart('modelsChartError', config);
}
const renderModelsChartPastelAciertos = () => {

    let aciertosadivina = recorrerSelect(document.getElementById("Aciertosadivina"));
    let aciertosjuegopalabra = recorrerSelect(document.getElementById("Aciertosjuegopalabra"));
    let aciertosjuegomemoria = recorrerSelect(document.getElementById("Aciertosjuegomemoria"));
    let aciertostrabalen = recorrerSelect(document.getElementById("Aciertostrabalen"));
    let aciertosjuegoimagenes = recorrerSelect(document.getElementById("Aciertosjuegoimagenes"));
    const totoalAciertos = aciertosadivina.concat(aciertosjuegopalabra, aciertosjuegomemoria, aciertostrabalen, aciertosjuegoimagenes)
    const labels = ['Adivina la Palabra', 'Juego de Palabras', 'Juego de Memoria', 'Trabalenguas', 'Juego de Imágenes'];
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Errores En el juego',
                data: totoalAciertos,
                backgroundColor: getDataColors(50),
            }
        ]
    };
    const config = {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Figura Papel'
                }
            }
        },
    };
    new Chart('modelsChartAciertos', config);
}
function recorrerSelect(sel) {
    var array = [sel.length];
    for (var i = 0; i < sel.length; i++) {
        var opt = sel[i];
        array[i] = opt.value;
    }
    return array;
}

const getDataColors = opacity => {
    const colors = ['#7448c2', '#21c0d7', '#d99e2b', '#cd3a81', '#9c99cc']
    return colors.map(color => opacity ? `${color + opacity}` : color)
}


