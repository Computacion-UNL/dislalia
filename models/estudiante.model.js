const { Schema, model } = require('mongoose');

const estudianteSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    ciclo:{
        type: String,
        required: true,
        trim: true
    },
    paralelo: {
        type: String,
        required: true,
        trim: true
    },
    codigo_acceso:{
        type:String,
        required: true,
        trim:true
    },
    rol:{
        type: String,
        required: true,
        trim: true
    },
    foto:{
        type: String,
        require: true,
        trim: true
    },
    cuenta: {
        type: Schema.Types.ObjectId,
        ref: "Cuenta"
    }
}, {
    timestamps: true
});

module.exports = model('Estudiante', estudianteSchema);