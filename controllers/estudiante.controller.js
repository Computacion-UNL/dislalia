var Estudiante = require('../models/estudiante.model');

/**
 * @class EstudianteController
 */
class EstudianteController {
    /**
     * @description Método para obtener todos los estudiantes registrados
     * @param {req} req Sirve para obtener a todos los estudiantes, y también presentar la información o error
     * @param {res} res Sirve para redireccionar a la ventana listar_Estudiatnes  en el caso de que exista algún error, o de que todo se haya completado correctamente
     */
    listar_estudiantes(req, res) {
        Estudiante.find(function (error, estudiante) {
            try {
                res.render('index', {
                    titulo: 'Sistema de Juego',
                    fragment: 'fragmentos/estudiantes/lista_estudiantes',
                    estudiantes: estudiante,
                    rol: req.session.datos.rol,
                    admin: req.session.datos.persona,
                    msg: { error: req.flash('error'), info: req.flash('info') }
                });
            } catch (error) {
                req.flash('error', 'Error al presentar la lista de estudiantes!');
                res.redirect('/admin');
            }
        });
    }
 



}

module.exports = EstudianteController;