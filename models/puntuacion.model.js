const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
    
    tiempo: {
        type: String,
        trim: true
    },
       
    nro_aciertos: {
        type: Number,
        required: true,
        trim: true
    },
    coins:{
        type: Number,
        required: true,
        trim: true
    },
       
    nro_errores: {
        type: Number,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = model('Puntuacion', adminSchema);