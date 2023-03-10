const controller = {}
var Recurso = require('../models/recurso.model')
var Persona = require('../models/persona.model')
var Estudiante = require('../models/estudiante.model')
var formidable = require('formidable');
var mv = require('mv');
var extensiones = ["jpg", "png", "jpeg"];
var extension = ["mp3", "flac", "m4a", "wav"];
var maxSize = 20 * 1024 * 1024;
var maxSizes = 40 * 1024 * 1024;
var path = require('path');
var fs = require('fs');
var sharp = require('sharp');
/**
 * @class MultimediaController
 */
class MultimediaController {
     /**
     * @description Método que permite visulizar la ventana HomeProgreso , en la cuál el usuario podrá ver todos sus datos de los jugadores
     * @param {req} req Sirve para presentar los mensajes de error o de información
     * @param {res} res Sirve para redireccionar a la ventana HomeProgreso, y en el caso de que exista un error, redireccione a la ventana principal
     */
    listar_recursos(req, res) {
        Recurso.find({ dificultad: req.params.tipo }, function (error, palabras) {
            res.render('index', {
                titulo: 'Sistema del Juego',
                fragment: 'fragmentos/recursos/lista_recursos',
                rol: req.session.datos.rol,
                palabra: palabras,
                tipo: req.params.tipo,
                admin: req.session.datos.persona,
                msg: { error: req.flash('error'), info: req.flash('info') }
            })
        });
    }
     /**
     * @description Método que permite visulizar la ventana HomeProgreso , la actividad trabalenguas 
     * @param {req} req Sirve para presentar los mensajes de error o de información
     * @param {res} res Sirve para redireccionar a la ventana HomeProgreso, y en el caso de que exista un error, redireccione a la ventana principal
     */
    trabalenguas_recurso(req, res) {
        Recurso.find({ tipo_texto: "trabalenguas" }, function (err, trabalenguas) {
            res.render('index', {
                titulo: 'Sistema del Juego',
                fragment: 'fragmentos/recursos/lista_trabalenguas',
                rol: req.session.datos.rol,
                trabalengua: trabalenguas,
                admin: req.session.datos.persona,
                msg: { error: req.flash('error'), info: req.flash('info') }
            })

        });
    }

    /**
     * @description Método para guardar los datos de un nuevo recursos. En esta tabla se relacionan las tablas de Recurso, estudiante y docente, ya que se guardará información de los tres al mismo tiempo
     * @param {req} req Sirve para obtener los datos todos los datos necesarios para registrar un nuevo Recurso, y para presentar los mensajes de error o de información
     * @param {res} res Sirve para redireccionar a la ventana de inicio de sesión en el caso de que el usuario se registre correctamente, y en el caso de error lo devolverá a la ventana de registro
     */

    async guardar_recurso(req, res) {
        var url;
        var form = new formidable.IncomingForm();
        form.parse(req, async function (err, fields, files) {
            try {
                if (err) {
                    throw new Error('Error al subir archivo' + error);
                }
                var contiene = false;
                var datoBox = fields.sicontiene;
                if (datoBox == 'true') {
                    contiene = true;
                }
                var texto = fields.texto;
                var tipo_texto = fields.tipo;
                var nivel_juego = fields.dificultad;
                if (tipo_texto == "trabalenguas") {
                    url = "trabalenguas/lista";
                } else {
                    url = nivel_juego;
                }
                var audio_extencion = files.audio.originalFilename.split(".").pop().toLowerCase();
                var nombre_audio = tipo_texto + "_" + files.audio.newFilename + '.' + audio_extencion;
                var archivo_extencion = files.archivo.originalFilename.split(".").pop().toLowerCase();
                var nombre_archivo = tipo_texto + "_" + files.archivo.newFilename + '.' + archivo_extencion;
                if (audio_extencion === "") {
                    nombre_audio = "default.mp3";
                    audio_extencion = "mp3";
                }
                if (tipo_texto === "trabalenguas") {
                    nombre_archivo = "default.jpg";
                    archivo_extencion = "jpg";
                }
                if (tipo_texto === "palabra" && archivo_extencion === "") {
                    nombre_archivo = "default.jpg";
                    archivo_extencion = "jpg";
                }

                if (files.audio.size <= maxSizes && files.archivo.size <= maxSize) {
                    if (extension.includes(audio_extencion) && extensiones.includes(archivo_extencion)) {
                        const dirFileImg = path.join(__dirname, `../public/imagenes/${nombre_archivo}`);
                        const dirFileAudio = path.join(__dirname, `../public/audio/${nombre_audio}`);

                        Persona.find({ _id: req.session.datos.id }, function (err, datos) {
                            if (datos.length > 0) {
                                var datosActividad = new Recurso({ audio: nombre_audio, imagen: nombre_archivo, texto: texto, contieneR: contiene, tipo_texto: tipo_texto, dificultad: nivel_juego, admin: datos[0].id, estudiante: null });
                                datosActividad.save(function (err) {
                                    if (!err) {
                                        if (nombre_archivo !== "default.jpg") {
                                            sharp(files.archivo.filepath).resize({ height: 300, width: 300 }).toFile(dirFileImg).then(function (newFileInfo) {
                                                console.log("Imagen rize");

                                            }).catch(function (error) {
                                                console.log("error" + error);
                                            });
                                            mv(files.audio.filepath, dirFileAudio, function (err) {
                                                if (err) { throw err; }

                                                console.log('file moved successfully');
                                            });
                                        }
                                        audio_extencion = "";
                                        nombre_audio = "";
                                        archivo_extencion = "";
                                        nombre_archivo = "";
                                        req.flash('info', 'Se ha registrado correctamente');
                                        res.redirect('/recursos/' + url);
                                    } else {
                                        req.flash('error', 'No se ha podido registrar');
                                        res.redirect('/recursos/' + url);
                                    }
                                })
                            } else {
                                Estudiante.find({ _id: req.session.datos.id }, function (err, datos) {
                                    if (datos.length > 0) {
                                        var datosActividad = new Recurso({ audio: nombre_audio, imagen: nombre_archivo, texto: texto, contieneR: contiene, tipo_texto: tipo_texto, dificultad: nivel_juego, admin: null, estudiante: datos[0].id });
                                        datosActividad.save(function (err) {
                                            if (!err) {
                                                if (nombre_archivo !== "default.jpg") {
                                                    sharp(files.archivo.filepath).resize({ height: 300, width: 300 }).toFile(dirFileImg).then(function (newFileInfo) {
                                                        console.log("Imagen rize");

                                                    }).catch(function (error) {
                                                        console.log("error" + error);
                                                    });
                                                    if (nombre_audio !== "default.mp3") {
                                                        mv(files.audio.filepath, dirFileAudio, function (err) {
                                                            if (err) { throw err; }

                                                            console.log('file moved successfully');
                                                        });
                                                    }
                                                }
                                                req.flash('info', 'Se ha registrado correctamente');
                                                res.redirect('/recursos/' + url);
                                            } else {
                                                req.flash('error', 'No se ha podido registrar');
                                                res.redirect('/recursos/' + url);
                                            }
                                        })
                                    } else {

                                        req.flash('error', 'No se ha registrado el recurso!');
                                        res.redirect('/recursos/' + url);

                                    }
                                });
                            }
                        });

                    } else {
                        req.flash('error', 'Extencion no permitida! Solo archivos de audio MP3. Solo imagenes con formato JPG o JPEG');
                        res.redirect('/recursos/' + url);
                    }
                } else {
                    req.flash('error', 'El tamaño del archivo es demaciado grande');
                    res.redirect('/recursos/' + url);
                }

            } catch (error) {
                req.flash('error', 'Error al intentar guardar el recurso!');
                res.redirect('/recursos/' + url);
            }
        });
    };
    /**
     * @description Método que permite buscar recursos
     * @param {req} req Sirve para presentar los mensajes de error o de información
     * @param {res} res Sirve para redireccionar a la ventana Actividades , y en el caso de que exista un error, redireccione a la ventana principal
     */

    buscar_recurso(req, res) {
        var ids = req.query.id 
            Recurso.find({ _id: ids }, async function (err, params) {
                if (!err) {
                    res.json(params)
                } else {
                    res.json({ msg: "Error al cargar!!", state: [] })
                }
            })
    }

      /**
     * @description Método para modificar los datos de un recurso
     * @param {req} req Sirve para obtener el  id del recurso , y los diferentes campos a modificar
     * @param {res} res Sirve para redireccionar a la ventana Perfil en el caso de que exista algún error, o de que todo se haya completado correctamente
     */

    async modificar_recuso(req, res) {
        var form = new formidable.IncomingForm();
        var url;
        var archivoC = 0;
        var tipoArchivoM;

        try {

            form.parse(req, async function (err, fields, files) {

                url = fields.parametr;

                if (err) {
                    req.flash('error', 'Error al subir los archivo!');
                    res.redirect('/recursos/' + url);
                }
                var contiene = false;
                var datoBox = fields.sicontieneM;
                if (datoBox == 'on' || datoBox == 'true') {
                    contiene = true;
                }

                if (fields.tipoM === "trabalenguas") {
                    url = "trabalenguas/lista";
                }

                var audio_extencion = files.audioM.originalFilename.split(".").pop().toLowerCase();
                var nombre_audio = fields.tipoM + "_" + files.audioM.newFilename + '.' + audio_extencion;

                var archivo_extencion = files.archivoM.originalFilename.split(".").pop().toLowerCase();
                var nombre_archivo = fields.tipoM + "_" + files.archivoM.newFilename + '.' + archivo_extencion;


                //Metodo para eliminar AUDIOS
                if (audio_extencion === "") {
                    console.log("No se modifico el archivo de audio!");
                } else {
                    tipoArchivoM = "audio";
                    archivoC = archivoC + 1;

                    Recurso.findById(fields.idRecurso, function (error, recurso) {
                        if (recurso.audio != "default.mp3") {
                            const dirFileAudio = path.join(__dirname, `../public/audio/${recurso.audio}`);
                            eliminarRecurso(dirFileAudio);
                        }
                    });

                    if (extension.includes(audio_extencion)) {
                        const dirFileAudio = path.join(__dirname, `../public/audio/${nombre_audio}`);
                        mv(files.audioM.filepath, dirFileAudio, function (err) {
                            if (err) {
                                req.flash('error', 'Error al guardar el audio!');
                                res.redirect('/recursos/' + url);
                            } else {
                                console.log('file moved successfully');
                            }
                        });
                    } else {
                        req.flash('error', 'Extencion del archivo de audio no permitida!');
                        res.redirect('/recursos/' + url);
                    }
                }

                //Metodo para eliminar imagenes
                if (archivo_extencion === "") {
                    console.log("No se modifico el archivo de imagen!");
                } else {
                    tipoArchivoM = "imagen";
                    archivoC = archivoC + 1;

                    Recurso.findById(fields.idRecurso, function (error, recurso) {
                        if (recurso.imagen != "default.jpg") {
                            const dirFileImg = path.join(__dirname, `../public/imagenes/${recurso.imagen}`);
                            eliminarRecurso(dirFileImg);
                        }
                    });

                    if (extensiones.includes(archivo_extencion)) {
                        const dirFileImg = path.join(__dirname, `../public/imagenes/${nombre_archivo}`);
                        sharp(files.archivoM.filepath).resize({ height: 300, width: 300 }).toFile(dirFileImg).then(function (newFileInfo) {
                            console.log("Imagen rize");

                        }).catch(function (error) {
                            console.log("error" + error);
                        });

                    } else {
                        req.flash('error', 'Extencion del archivo de imagen no permitida!');
                        res.redirect('/recursos/' + url);
                    }

                }
                if (archivoC == 0) {
                    Recurso.findByIdAndUpdate(fields.idRecurso, {
                        texto: fields.textoM,
                        contieneR: contiene,
                        tipo_texto: fields.tipoM,
                        dificultad: fields.dificultadM,
                    }, (error, recurso) => {
                        if (recurso) {
                            req.flash('info', 'Se ha modificado correctamente el recurso!');
                            res.redirect('/recursos/' + url);
                        } else {
                            req.flash('error', 'No se ha podido modificar el recurso!');
                            res.redirect('/recursos/' + url);
                        }
                    });
                } else if (archivoC == 1 && tipoArchivoM == "imagen") {
                    Recurso.findByIdAndUpdate(fields.idRecurso, {
                        texto: fields.textoM,
                        contieneR: contiene,
                        tipo_texto: fields.tipoM,
                        dificultad: fields.dificultadM,
                        imagen: nombre_archivo,
                    }, (error, recurso) => {
                        if (recurso) {
                            req.flash('info', 'Se ha modificado correctamente el recurso!');
                            res.redirect('/recursos/' + url);
                        } else {
                            req.flash('error', 'No se ha podido modificar el recurso!');
                            res.redirect('/recursos/' + url);
                        }
                    });
                } else if (archivoC == 1 && tipoArchivoM == "audio") {
                    Recurso.findByIdAndUpdate(fields.idRecurso, {
                        texto: fields.textoM,
                        contieneR: contiene,
                        tipo_texto: fields.tipoM,
                        dificultad: fields.dificultadM,
                        audio: nombre_audio,
                    }, (error, recurso) => {
                        if (recurso) {
                            req.flash('info', 'Se ha modificado correctamente el recurso!');
                            res.redirect('/recursos/' + url);
                        } else {
                            req.flash('error', 'No se ha podido modificar el recurso!');
                            res.redirect('/recursos/' + url);
                        }
                    });
                } else if (archivoC == 2) {
                    Recurso.findByIdAndUpdate(fields.idRecurso, {
                        texto: fields.textoM,
                        contieneR: contiene,
                        tipo_texto: fields.tipoM,
                        dificultad: fields.dificultadM,
                        audio: nombre_audio,
                        imagen: nombre_archivo,
                    }, (error, recurso) => {
                        if (recurso) {
                            req.flash('info', 'Se ha modificado correctamente el recurso!');
                            res.redirect('/recursos/' + url);
                        } else {
                            req.flash('error', 'No se ha podido modificar el recurso!');
                            res.redirect('/recursos/' + url);
                        }
                    });
                }

            });
        } catch (error) {
            req.flash('error', 'Error al intentar modificar el recurso!');
            res.redirect('/recursos/' + url);
            console.log(error)
        }
    }
}
/**
 * @description Método para eliminar las fotos de pergil del usaurio
 * @param {req} req Sirve para obtener la direccion de la imágen y eliminarla 
 * @param {res} res Sirve para redireccionar a la ventana Perfil en el caso de que exista algún error, o de que todo se haya completado correctamente
*/
function eliminarRecurso(ruta) {
    fs.unlink(ruta, (error) => {
        if (error) { console.error(error) };
        console.log("Archivo Eliminado");
    })
}

module.exports = MultimediaController;