var Jugador = require('../models/jugador.model');
var Estudiante = require('../models/estudiante.model');
var Actividad = require('../models/actividad.model');
var NivelJuego = require('../models/nivel_juego.model')
var Puntuacion = require('../models/puntuacion.model')
var Recurso = require('../models/recurso.model');
const PDF = require('pdfkit-construct');
/**
 * @class JugadorController
 */
class JugadorController {
    /**
     * @description Método para guardar los datos de los jugadores. En esta tabla se relacionan las tablas de jugar y estudiantes, ya que se guardará información de los tres al mismo tiempo
     * @param {req} req Sirve para obtener los datos todos los datos necesarios para registrar un nuevo jugador, y para presentar los mensajes de error o de información
     * @param {res} res Sirve para redireccionar a la ventana de inicio de sesión en el caso de que el jugador  se registre correctamente, y en el caso de error lo devolverá a la ventana de registro
     */

   registrarJugador(req, res) {
      try {
         var nombre = req.body.nombre;
         var apellido = req.body.apellido;
         var edad = req.body.edad;
         var codigo = req.body.code;
         var usuario = req.body.usuario;

         Estudiante.find({ codigo_acceso: codigo }, function (err, persona) {
            if (persona.length > 0) {
               Jugador.find({ usuario: usuario }, function (error, player) {
                  if (player.length > 0) {
                     res.json({ msg: "El nombre de usuario ya existe. Por favor ingrese otro.", state: false, type: "Usuario Existente!" })
                  } else {
                     var player = new Jugador({ nombre: nombre, apellido: apellido, edad: edad, codigo_access: codigo, usuario: usuario });
                     player.save(function (error, result) {
                        if (result) {
                           res.json({ msg: "Registro Completado! Ya puedes continuar.", state: true, type: "Registro Exitoso!", idPlayer: result._id })
                        } else {
                           res.json({ msg: "Error al registrar! Intente nuevamente.", state: false, type: "Registro en el registro de datos!!", idPlayer: "" })
                        }
                     });
                  }
               });

            } else {
               res.json({ msg: "El codigo ingresado no es el correcto!", state: false, type: "Código Incorrecto!", idPlayer: "" });
            }
         });

      } catch (err) {
         res.json({ msg: "Error al realizar el guardado del jugador!", state: false, type: "Error en la consulta!!", idPlayer: "" });
      }
   }
    /**
     * @description Método para obtener el progreso de cada jugador
     * @param {req} req Sirve para obtener los datos todos los datos necesarios de cada actividad que realizo el jugador, y para presentar los mensajes de error o de información
     * @param {res} res Sirve para redireccionar un error con status 
     */

   buscarProgresoJugador(req, res) {
      try {
         var user = req.params.user;

         Jugador.find({ usuario: user }, function (error, player) {
            if (player.length == 1) {
               res.json({ msg: "Progreso Cargado Correctamente!", state: true, type: "Cargando Progreso...", idPlayer: player[0]._id })
            } else {
               console.error(error);
               res.json({ msg: "Usuario No Registrado o Usuario Incorrecto!", state: false, type: "Error al cargar el progreso!", idPlayer: "" })
            }
         });

      } catch (error) {
         res.json({ msg: "Error al intentar cargar el progreso!", state: false, type: "Error al cargar el progreso!", idPlayer: "" })
      }
   }
    /**
     * @description Método que permite visulizar la ventana HomeProgreso , en la cuál el usuario podrá ver todos sus datos al momento de registrarse de los estudiantes
     * @param {req} req Sirve para presentar los mensajes de error o de información
     * @param {res} res Sirve para redireccionar a la ventana HomeProgreso, y en el caso de que exista un error, redireccione a la ventana principal
     */

   listar_jugadores(req, res) {
      try {
         Estudiante.find({ _id: req.session.datos.id }, function (erro, persona) {
            Jugador.find({ codigo_access: persona[0].codigo_acceso }, function (err, jugador) {
               res.render('index', {
                  titulo: 'Sistema del Juego',
                  fragment: 'fragmentos/Progresojuego/Homeprogreso',
                  rol: req.session.datos.rol,
                  player: jugador,
                  admin: req.session.datos.persona,
                  msg: { error: req.flash('error'), info: req.flash('info') }
               })
            })

         });
      } catch (error) {
         req.flash('error', 'Hubo un error al intentar cargar la lista de jugadores registrados!');
         res.redirect('/admin');
      }
   }
 /**
     * @description Método que permite visulizar la ventana HomeProgreso , en la cuál el usuario podrá ver todos sus datos al momento de registrarse de los jugadores
     * @param {req} req Sirve para presentar los mensajes de error o de información
     * @param {res} res Sirve para redireccionar a la ventana HomeProgreso, y en el caso de que exista un error, redireccione a la ventana principal
     */
   listar_jugadores_docente(req, res) {
      try {
         Jugador.find({ codigo_access: req.params.code }, function (err, jugador) {
            res.render('index', {
               titulo: 'Sistema del Juego',
               fragment: 'fragmentos/Progresojuego/Homeprogreso',
               rol: req.session.datos.rol,
               player: jugador,
               admin: req.session.datos.persona,
               msg: { error: req.flash('error'), info: req.flash('info') }
            })
         });
      } catch (error) {
         req.flash('error', "Error al cargar los jugadores del estudiante!");
         res.redirect('/admin');
      }
   }
    /**
     * @description Método que permite visulizar la ventana HomeProgreso , en la cuál el usuario podrá ver todos sus datos al momento de registrarse de los jugadores
     * @param {req} req Sirve para presentar los mensajes de error o de información
     * @param {res} res Sirve para redireccionar a la ventana HomeProgreso, y en el caso de que exista un error, redireccione a la ventana principal
     */
   listar_progreso_jugador(req, res) {
      try {

         const token = req.params.id;

         Jugador.findById(token, function (error, player) {
            Actividad.find({ jugador: token }, function (errorA, activity) {

               res.render('index', {
                  titulo: 'Sistema del Juego',
                  fragment: 'fragmentos/Progresojuego/progresoPlayer',
                  actividad: activity,
                  jugador: player,
                  admin: req.session.datos.persona,
                  rol: req.session.datos.rol,
                  msg: { error: req.flash('error'), info: req.flash('info') }
               })
            });
         });

      } catch (error) {
         req.flash('error', 'Hubo un error al intentar observar el progreso del jugador!');
         res.redirect('/progreso');
      }
   }
    /**
     * @description Método que permite contar todas las actividades realizadas por los jugadores
     * @param {req} req Sirve para presentar los mensajes de error o de información
     * @param {res} res Sirve para redireccionar a la ventana HomeProgreso, y en el caso de que exista un error, redireccione a la ventana principal
     */
   progreso_count(req, res) {
      try {
         const id = req.query.id;
         const nombre = req.query.nombre;
         var actividad = Actividad.find({ jugador: id, nombre_actividad: nombre });
         actividad.countDocuments(function (error, count) {
            if (!error) {
               res.json(count);
            } else {
               res.json(error)
            }
         })
      } catch (error) {
         console.log("ERROR AL CONTAR LAS ACTIVIDADES");
      }
   }
    /**
     * @description Método que permite visulizar la ventana ProgresoPlayer , en la cuál el usuario podrá ver todos sus datos de las diferentes actividades realizadas por los jugadores
     * @param {req} req Sirve para presentar los mensajes de error o de información
     * @param {res} res Sirve para redireccionar a la ventana HomeProgreso, y en el caso de que exista un error, redireccione a la ventana principal
     */
   detalleActividad(req, res) {
      try {
         const token = req.query.id;
         NivelJuego.findById(token, function (errorN, nivel) {

            Puntuacion.findById(nivel.puntuacion, function (errorP, puntos) {
               if (!errorP) {
                  res.json({ nivel: nivel.dificultad, time: puntos.tiempo, aciertos: puntos.nro_aciertos, errores: puntos.nro_errores })
               } else {
                  res.json(errorP);
               }
            })
         })
      } catch (error) {
         console.log("ERROR AL PRESENTAR EL DETALLE DE ACTIVIDADES");
      }
   }
    /**
     * @description Método que permite visulizar los resultados de cada actividad por separado
     * @param {req} req Sirve para presentar los mensajes de error o de información
     * @param {res} res Sirve para redireccionar a la ventana HomeProgreso, y en el caso de que exista un error, redireccione a la ventana principal
     */
   detalleReporteActividad(req, res) {
      try {
         const token = req.query.id;
         if (token.trim() != null) {
            Actividad.findById(token, async function (error, params) {
               if (!error) {
                  var data = {};
                  for (var i = 0; i < params.recurso.length; i++) {
                     var recurso = await Recurso.findOne({ _id: params.recurso[i] });
                     if (recurso) {
                        data[i] = {
                           "imagen": recurso.imagen,
                           "texto": recurso.texto,
                           'info': params.info,
                           'tipo': recurso.tipo_texto
                        }
                     }
                  }
                  res.json(data);
               }

            })
         } else {
            res.status(404).json("Detalle de la actividad no encontrado!!");
         }
      } catch (error) {
         res.status(404).json("user not found");
      }

   }
    /**
     * @description Método que permite generar graficas estadisticas de  cada actividad
     * @param {req} req Sirve para presentar los mensajes de error o de información
     * @param {res} res Sirve para redireccionar a la ventana HomeProgreso, y en el caso de que exista un error, redireccione a la ventana principal
     */
   async detalleGraficas(req, res) {
      var token = req.query.texto;
      var id = req.query.id;
      var data = {};
      var actividad = await Actividad.find({ jugador: id, nombre_actividad: token })

      for (let index = 0; index < actividad.length; index++) {
         var nivel = await NivelJuego.findById({ _id: actividad[index].nivel_juego });
         var puntuacion = await Puntuacion.findById({ _id: nivel.puntuacion });
         if (puntuacion) {
            data[index] = {
               'aciertos': puntuacion.nro_aciertos,
               'error': puntuacion.nro_errores
            }
         } else {
            data[index] = {
               'aciertos': [],
               'error': []
            }
         }
      }


      res.json(data);
   }

   

}



module.exports = JugadorController;