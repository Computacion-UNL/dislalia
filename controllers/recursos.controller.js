var express = require('express');
var router = express.Router();

var Recurso = require('../models/recurso.model')
/**
* @description Método que permite enviar actividades Juego Palabras 
* @param {req} req Sirve para presentar los mensajes de error o de información
* @param {res} res Sirve para redireccionar , y en el caso de que exista un error, redireccione a la ventana principal
*/
router.route('/palabras/:lvl').get((req, res) => {

    let img, audi;
    var listoR = false;
    var posicion;
    var contador = 0, intcont = 0;
    let words = [];
    var idR;
    var palabra = [];

    Recurso.find({ tipo_texto: "palabra" }, function (err, datos) {
        try {
            while (contador < 10) {
                while (intcont < 4) {
                    var rnd = Math.floor(Math.random() * datos.length);
                    
                    if (datos[rnd].contieneR == true && datos[rnd].dificultad == req.params.lvl && !listoR) {
                        palabra[intcont] = datos[rnd].texto;
                        img = datos[rnd].imagen;
                        audi = datos[rnd].audio;
                        posicion = intcont + 1;
                        idR = datos[rnd]._id;
                        listoR = true;
                        intcont++;
                    } else if (datos[rnd].contieneR == false && !datos[rnd].imagen.includes("default")) {
                        if (palabra.includes(datos[rnd].texto) == false) {
                            palabra[intcont] = datos[rnd].texto;
                            intcont++;
                        }
                    }
                }
                if (listoR) {
                    words[contador] = { palabra, posicion, img, audi, idR };
                    palabra = [];
                    intcont = 0;
                    listoR = false;
                    contador++;
                } else {
                    palabra = [];
                    idR = '';
                    intcont = 0;
                }
            }
            res.json(words);
        } catch (error) {
            res.json({msg:'Error al cargar recursos!'})
        }
    });
});

//Actividad Juego Palabras Imagenes
/**
* @description Método que permite enviar actividades Juego Palabras Imagenes
* @param {req} req Sirve para presentar los mensajes de error o de información
* @param {res} res Sirve para redireccionar , y en el caso de que exista un error, redireccione a la ventana principal
*/
router.route('/imagenes/:lvl').get((req, res) => {

    let img = [];
    let imagen = [];
    var audio;
    var listoR = false;
    var posicion;
    var palabra;
    var idR;
    var contador = 0, intcont = 0;

    Recurso.find({ tipo_texto: "palabra" }, function (err, datos) {
        try {
            while (contador < 10) {
                while (intcont < 4) {

                    var rnd = Math.floor(Math.random() * datos.length);
                    // if(datos[rnd].imagen.includes("default")) return;
                    if (datos[rnd].contieneR == true && datos[rnd].dificultad == req.params.lvl && !listoR) {
                        img[intcont] = datos[rnd].imagen;
                        audio = datos[rnd].audio;
                        posicion = intcont + 1;
                        palabra = datos[rnd].texto;
                        idR = datos[rnd]._id;
                        listoR = true;
                        intcont++;
                    } else if (datos[rnd].contieneR == false) {
                        if (img.includes(datos[rnd].imagen) == false) {
                            img[intcont] = datos[rnd].imagen;
                            intcont++;
                        }
                    }
                }
                if (listoR) {
                    imagen[contador] = { img, posicion, palabra, audio, idR };
                    img = [];
                    palabra = "";
                    intcont = 0;
                    audio = "";
                    idR = "";
                    listoR = false;
                    contador++;
                } else {
                    img = [];
                    palabra = "";
                    intcont = 0;
                    idR = "";                    
                    audio = "";
                }
            }
            res.json(imagen);

        } catch (error) {
            res.json({msg:'Error al cargar recursos!'})
        }
    });
});

//Juego de Adivinar
/**
* @description Método que permite enviar actividades Juego de Adivinar
* @param {req} req Sirve para presentar los mensajes de error o de información
* @param {res} res Sirve para redireccionar , y en el caso de que exista un error, redireccione a la ventana principal
*/
router.route('/pares/:lvl/:cantidad').get((req, res)=>{
    
    var token = req.params.cantidad;
    let recurso = [];
    let imagenes = [];
    var contador = 0;
    var idR;

    Recurso.find({ tipo_texto: "palabra", dificultad: req.params.lvl}, function (err, datos) {

        try {
            while (contador < token) {
                var rnd = Math.floor(Math.random() * datos.length);
                var nombre, img;
                if(recurso.includes(datos[rnd].texto) == false && !datos[rnd].imagen.includes("default")){
                    recurso[contador] = datos[rnd].texto;
                    nombre = datos[rnd].texto;
                    img = datos[rnd].imagen;
                    idR = datos[rnd]._id;
                    imagenes[contador] = {image:img, nombre:nombre, idR};
                    contador++;
                }
            }
            res.json(imagenes);
        } catch (error) {
            console.log(error);
        }
    });
});

//Actividad Completar la palabra
/**
* @description Método que permite enviar actividades contemplar la palabra
* @param {req} req Sirve para presentar los mensajes de error o de información
* @param {res} res Sirve para redireccionar , y en el caso de que exista un error, redireccione a la ventana principal
*/
router.route('/adivinar/:lvl').get((req, res)=>{
    var token = req.params.cantidad;
    let numer = [];
    let imagenes = [];
    var contador = 0;
    var idR;
    Recurso.find({ tipo_texto: "palabra"}, function (err, datos) {

        try {
            while (contador < 10) {
                var rnd = Math.floor(Math.random() * datos.length);
                var nombre, img, sonido;
                if(!numer.includes(datos[rnd].texto) && datos[rnd].contieneR && datos[rnd].dificultad == req.params.lvl ){
                    numer[contador] = nombre;
                    nombre = datos[rnd].texto;
                    img = datos[rnd].imagen;
                    sonido = datos[rnd].audio;
                    idR = datos[rnd]._id;
                    imagenes[contador] = {image:img, nombre:nombre, audio:sonido, idR};
                    contador++;
                }
            }
            res.json(imagenes);
        } catch (error) {
            console.log(error);
        }
    });
});

/**
* @description Método que permite enviar actividades de trabalenguas a través un microservicio 
* @param {req} req Sirve para presentar los mensajes de error o de información
* @param {res} res Sirve para redireccionar a la ventana Perfil, y en el caso de que exista un error, redireccione a la ventana principal
*/
router.route('/trabalenguas/:lvl').get((req, res)=> {
    let trabalenguas = [];
    let trabaReady = [];
    var contador = 0;
    Recurso.find({tipo_texto:"trabalenguas", dificultad:req.params.lvl}, function(err, datos){
        try {
            if(datos){
                while (contador<10) {
                    var rnd = Math.floor(Math.random() * datos.length);
                    var nombre = datos[rnd].texto;
                    var audio =  datos[rnd].audio;
                    var id = datos[rnd]._id;
    
                    if(trabaReady.includes(id) == false){
                        trabaReady[contador] = id;
                        trabalenguas[contador] = {nombre, audio, id};
                        contador++;
                    }
                }
            }

            res.json(trabalenguas);

        } catch (error) {
            console.log(error);
        }

    });
});

module.exports = router;
