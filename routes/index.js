var express = require('express');
var router = express.Router();
var recurso = require('../controllers/recursos.controller');
var jugadorC = require('../controllers/jugador.controller');
var jugador = new jugadorC();
var usuarioC = require('../controllers/cuenta.controller');
var usuario = new usuarioC();
var multimediaC = require("../controllers/multimedia.controller");
var multimedia = new multimediaC();
var estudianteC = require("../controllers/estudiante.controller");
var estudiante = new estudianteC();
var progresoC = require('../controllers/progreso.controller');
var progreso = new progresoC();


/* GET home page. */

router.get('/', function (req, res, next) {

  if (req.session !== undefined && req.session.datos !== undefined) {
    if (req.session.datos.rol == "Fonologo" || req.session.datos.rol == "Estudiante") {
      res.redirect('/admin');
    }
  } else {
    res.render('index', {
      titulo: 'Sistema del Juego',
      fragment: 'fragmentos/formularios/login',
      rol: undefined,
      admin: undefined,
      msg: { error: req.flash('error'), info: req.flash('info') }
    });
  }

});

//validar sesiones y roles 

function validarSesion(req) {
  return (req.session !== undefined && req.session.datos !== undefined);
}

var authAdmin = function (req, res, next) {
  if (validarSesion(req)) {
    if (req.session.datos.rol != undefined) {
      next();
    } else {
      req.flash('error', 'No esta autorizado a acceder a esta direccion!');
      res.redirect('/');
    }
  } else {
    req.flash('error', 'Debe iniciar sesion primero!');
    res.redirect('/');
  }
};

router.get('/registro_docentes', function (req, res, next) {
  res.render('index', {
    titulo: 'Sistema del Juego',
    fragment: 'fragmentos/formularios/registro',
    rol: undefined,
    admin: undefined,
    msg: { error: req.flash('error'), info: req.flash('info') }
  })
});

router.get('/registro_estudiantes', function(req, res, next){
  res.render('index', {
    titulo:'Sistema del Juego',
    fragment: 'fragmentos/formularios/registro_estudiante',
    rol: undefined,
    admin: undefined,
    msg: { error: req.flash('error'), info: req.flash('info') }
  });
});

router.get('/admin', authAdmin, function (req, res, next) {
  res.render('index', {
    titulo: 'Sistema del Juego',
    fragment: 'fragmentos/principal',
    rol: req.session.datos.rol,
    admin: req.session.datos.persona,
    msg: { error: req.flash('error'), info: req.flash('info') }
  })
});

// ACTIVIDADES JUEGOS

router.get('/recursos/:tipo', authAdmin, multimedia.listar_recursos);
router.get('/recursos/trabalenguas/lista', authAdmin, multimedia.trabalenguas_recurso);
router.post('/recurso',authAdmin, multimedia.guardar_recurso);
router.post('/modificar/recurso', authAdmin, multimedia.modificar_recuso);

router.post('/players', (req, res)=>{
  console.log(req.body)
  res.json({msg:"Recibido"});
});

// Usuarios

router.post('/registrar', usuario.registrar);

router.post('/registro_estudiante', usuario.registro_estudiantes);
router.post('/iniciar_sesion', usuario.iniciar_sesion);
router.get('/cerrar_sesion', usuario.cerrar_sesion);

router.get('/reset_password', usuario.cambio_password_vista);
router.post('/reset_password', usuario.cambio_password);
router.get('/new_password/:id/:token', usuario.nueva_password_vista);
router.post('/new_password/:id/:token', usuario.nueva_password);
router.get('/confirmar/cuenta/:id/:token', usuario.confirmar_cuenta);

router.get('/perfil',authAdmin, usuario.perfil);
router.post('/modificar/perfil', authAdmin, usuario.modificar_perfil);

router.get('/lista_estudiantes', authAdmin, estudiante.listar_estudiantes);

//Jugador
//MicroServicios Jugador
router.post('/microservicios/registrarJugador', jugador.registrarJugador);
router.get('/microservicios/cargarJugador/:user', jugador.buscarProgresoJugador);
router.post('/microservicios/guardarpuntacion', progreso.guardar_puntuacion);

router.use('/microservicios', recurso);


//Progreso del juegador

router.get('/progreso',authAdmin, jugador.listar_jugadores);
router.get('/lista_estudiantes/progreso/:code',authAdmin, jugador.listar_jugadores_docente);
router.get('/progreso_jugador/:id',authAdmin,jugador.listar_progreso_jugador);
router.get('/actividadesrealizadas', jugador.progreso_count);
router.get('/detalle_actividad', jugador.detalleActividad);

//Modificar actividades
router.get('/detalle_recurso', multimedia.buscar_recurso);


router.get('/puntuaciongra',progreso.optener_puntuacion);
router.get('/erroresactividad',jugador.detalleReporteActividad);
router.get('/graficaPuntos',jugador.detalleGraficas);

module.exports = router;
