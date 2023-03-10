const request = require("supertest");
const app = require("../app");

describe('/ Get Microservicio ', function () {
  it("Responde con json los datos que contiene un solo usuario", function (done) {
    request(app)
      .get("/microservicios/cargarJugador/aredei")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
    setImmediate(done);
  });
  it("Responde con json los datos que contiene un solo usuario no existe", function (done) {
    request(app)
      .get("/microservicios/cargarJugador/nonexistinguser")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404)
      .expect('"user not found"')
      .end((err) => {
        if (err) return done(err);
        done();
      });
    setImmediate(done);
  });

  it("Responde con json los datos de los resultados de la actividad que realizo el niño", function (done) {
    request(app)
      .get("/detalle_recurso")
      .query({ id: '63b5fa9ca3685b2ee0789c88' })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
    setImmediate(done);
  });
  it("Responde con json los datos de los resultados de la actividad que no  realizo el niño ", function (done) {
    request(app)
      .get("/microservicios/cargarJugador/nonexistinguser")
      .query({ id: '' })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404)
      .expect('"Error al cargar!!"')
      .end((err) => {
        if (err) return done(err);
        done();
      });
    setImmediate(done);
  });

  it("Responde con json los datos del reusltado de cada actividad para graficas estadisticas", function (done) {
    request(app)
      .get("/puntuaciongra")
      .query({ id: '63b60e0dcf80935a7c1d5c4b', nombre: "Juego de Imágenes" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);

    setImmediate(done);
  });

  it("Responde con json los datos que no dan reusltado de cada actividad para graficas estadisticas", function (done) {
    request(app)
      .get("/puntuaciongra")
      .query({ id: '', nombre: "" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500)
      .expect('"ERROR AL CONTAR LAS ACTIVIDADES"')
      .end((err) => {
        if (err) return done(err);
        done();
      });
    setImmediate(done);
  });

  it("Responde con json los datos del reusltado de actividad para graficas estadisticas", function (done) {
    request(app)
      .get("/graficaPuntos")
      .query({ id: '63b60e0dcf80935a7c1d5c4b', nombre: "Juego de Imágenes" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);

    setImmediate(done);
  });
  it("Responde con json los datos que no dan reusltado de cada actividad para graficas estadisticas", function (done) {
    request(app)
      .get("/graficaPuntos")
      .query({ id: '', nombre: "" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500)
      .expect('"ERROR AL CONTAR LAS ACTIVIDADES"')
      .end((err) => {
        if (err) return done(err);
        done();
      });
    setImmediate(done);
  });
  it("Responde con json con el reporte de los errores cometedios por niños en actividades",  function (done) {
    request(app)
      .get("/erroresactividad")
      .query({ id: '63d0ae5977d3b20be4bcbba4' })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
    setImmediate(done);
  });
  it("Responde con json los datos que no dan reusltado de reporte de actvidad",  function (done) {
    request(app)
      .get("/erroresactividad")
      .query({ id: '' })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404)
      .expect('"Detalle de la actividad no encontrado!!"')
      .end((err) => {
        if (err) return done(err);
      });
    setImmediate(done);
  });
});

describe("POST  Microservicio ", function () {
  it("respond with 201 created", function (done) {
    const data = {
      nombre: "Marcelo",
      apellido: "Uribe",
      edad: 18,
      codigo: "ES-01",
      usuario: "paquitourbano"
    };
    request(app)
      .post("/microservicios/registrarJugador")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
    setImmediate(done);
  });

  it("respond with 400 on bad request", function (done) {
    const data = {
      // no username and password
    };
    request(app)
      .post("/microservicios/registrarJugador")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .expect('"user not created"')
      .end((err) => {
        if (err) return done(err);
        done();
      });
    setImmediate(done);
  });
});