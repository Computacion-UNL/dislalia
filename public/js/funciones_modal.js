$(document).on('change', "#sicontiene", function () {
   if (!document.getElementById("sicontiene").checked) {
      document.getElementById("audio").setAttribute("hidden", "");
      document.getElementById("titleAudio").setAttribute("hidden", "");
   } else {
      document.getElementById("audio").removeAttribute("hidden");
      document.getElementById("titleAudio").removeAttribute("hidden");
   }
});

$(document).on('change', "#sicontieneM", function () {
   if (!document.getElementById("sicontieneM").checked) {
      document.getElementById("audioM").setAttribute("hidden", "");
      document.getElementById("titleAudioM").setAttribute("hidden", "");
   } else {
      document.getElementById("audioM").removeAttribute("hidden");
      document.getElementById("titleAudioM").removeAttribute("hidden");
   }
});

$(document).on('change', "#tipoM", function () {

   $('#tituloM').remove();
   $('#dificultadM').remove();

   if ($('#tipoM').val() == "palabra") {
      var selectW = '<label id="tituloM" for="dificultadM">Posición de la R:</label>' +
         '<select name="dificultadM" id="dificultadM">' +
         '<option value="ninguno">No Incluye R</option>' +
         '<option value="inicial">Posición Inicial</option>' +
         '<option value="media">Posición Media</option>' +
         '<option value="final">Posición Final</option>' +
         '<option value="inversa">Posición Inversa</option>' +
         '<option value="doble">Posición Doble</option>' +
         '<option value="mixto">Posición Mixto</option>' +
         '</select>';

      $(selectW).insertBefore("#dificultadMM");
      
      document.getElementById("sicontieneM").removeAttribute("disabled");


   } else if ($('#tipoM').val() == "trabalenguas") {
      var selectW = '<label id="tituloM" for="dificultadM">Dificultad Trabalenguas:</label>' +
         '<select name="dificultadM" id="dificultadM">' +
         '<option value="baja">Baja</option>' +
         '<option value="media">Media</option>' +
         '<option value="alta">Alta</option>' +
         '</select>';


      $(selectW).insertBefore("#dificultadMM");
      document.getElementById("audioM").removeAttribute("hidden");
      document.getElementById("titleAudioM").removeAttribute("hidden");
      document.getElementById("sicontieneM").setAttribute("disabled", "");
   }
});



$(document).on('change', "#tipo", function () {

   $('#titulo').remove();
   $('#dificultad').remove();

   if ($('#tipo').val() == "palabra") {
      var selectW = '<label id="titulo" for="dificultad">Posición de la R:</label>' +
         '<select name="dificultad" id="dificultad">' +
         '<option value="ninguno">No Incluye R</option>' +
         '<option value="inicial">Posición Inicial</option>' +
         '<option value="media">Posición Media</option>' +
         '<option value="final">Posición Final</option>' +
         '<option value="inversa">Posición Inversa</option>' +
         '<option value="doble">Posición Doble</option>' +
         '<option value="mixto">Posición Mixto</option>' +
         '</select>';

      
      $(selectW).insertBefore("#dificultadT");

      document.getElementById("audio").setAttribute("hidden", "");
      document.getElementById("titleAudio").setAttribute("hidden", "");
      document.getElementById("sicontiene").removeAttribute("disabled");


   } else if ($('#tipo').val() == "trabalenguas") {
      var selectW = '<label id="titulo" for="dificultad">Dificultad Trabalenguas:</label>' +
         '<select name="dificultad" id="dificultad">' +
         '<option value="baja">Baja</option>' +
         '<option value="media">Media</option>' +
         '<option value="alta">Alta</option>' +
         '</select>';

      $(selectW).insertBefore("#dificultadT");
      
      document.getElementById("audio").removeAttribute("hidden");
      document.getElementById("titleAudio").removeAttribute("hidden");
      document.getElementById("sicontiene").setAttribute("disabled", "");
   }
});


//AGREGAR AUDIO E IMAGEN
$(document).on("change", "#archivo", function () {
   $('#add-foto1').remove();
   var files = this.files;
   var element;

   var supportedImages = ["image/jpeg", "image/png", "image/jpg"];
   var elementoNoValido = false;

   console.log(files);

   element = files[0];
   if (supportedImages.indexOf(element.type) != -1) {
      createPreviewR(element);
   } else {
      elementoNoValido = true;
   }

   if (elementoNoValido) {
      alert("Elemento No Valido!");
   }
});
function createPreviewR(file) {
   var imgCodified = URL.createObjectURL(file);
   var img = $('<img id="add-foto1" src="' + imgCodified + '" alt="">');
   $(img).insertBefore("#texto-imagen1");
   img = "";
}

$(document).on('change', '#audio', function () {
   $('#audio2').remove();
   var audio = this.files;
   var element;

   var supportedAudios = ["audio/mpeg"];
   var elementoNoValido = false;

   element = audio[0];

   if (supportedAudios.indexOf(element.type) != -1) {
      escucharAudio1(element);
   } else {
      elementoNoValido = true;
   }

   if (elementoNoValido) {
      alert("Elemento No Valido")
   }
});
function escucharAudio1(file) {
   var audioCodified = URL.createObjectURL(file);
   var audio = $('<audio controls style="width:100%" id="audio2" name="audio2" src="' + audioCodified + '"></audio>')
   $(audio).insertAfter("#audioEspacios")
}

//MODAL PARA MODIFICAR
$(document).on("change", "#archivoM", function () {
   $('#add-foto2').remove();
   var files = this.files;
   var element;

   var supportedImages = ["image/jpeg", "image/png", "image/jpg"];
   var elementoNoValido = false;

   console.log(files);

   element = files[0];
   if (supportedImages.indexOf(element.type) != -1) {
      createPreviewModal(element);
   } else {
      elementoNoValido = true;
   }

   if (elementoNoValido) {
      alert("Elemento No Valido!");
   }

});

function createPreviewModal(file) {
   var imgCodified = URL.createObjectURL(file);
   var img = $('<img id="add-foto2" src="' + imgCodified + '" alt="">');
   $(img).insertBefore("#texto-imagen2");
   img = "";
}

$(document).on('change', '#audioM', function () {
   $('#audio1').remove();
   var audio = this.files;
   var element;

   var supportedAudios = ["audio/mpeg"];
   var elementoNoValido = false;

   element = audio[0];

   if (supportedAudios.indexOf(element.type) != -1) {
      escucharAudio1(element);
   } else {
      elementoNoValido = true;
   }

   if (elementoNoValido) {
      alert("Elemento No Valido")
   }

});

function escucharAudio1(file) {
   var audioCodified = URL.createObjectURL(file);
   var audio = $('<audio controls style="width:100%" id="audio1" name="audio1" src="' + audioCodified + '"></audio>')
   $(audio).insertAfter("#audioEspacio")
}