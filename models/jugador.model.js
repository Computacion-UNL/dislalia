const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    edad: {
        type: Number,
        required: true,
        trim: true
    },  
    codigo_access:{
        type:String,
        required: true,
        trim:true
    },
    usuario:{
        type:String,
        required:true,
        trim:true
    }
}
, {
    timestamps: true
});

module.exports = model('Jugador', adminSchema);