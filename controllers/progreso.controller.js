const controller = {}

var Administrador = require('../models/persona.model');
var Cuenta = require('../models/cuenta.model');
var Actividad = require("../models/actividad.model");
var Puntacion = require("../models/puntuacion.model");
var Juagador = require("../models/jugador.model");
var NivelJuego = require("../models/nivel_juego.model");
var Puntacion = require('../models/puntuacion.model')
var Progreso = require("../models/progreso.model");
const puntuacionModel = require('../models/puntuacion.model');
const { response } = require('express');
const fs = require('fs')
/**
 * @class ProgresoController
 */
class ProgresoController {
    /**
     * @description Método para guardar los datos de puntacion . En esta tabla se relacionan las tablas de Jugador, Actividad, Nivel y Puntuacion , ya que se guardará información de los cuatro al mismo tiempo
     * @param {req} req Sirve para obtener los datos todos los datos necesarios para registrar un nuevo usuario, y para presentar los mensajes de error o de información
     * @param {res} res Sirve para redireccionar a la ventan principal del juego en caso de guardar correctamente, y en el caso de error lo devolverá 
     */

    guardar_puntuacion(req, res) {
        try {
            var time = req.body.tiempo;
            var hits = req.body.aciertos;
            var mistakes = req.body.errores;
            var level = req.body.nivel;
            var activity = req.body.nombreActividad;
            var player = req.body.player;
            var recursos = req.body.recursosID;
            var ids = recursos.split(";")
            ids.pop();
            var infoAdd = req.body.info;
            var info = infoAdd.split(';');
            info.pop();


            console.log(time + " " + hits + " " + mistakes + " " + level + " " + activity)
            console.log(ids)

            var puntuation = new Puntacion({ tiempo: time, nro_aciertos: hits, coins:3, nro_errores: mistakes });
            puntuation.save(function (error, resultPuntuation) {

                if (resultPuntuation) {
                    var nivel = new NivelJuego({ dificultad: level, puntuacion: resultPuntuation._id });
                    nivel.save(function (errorN, resultLevel) {

                        if (resultLevel) {
                            var actividad = new Actividad({ nombre_actividad: activity, recurso: ids, info: info, nivel_juego: resultLevel._id, jugador: player });
                            actividad.save(function (errorA, resultA) {

                                if (resultA) {
                                    res.json({ msg: "Progreso Guardado Correctamente!", state: true })

                                } else {
                                    res.json({ msg: "Error al guardar la actividad!", state: false })
                                }

                            });
                        } else {
                            res.json({ msg: "Error al guardar el nivel de dificultad de la activida!", state: false })
                        }

                    });
                } else {
                    res.json({ msg: "Error al guardar la puntuación de la activida!", state: false })
                }
            });

        } catch (error) {
            res.json({ msg: "Error al guardar el progreso de la activida!", state: false })
        }

    };
    /**
     * @description Método para obtener actividades
     * @param {req} req Sirve para obtener los datos todos las activivades realizas por el jugador, y para presentar los mensajes de error o de información
     * @param {res} res Sirve para redireccionar, y en el caso de error lo devolverá a la ventana de registro
     */

    ver_actividades(req, res) {
        Actividad.find(function (err, datos) {
            var spl = datos[0].recurso[0];
            var str = spl.split(';');
            res.json(str);
        });
    }
    /**
     * @description Método que permite visulizar puntuacion, en la cuál el usuario podrá ver todos los puntuaciones
     * @param {req} req Sirve para presentar los mensajes de error o de información
     * @param {res} res Sirve para redireccionar , y en el caso de que exista un error, redireccione a la ventana principal
     */

    ver_coins(req, res) {
        let array = [];
        var suma = 0;
        var id = req.params.id;
        const acti = Array.from(Actividad.find({ jugador: id }))


        acti.forEach(function (err, doc) {
            const nivel = Array.from(NivelJuego.find({ _id: doc.nivel_juego }))
            nivel.forEach(function (err, ni) {
                const punt = Array.from(APuntacion.find({ _id: ni.puntuacion }))
                punt.forEach(function (err, punt) {
                    array.push(punt.coins)
                });
            });
        });
        array.forEach(function (numero) {
            suma += numero;
        });
        

        res.json(suma)

    }
    /**
     * @description Método que permite datos de la puntiojn optenida por los jugadores
     * @param {req} req Sirve para presentar los mensajes de error o de información
     * @param {res} res Sirve para redireccionar , y en el caso de que exista un error, redireccione a la ventana principal
     */

    optener_puntuacion(req, res) {
        try {
            const id = req.query.id;
            var array = {};
            const nombre = req.query.nombre;
            const nivel = Array.from()
            Actividad.find({ jugador: id, nombre_actividad: nombre }, function (err, actividad) {
                if (!err) {
                    actividad.forEach(felement => {
                        NivelJuego.find({ _id: felement.nivel_juego }, function (err, nivel) {
                            nivel.forEach(element => {
                                Puntacion.find({ _id: element.puntuacion }, function (err, puntuacion) {
                                    puntuacion.forEach((element, index) => {
                                        array[index] = {
                                            aciertos: element.nro_aciertos,
                                            error: element.nro_errores
                                        }
                                    })
                                    
                                    res.json(array);
                                })
                            })
                        })
                    })

                } 
            })

        } catch (error) {
            
        }
    }



}
module.exports = ProgresoController;