const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
    
    texto: {
        type: String,
        required: true,
        trim: true,
        
    },
    tipo_texto: {
        type: String,
        required: true,
        trim: true,
        
    },
    audio: {
        type: String,
        required: true,
        trim: true,
        
    },
    imagen: {
        type: String,
        required: true,
        trim: true,
        
    },
    contieneR: {
        type: Boolean,
        required: true,
        trim: true,
    },
    dificultad:{
        type: String,
        required: true,
        trim: true
    },
    admin: { 
        type: Schema.Types.ObjectId,
        ref: "Persona"
    },
    estudiante: {
        type: Schema.Types.ObjectId,
        ref: "Estudiante"
    }
}, {
    timestamps: true
});

module.exports = model('Recurso', adminSchema);