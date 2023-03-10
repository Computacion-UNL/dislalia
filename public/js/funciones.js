var globalURL = process.env.SERVER_URL;
function cargardatosadivia() {
   var url = globalURL + "actividadesrealizadas/";
   var ids = $("#jugador").val();
   var nombre = 'Adivina la Palabra';
   $.ajax({
      url: url,
      data: 'id=' + ids + '&nombre=' + nombre,
      method: "GET",
      contentType: "application/json",
      success: function (data, textStatus, jqXHR) {

         $("#memoria").html(data);

      },
      error: function (jqXHR, textStatus, errorThrown) {
         console.log(jqXHR.responseText);
      }
   });

}
function cargardatosjuegopalabras() {
   var url = globalURL + "actividadesrealizadas/";
   var ids = $("#jugador").val();
   var nombre = 'Juego de Palabras';
   $.ajax({
      url: url,
      data: 'id=' + ids + '&nombre=' + nombre,
      method: "GET",
      contentType: "application/json",
      success: function (data, textStatus, jqXHR) {

         $("#memori").html(data);

      },
      error: function (jqXHR, textStatus, errorThrown) {
         console.log(jqXHR.responseText);
      }
   });

}

function cargardatosjuegomemoria() {
   var url = globalURL + "actividadesrealizadas/";
   var ids = $("#jugador").val();
   var nombre = ' Juego de Memoria';
   $.ajax({
      url: url,
      data: 'id=' + ids + '&nombre=' + nombre,
      method: "GET",
      contentType: "application/json",
      success: function (data, textStatus, jqXHR) {

         $("#memo").html(data);

      },
      error: function (jqXHR, textStatus, errorThrown) {
         console.log(jqXHR.responseText);
      }
   });

}
function cargardatostrabalenguas() {
   var url = globalURL + "actividadesrealizadas/";
   var ids = $("#jugador").val();
   var nombre = ' Trabalenguas';
   $.ajax({
      url: url,
      data: 'id=' + ids + '&nombre=' + nombre,
      method: "GET",
      contentType: "application/json",
      success: function (data, textStatus, jqXHR) {

         $("#traba").html(data)

      },
      error: function (jqXHR, textStatus, errorThrown) {
         console.log(jqXHR.responseText);
      }
   });

}
function cargardatosjuegoimagenes() {
   var url = globalURL + "actividadesrealizadas/";
   var ids = $("#jugador").val();
   var nombre = 'Juego de Imágenes';
   $.ajax({
      url: url,
      data: 'id=' + ids + '&nombre=' + nombre,
      method: "GET",
      contentType: "application/json",
      success: function (data, textStatus, jqXHR) {

         $("#mem").html(data);

      },
      error: function (jqXHR, textStatus, errorThrown) {
         console.log(jqXHR.responseText);
      }
   });




}


function detalleActividad() {
   var url = globalURL + "detalle_actividad/";
   var ids = $("#jugador").val();
   var nombre = 'Juego de Imágenes';
   $.ajax({
      url: url,
      data: 'id=' + ids + '&nombre=' + nombre,
      method: "GET",
      contentType: "application/json",
      success: function (data, textStatus, jqXHR) {

         $("#mem").html(data)

      },
      error: function (jqXHR, textStatus, errorThrown) {
         console.log(jqXHR.responseText);
      }
   });
}
function buscar(id, error) {
   var url = globalURL + "detalle_actividad/";
   var tiempo;
   $.ajax({

      url: url,
      data: 'id=' + id,
      method: 'GET',
      success: function (data, textStatus, jqXHR) {
         if (data.time == null || data.time == "") {
            tiempo = "N/A";
         } else {
            tiempo = data.time;
         }
         var html = '';

         html += '<tr>';
         html += '<td>' + 1 + '</td>';
         html += '<td>' + data.nivel + '</td>';
         html += '<td>' + tiempo + '</td>';
         html += '<td>' + data.aciertos + '</td>';
         html += '<td>' + data.errores + '</td>';
         html += '</tr>';

         $("#tabla tbody").html(html);
      },
      error: function (jqXHR, textStatus, errorThrown) {
         console.log(jqXHR.responseText);
      }
   });

   buscar_error(error);

}
function buscar_error(id) {

   var url = globalURL + "erroresactividad/";

   $.ajax({

      url: url,
      data: 'id=' + id,
      method: 'GET',
      success: function (data, textStatus, jqXHR) {
         var html = '';
         var tipo ='';
         $.each(data, function (index, item) {
               tipo = item.tipo;
               
            if (item.tipo != 'trabalenguas') {
               html += '<tr>';
               html += '<td>' + ((index * 1) + 1) + '</td>';
               html += '<td>' + item.texto + '</td>';
               html += '<td><div class="media align-items-center"><a href="#" class="avatar rounded-circle"><img src="/imagenes/' + item.imagen + '" alt="Image placeholder"></a></div></td>';
               html += '</tr>';
               
            }else{
               html += '<tr>';
               html += '<td>' + ((index * 1) + 1) + '</td>';
               html += '<td>' + item.texto + '</td>';
               html += '<td>' + item.info + '<br></td>';
               html += '</tr>';
             
            }

         });
         if(tipo != 'trabalenguas'){
            document.getElementById("tabla-error").style.display = "table";
            $("#tabla-error tbody").html(html);
            document.getElementById("tabla-error-trabalenguas").style.display = "none";
            
         }else{
            document.getElementById("tabla-error-trabalenguas").style.display = "block";
            $("#tabla-error-trabalenguas tbody").html(html);
            document.getElementById("tabla-error").style.display = "none";
         }
        
        
      },
      error: function (jqXHR, textStatus, errorThrown) {
         console.log(jqXHR.responseText);
      }
   });
}
function buscardatos(id) {
   $('#audio1').remove();
   $('#add-foto2').remove();
   var url = globalURL + "detalle_recurso/";
   $.ajax({

      url: url,
      data: 'id=' + id,
      method: 'GET',
      success: function (data, textStatus, jqXHR) {
         data.forEach(element => {
            $("#parametr").val(element.dificultad);
            $("#idRecurso").val(element._id);

            document.getElementById('tipoM').value = element.tipo_texto;

            $("#textoM").val(element.texto);
            if (element.contieneR) {
               document.getElementById("sicontieneM").checked = true;
            } else {
               document.getElementById("sicontieneM").checked = false;
            }
            document.getElementById('dificultadM').value = element.dificultad;
            if (element.tipo_texto === "palabra") {
               var img = $('<img id="add-foto2" src="/imagenes/' + element.imagen + '" alt="">');
               $(img).insertBefore("#texto-imagen2");
               img = "";
            } else {
               document.getElementById("sicontieneM").setAttribute("disabled", "");
            }
            if (element.tipo_texto == "palabra" && element.contieneR || element.tipo_texto == "trabalenguas") {
               var audio = $('<audio controls style="width:100%" id="audio1" name="audio1" src="/audio/' + element.audio + '"></audio>')
               $(audio).insertAfter("#audioEspacio");
               adudio = "";
               document.getElementById("audioM").removeAttribute("hidden");
               document.getElementById("titleAudioM").removeAttribute("hidden");
            } else {
               document.getElementById("audioM").setAttribute("hidden", "");
               document.getElementById("titleAudioM").setAttribute("hidden", "");
            }

         });
      },
      error: function (jqXHR, textStatus, errorThrown) {
         console.log(jqXHR.responseText);
      }
   });
}







