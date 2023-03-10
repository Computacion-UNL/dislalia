const controller = {}
const { encrypt, compare } = require('../controllers/helper.controller');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const JWT_SEECRET = "holaBUENAStardes123456789{}[].";
var Persona = require('../models/persona.model');
var Cuenta = require('../models/cuenta.model');
var Estudiante = require('../models/estudiante.model');
const formidable = require('formidable');
var path = require('path');
var sharp = require('sharp');
var fs = require('fs');

/**
 * @class cuentaController
 */
class cuentaController {
    /**
     * @description Método para guardar los datos de un nuevo usuario. En esta tabla se relacionan las tablas de Persona  y Docentes, ya que se guardará información
     * @param {req} req Sirve para obtener los datos todos los datos necesarios para registrar un nuevo usuario, y para presentar los mensajes de error o de información   
     * @param {res} res Sirve para presentarle al usuario la ventana de Administración de Usuarios
     * 
     */
    registrar(req, res) {
        try {
            var form = new formidable.IncomingForm();
            form.parse(req, async function (error, fields, files) {
                Cuenta.find({ correo: fields.usuario }, async function (err, result) {
                    if (result.length < 1) {
                        var nombre = fields.nombre;
                        var apellido = fields.apellido;
                        var rol = "Fonologo";

                        var correo = fields.usuario;
                        const password = await encrypt(fields.password);

                        var imagen_extension = files.archivo.originalFilename.split(".").pop().toLowerCase();
                        var foto = rol + "_" + files.archivo.newFilename + '.' + imagen_extension;

                        const dirFileImg = path.join(__dirname, `../public/fotos/${foto}`);
                        sharp(files.archivo.filepath).toFile(dirFileImg).then(function (newFileInfo) {
                            console.log("Imagen rize");
                        }).catch(function (error) {
                            console.log("error" + error);
                        });

                        var cuenta = new Cuenta({ correo, password });
                        cuenta.save(function (err) {
                            if (err) {
                                req.flash('error', 'No se ha podido registrar');
                                res.redirect('/registro_docentes')
                            }
                        });

                        var admin = new Persona({ nombre, apellido, rol, foto, cuenta: cuenta._id });
                        admin.save(function (error) {
                            if (!error) {

                                const secret = JWT_SEECRET + cuenta.password;
                                const token = jwt.sign({ email: cuenta.correo }, secret);

                                const link = `${process.env.SERVER_URL}/confirmar/cuenta/${cuenta._id}/${token}`;

                                var transporter = nodemailer.createTransport({
                                    host: 'smtp.gmail.com',
                                    port: '587',
                                    auth: {
                                        user: 'servidor.juego.serio@gmail.com',
                                        pass: 'ehkkllrzqgjfgadp'
                                    }
                                });

                                var mailOptions = {
                                    from: 'Servidor de Juego Serio <servidor.juego.serio@gmail.com>',
                                    to: cuenta.correo,
                                    subject: 'Activación de Cuenta',
                                    html: `<!doctype html>
                                    <html>
                                    
                                    <head>
                                        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                                    </head>
                                    
                                    <body style="font-family: sans-serif;">
                                        <div style="display: block; margin: auto; max-width: 600px;" class="main">
                                            <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Servidor de Juego Serio</h1>
                                            <p>Te has registrado correctamente al servidor de Juego Serio.</p>
                                            <p>Para validar tu cuenta deber dar click en el enlace a continuación!</p>
                                            <a href="`+ link + `" class="btn">Activar Cuenta</a>
                                        </div>
                                        <style>
                                            .main {
                                                background-color: white;
                                            }
                                    
                                            a:hover {
                                                border-left-width: 1em;
                                                min-height: 2em;
                                            }
                                    
                                            .btn {
                                                font-size: 18px;
                                                font-weight: bold;
                                                background: #1E90FF;
                                                padding: 10px;
                                                text-align: center;
                                                text-decoration: none;
                                                text-transform: uppercase;
                                                color: #fff;
                                                border-radius: 5px;
                                                cursor: pointer;
                                                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                                                -webkit-transition-duration: 0.3s;
                                                transition-duration: 0.3s;
                                                -webkit-transition-property: box-shadow, transform;
                                                transition-property: box-shadow, transform;
                                            }
                                    
                                            .btn:hover {
                                                box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
                                                -webkit-transform: scale(1.1);
                                                transform: scale(1.1);
                                            }
                                        </style>
                                    </body>
                                    
                                    </html>`,
                                }

                                transporter.sendMail(mailOptions, function (error, info) {
                                    if (error || !info) {
                                        req.flash('error', 'Error al intentar enviar el link! Intentelo más tarde!');
                                        res.redirect('/registro_docentes');
                                    }
                                    req.flash('info', 'Se ha enviado un correo de confirmación a su cuenta!');
                                    res.redirect('/');
                                })
                            } else {
                                req.flash('error', 'No se ha podido registrar');
                                res.redirect('/registro_docentes')
                            }
                        });
                    } else {
                        req.flash('error', 'El CORREO ya se encuentra registrado!');
                        res.redirect('/registro_docentes')
                    }
                });
            });


        } catch (error) {
            req.flash('error', 'Error en el registro de docentes!');
            res.redirect('/registro_docentes')
        }
    }
    /**
     * @description Método para guardar los datos de un nuevo usuario. En esta tabla se relacionan las tablas de Estudiante , ya que se guardará información
     * @param {req} req Sirve para obtener los datos todos los datos necesarios para registrar un nuevo usuario, y para presentar los mensajes de error o de información   
     * @param {res} res Sirve para presentarle al usuario la ventana de Administración de Usuarios
     * 
     */
    registro_estudiantes(req, res) {
        try {

            var form = new formidable.IncomingForm();

            form.parse(req, async function (error, fields, files) {
                Estudiante.find({}, function (error, estudiantes) {
                    Cuenta.find({ correo: fields.correo }, async function (error, result) {
                        if (result.length < 1) {
                            var nombre = fields.nombre;
                            var apellido = fields.apellido;
                            var correo = fields.correo;
                            const password = await encrypt(fields.password);
                            var ciclo = fields.ciclo;
                            var paralelo = fields.paralelo;
                            var codigo_acceso = 'ES-' + (estudiantes.length + 1);
                            var rol = 'Estudiante';

                            var imagen_extension = files.archivo.originalFilename.split(".").pop().toLowerCase();
                            var foto = rol + "_" + files.archivo.newFilename + '.' + imagen_extension;

                            const dirFileImg = path.join(__dirname, `../public/fotos/${foto}`);
                            sharp(files.archivo.filepath).toFile(dirFileImg).then(function (newFileInfo) {
                                console.log("Imagen rize");
                            }).catch(function (error) {
                                console.log("error" + error);
                            });

                            var cuenta = new Cuenta({ correo, password });
                            cuenta.save(function (err) {
                                if (err) {
                                    req.flash('error', 'No se ha podido registrar');
                                    res.redirect('/registro_estudiantes')
                                }
                            });

                            var estudiante = new Estudiante({ nombre, apellido, ciclo, paralelo, codigo_acceso, rol, foto, cuenta: cuenta._id });
                            estudiante.save(function (error, result) {
                                if (!error) {

                                    const secret = JWT_SEECRET + cuenta.password;
                                    const token = jwt.sign({ email: cuenta.correo }, secret);

                                    const link = `${process.env.SERVER_URL}/confirmar/cuenta/${cuenta._id}/${token}`;

                                    var transporter = nodemailer.createTransport({
                                        host: 'smtp.gmail.com',
                                        port: '587',
                                        auth: {
                                            user: 'servidor.juego.serio@gmail.com',
                                            pass: 'ehkkllrzqgjfgadp'
                                        }
                                    });

                                    var mailOptions = {
                                        from: 'Servidor de Juego Serio <servidor.juego.serio@gmail.com>',
                                        to: cuenta.correo,
                                        subject: 'Activación de Cuenta',
                                        html: `<!doctype html>
                                        <html>
                                        
                                        <head>
                                            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                                        </head>
                                        
                                        <body style="font-family: sans-serif;">
                                            <div style="display: block; margin: auto; max-width: 600px;" class="main">
                                                <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Servidor de Juego Serio</h1>
                                                <p>Te has registrado correctamente al servidor de Juego Serio.</p>
                                                <p>Para validar tu cuenta deber dar click en el enlace a continuación!</p>
                                                <a href="`+ link + `" class="btn">Activar Cuenta</a>
                                            </div>
                                            <style>
                                                .main {
                                                    background-color: white;
                                                }
                                        
                                                a:hover {
                                                    border-left-width: 1em;
                                                    min-height: 2em;
                                                }
                                        
                                                .btn {
                                                    font-size: 18px;
                                                    font-weight: bold;
                                                    background: #1E90FF;
                                                    padding: 10px;
                                                    text-align: center;
                                                    text-decoration: none;
                                                    text-transform: uppercase;
                                                    color: #fff;
                                                    border-radius: 5px;
                                                    cursor: pointer;
                                                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                                                    -webkit-transition-duration: 0.3s;
                                                    transition-duration: 0.3s;
                                                    -webkit-transition-property: box-shadow, transform;
                                                    transition-property: box-shadow, transform;
                                                }
                                        
                                                .btn:hover {
                                                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
                                                    -webkit-transform: scale(1.1);
                                                    transform: scale(1.1);
                                                }
                                            </style>
                                        </body>
                                        
                                        </html>`,
                                    }

                                    transporter.sendMail(mailOptions, function (error, info) {
                                        if (error || !info) {
                                            req.flash('error', 'Error al intentar enviar el link! Intentelo más tarde!');
                                            res.redirect('/registro_estudiantes');
                                        }
                                    })
                                    req.flash('info', 'Se ha enviado un correo de confirmación a su cuenta!');
                                    res.redirect('/');
                                } else {
                                    req.flash('error', 'Hubo un error al realizar el registro!');
                                    res.redirect('/registro_estudiantes');
                                }
                            });
                        } else {
                            req.flash('error', 'El CORREO ya se encuentra registrado!');
                            res.redirect('/registro_estudiantes');
                        }
                    });
                });
            });

        } catch (error) {
            req.flash('error', 'Hubo un error al cambiar a la vista del registro!');
            res.redirect('/admin');
        }
    }
     /**
     * @description Método para Iniciar sesión
     * @param {req} req Sirve para destruir variable de sesión
     * @param {res} res Sirve para redireccionar a la ventana de inicio de sesión 
     */

    iniciar_sesion(req, res) {
        try {
            Cuenta.find({ correo: req.body.usuario }, async function (err, dato) {

                if (dato.length > 0) {

                    const checkPassword = await compare(req.body.password, dato[0].password);

                    if (dato[0].emailVerified) {
                        if (checkPassword) {
                            Estudiante.find({ cuenta: dato[0]._id }, function (error, estudiante) {
                                if (estudiante.length > 0) {
                                    req.session.datos = {
                                        id: estudiante[0]._id,
                                        persona: estudiante[0].nombre + " " + estudiante[0].apellido,
                                        rol: estudiante[0].rol
                                    }
                                    res.redirect('/admin');
                                } else {
                                    Persona.find({ cuenta: dato[0]._id }, function (error, admin) {
                                        if (admin.length > 0) {
                                            req.session.datos = {
                                                id: admin[0]._id,
                                                persona: admin[0].nombre + " " + admin[0].apellido,
                                                rol: admin[0].rol
                                            }
                                            res.redirect('/admin');
                                        } else {
                                            req.flash('error', 'No se encuentra registrado! o sus credenciales son incorrectas!');
                                            res.redirect('/');
                                        }
                                    });
                                }
                            })
                        } else {
                            req.flash('error', 'No se encuentra registrado! o sus credenciales son incorrectas!');
                            res.redirect('/');
                        }
                    } else {
                        req.flash('error', 'Su correo aún no ha sido VERIFICADO!');
                        res.redirect('/');
                    }

                } else {
                    req.flash('error', 'No se encuentra registrado! o sus credenciales son incorrectas!');
                    res.redirect('/');
                }
            });
        } catch (error) {
            req.flash('error', 'Error al intentar iniciar sesión!');
            res.redirect('/');
        }
    }
     /**
     * @description Método para confirmar correo
     * @param {req} req Sirve para destruir cuenta 
     * @param {res} res Sirve para redireccionar a la ventana de inicio de sesión 
     */

    async confirmar_cuenta(req, res) {
        const { id, token } = req.params;

        try {
            Cuenta.findById(id, function (error, cuenta) {
                if (cuenta.emailVerified) {
                    req.flash('info', 'Su cuenta ya ha sido activada!')
                    res.redirect('/');
                } else {
                    const secret = JWT_SEECRET + cuenta.password;
                    const verify = jwt.verify(token, secret);
                }
            })

            Cuenta.findByIdAndUpdate(id, {
                emailVerified: true
            }, (error, cuenta) => {
                if (cuenta) {
                    req.flash('info', 'Activación de Cuenta realizada correctamente!')
                    res.redirect('/');
                } else {
                    req.flash('error', 'Hubo un error al intentar activar su cuenta!')
                    res.redirect('/');
                }
            })

        } catch (error) {
            req.flash('error', 'Token Inválido!');
            res.redirect('/');
        }
    }
     /**
     * @description Método para cerrar sesión
     * @param {req} req Sirve para destruir variable de sesión
     * @param {res} res Sirve para redireccionar a la ventana de inicio de sesión 
     */

    cerrar_sesion(req, res) {
        req.flash('info', 'Ha salido del sistema!');
        req.session.destroy();
        res.redirect('/');
    }
     /**
     * @description Método para solicitar el cambio de contraseña
     * @param {req} req Sirve para destruir variable de sesión
     * @param {res} res Sirve para redireccionar a la ventana de inicio de sesión 
     */

    cambio_password_vista(req, res) {
        res.render('index', {
            titulo: 'Sistema del Juego',
            fragment: 'fragmentos/formularios/reset_password',
            rol: undefined,
            admin: undefined,
            msg: { error: req.flash('error'), info: req.flash('info') }
        })
    }

     /**
     * @description Método para cambiar contraseña
     * @param {req} req Sirve para crear object cuenta y realizar el camvio de contraseña 
     * @param {res} res Sirve para redireccionar a la ventana de inicio de sesión 
     */

    async cambio_password(req, res) {
        try {
            const correo = req.body.correo;
            Cuenta.findOne({ correo }, async function (error, cuenta) {
                if (error || !cuenta) {
                    req.flash('error', 'Usuario No Registrado!');
                    res.redirect('/reset_password');
                }
                const secret = JWT_SEECRET + cuenta.password;
                const token = jwt.sign({ email: cuenta.correo, id: cuenta._id }, secret, { expiresIn: '5m' });

                const link = `${process.env.SERVER_URL}/new_password/${cuenta._id}/${token}`;

                //Nodemailer
                var transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: '587',
                    auth: {
                        user: 'servidor.juego.serio@gmail.com',
                        pass: 'ehkkllrzqgjfgadp'
                    }
                });

                var mailOptions = {
                    from: 'Servidor de Juego Serio <servidor.juego.serio@gmail.com>',
                    to: cuenta.correo,
                    subject: 'Cambio de contraseña',
                    html: `<!doctype html>
                    <html>
                    
                    <head>
                        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                    </head>
                    
                    <body style="font-family: sans-serif;">
                        <div style="display: block; margin: auto; max-width: 600px;" class="main">
                            <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Servidor de Juego Serio</h1>
                            <p>Para realizar el cambio de contraseña da click en el siguiente enlace!</p>
                            <a href="`+ link+ `" class="btn">Cambiar Contraseña</a>
                        </div>
                        <style>
                            .main {
                                background-color: white;
                            }
                    
                            a:hover {
                                border-left-width: 1em;
                                min-height: 2em;
                            }
                    
                            .btn {
                                font-size: 18px;
                                font-weight: bold;
                                background: #1E90FF;
                                padding: 10px;
                                text-align: center;
                                text-decoration: none;
                                text-transform: uppercase;
                                color: #fff;
                                border-radius: 5px;
                                cursor: pointer;
                                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                                -webkit-transition-duration: 0.3s;
                                transition-duration: 0.3s;
                                -webkit-transition-property: box-shadow, transform;
                                transition-property: box-shadow, transform;
                            }
                    
                            .btn:hover {
                                box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
                                -webkit-transform: scale(1.1);
                                transform: scale(1.1);
                            }
                        </style>
                    </body>
                    
                    </html>`,
                    text: 'Por favor, de click en el siguiente link para poder cambiar su contraseña:\n' + link
                }

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error || !info) {
                        req.flash('error', 'Error al intentar enviar el link! Intentelo más tarde!');
                        res.redirect('/reset_password');
                    }
                    req.flash('info', 'El Link para el reseteo de contraseña ha sido enviado a su correo!');
                    res.redirect('/reset_password');
                })
            })
        } catch (error) {
            req.flash('error', 'Error al intentar enviar el link! Intentelo más tarde!');
            res.redirect('/reset_password');
        }
    }
     /**
     * @description Método para ingresar a vista de  nuvea contraseña
     * @param {req} req Sirve para destruir crear variable cuenta y verificar si existe el usario 
     * @param {res} res Sirve para redireccionar a la ventana de inicio de sesión 
     */

    async nueva_password_vista(req, res) {

        const { id, token } = req.params;

        Cuenta.findById(id, async function (error, cuenta) {
            if (!cuenta || error) {
                req.flash('error', 'Usuario No Registrado!');
                res.redirect('/reset_password');
            }
            const secret = JWT_SEECRET + cuenta.password;
            try {
                const verify = jwt.verify(token, secret);
                res.render('index', {
                    titulo: 'Sistema del Juego',
                    fragment: 'fragmentos/formularios/new_password',
                    rol: undefined,
                    admin: undefined,
                    email: verify.email,
                    msg: { error: req.flash('error'), info: req.flash('info') }
                })
            } catch (error) {
                req.flash('error', 'El Link para el reseteo de contraseña a expirado! Intente Nuevamente!')
                res.redirect('/reset_password');
            }
        })
    }
     /**
     * @description Método para cambiar ccontraseña
     * @param {req} req Permite realizar el cambio de ccontraseña de la cuenta dl usuario
     * @param {res} res Sirve para redireccionar a la ventana de inicio de sesión 
     */

    async nueva_password(req, res) {
        const { id, token } = req.params;
        Cuenta.findById(id, async function (error, cuenta) {
            if (!cuenta || error) {
                req.flash('error', 'Usuario No Registrado!');
                res.redirect('/reset_password');
            }
            const secret = JWT_SEECRET + cuenta.password;
            try {
                const verify = jwt.verify(token, secret);
                const encryptedpassword = await encrypt(req.body.password);
                await Cuenta.findByIdAndUpdate(id, {
                    password: encryptedpassword,
                }, (error, dato) => {
                    if (error || !dato) {
                        req.flash('error', 'Hubo un error al intentar guardar la contraseña! Intente Nuevamente!')
                        res.redirect('/reset_password');
                    }
                    req.flash('info', 'Se ha modificado la contraseña correctamente!');
                    res.redirect('/');
                })
            } catch (error) {
                req.flash('error', 'Hubo un error al intentar guardar la contraseña! Intente Nuevamente!')
                res.redirect('/reset_password');
            }
        })
    }
     /**
     * @description Pemite visualizar la ventana Perfil, de cada usuario para revisar sus datos
     * @param {req} req Permite saber la informacion de cada usuario, obtener el rol del usuario y su id, y presentar los mensajes de información o error
     * @param {res} res Permite redireccionar la respectiva ventana, en el caso de que se haya iniciado sesión
     */

    perfil(req, res) {
        try {
            Persona.find({ _id: req.session.datos.id }, function (error, persona) {
                if (persona.length > 0) {
                    Cuenta.find({ _id: persona[0].cuenta }, function (error, dato) {
                        res.render('index', {
                            titulo: 'Sistema del Juego',
                            fragment: 'fragmentos/Perfil/perfil',
                            rol: req.session.datos.rol,
                            admin: req.session.datos.persona,
                            persona: persona,
                            cuenta: dato,
                            msg: { error: req.flash('error'), info: req.flash('info') }
                        });
                    });
                } else {
                    Estudiante.find({ _id: req.session.datos.id }, function (error, estudiante) {
                        Cuenta.find({ _id: estudiante[0].cuenta }, function (error, dato) {
                            res.render('index', {
                                titulo: 'Sistema del Juego',
                                fragment: 'fragmentos/Perfil/perfil',
                                rol: req.session.datos.rol,
                                admin: req.session.datos.persona,
                                persona: estudiante,
                                cuenta: dato,
                                msg: { error: req.flash('error'), info: req.flash('info') }
                            });
                        });
                    });
                }
            });
        } catch (error) {
            res.redirect('/admin');
        }
    }
    /**
     * @description Método para modificar los datos personales del usuario
     * @param {req} req Sirve para obtener el  id de la persona, y modificar los distintos datos del usuario
     * @param {res} res Sirve para redireccionar a la ventana Perfil en el caso de que exista algún error, o de que todo se haya completado correctamente
     */

    async modificar_perfil(req, res) {
        try {
            var form = new formidable.IncomingForm();
            var cont = 0;
            form.parse(req, async function (error, fields, files) {
                if (fields.tiporol == "Estudiante") {

                    Estudiante.findById(fields.idPerfil, function (error, estudiante) {
                        if (error || !estudiante) {
                            req.flash('error', 'Error al modificar la información!');
                            res.redirect('/perfil');
                        }
                        var imagen_extension = files.archivo.originalFilename.split(".").pop().toLowerCase();
                        var img = fields.tiporol + "_" + files.archivo.newFilename + '.' + imagen_extension;
                        if (imagen_extension !== "") {
                            cont = cont + 1;
                            const dirFileImg = path.join(__dirname, `../public/fotos/${estudiante.foto}`);
                            eliminarFoto(dirFileImg);
                            const newphoto = path.join(__dirname, `../public/fotos/${img}`);
                            sharp(files.archivo.filepath).toFile(newphoto).then(function (newFileInfo) {
                                console.log("Imagen rize");

                            }).catch(function (error) {
                                console.log("error" + error);
                            });
                        }
                        if (cont == 0) {
                            Estudiante.findByIdAndUpdate(fields.idPerfil, {
                                nombre: fields.nombre,
                                apellido: fields.apellido,
                                ciclo: fields.ciclo,
                                paralelo: fields.paralelo
                            }, (error, recurso) => {
                                if (recurso) {
                                    Cuenta.findByIdAndUpdate(recurso.cuenta, {
                                        cuenta: fields.correo
                                    }, (error, cuenta) => {
                                        if (cuenta) {
                                            req.flash('info', 'Se ha modificado correctamente la información del estudiante!');
                                            res.redirect('/perfil');
                                        } else {
                                            req.flash('error', 'No se ha podido modificar la información!');
                                            res.redirect('/perfil');
                                        }
                                    })
                                } else {
                                    req.flash('error', 'No se ha podido modificar la información!');
                                    res.redirect('/perfil');
                                }
                            });
                        } else if (cont == 1) {
                            Estudiante.findByIdAndUpdate(fields.idPerfil, {
                                nombre: fields.nombre,
                                apellido: fields.apellido,
                                ciclo: fields.ciclo,
                                paralelo: fields.paralelo,
                                foto: img,
                            }, { new: true }, (error, recurso) => {
                                if (recurso) {
                                    Cuenta.findByIdAndUpdate(recurso.cuenta, {
                                        cuenta: fields.correo
                                    }, (error, cuenta) => {
                                        if (cuenta) {
                                            req.flash('info', 'Se ha modificado correctamente la información del estudiante!');
                                            res.redirect('/perfil');
                                        } else {
                                            req.flash('error', 'No se ha podido modificar la información!');
                                            res.redirect('/perfil');
                                        }
                                    })

                                } else {
                                    req.flash('error', 'No se ha podido modificar la información!');
                                    res.redirect('/perfil');
                                }
                            });
                        }

                    });


                } else {
                    Persona.findById(fields.idPerfil, function (error, admin) {
                        if (error || !admin) {
                            req.flash('error', 'Error al modificar la información!');
                            res.redirect('/perfil');
                        }
                        var imagen_extension = files.archivo.originalFilename.split(".").pop().toLowerCase();
                        var img = fields.tiporol + "_" + files.archivo.newFilename + '.' + imagen_extension;
                        if (imagen_extension !== "") {
                            cont = cont + 1;
                            const dirFileImg = path.join(__dirname, `../public/fotos/${admin.foto}`);
                            eliminarFoto(dirFileImg);
                            const newphoto = path.join(__dirname, `../public/fotos/${img}`);
                            sharp(files.archivo.filepath).toFile(newphoto).then(function (newFileInfo) {
                                console.log("Imagen rize");

                            }).catch(function (error) {
                                console.log("error" + error);
                            });
                        }

                        if (cont == 0) {
                            Persona.findByIdAndUpdate(fields.idPerfil, {
                                nombre: fields.nombre,
                                apellido: fields.apellido,
                            }, (error, recurso) => {
                                if (recurso) {
                                    Cuenta.findByIdAndUpdate(recurso.cuenta, {
                                        cuenta: fields.correo
                                    }, (error, cuenta) => {
                                        if (cuenta) {
                                            req.flash('info', 'Se ha modificado correctamente la información del estudiante!');
                                            res.redirect('/perfil');
                                        } else {
                                            req.flash('error', 'No se ha podido modificar la información!');
                                            res.redirect('/perfil');
                                        }
                                    })
                                } else {
                                    req.flash('error', 'No se ha podido modificar la información!');
                                    res.redirect('/perfil');
                                }
                            });
                        } else if (cont == 1) {
                            Persona.findByIdAndUpdate(fields.idPerfil, {
                                nombre: fields.nombre,
                                apellido: fields.apellido,
                                foto: img,
                            }, (error, recurso) => {
                                if (recurso) {
                                    Cuenta.findByIdAndUpdate(recurso.cuenta, {
                                        cuenta: fields.correo
                                    }, (error, cuenta) => {
                                        if (cuenta) {
                                            req.flash('info', 'Se ha modificado correctamente la información del estudiante!');
                                            res.redirect('/perfil');
                                        } else {
                                            req.flash('error', 'No se ha podido modificar la información!');
                                            res.redirect('/perfil');
                                        }
                                    })
                                } else {
                                    req.flash('error', 'No se ha podido modificar la información!');
                                    res.redirect('/perfil');
                                }
                            });
                        }

                    });
                }

            });
        } catch (error) {
            req.flash('error', 'Error al intentar modificar el perfil del usuario!');
            res.redirect('/perfil');
        }
    }
}
/**
 * @description Método para eliminar las fotos de pergil del usaurio
 * @param {req} req Sirve para obtener la direccion de la imágen y eliminarla 
 * @param {res} res Sirve para redireccionar a la ventana Perfil en el caso de que exista algún error, o de que todo se haya completado correctamente
*/
function eliminarFoto(ruta) {
    fs.unlink(ruta, (error) => {
        if (error) { console.error(error) };
        console.log("Archivo Eliminado");
    })
}
module.exports = cuentaController;