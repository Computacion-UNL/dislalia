const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
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
    rol: {
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

module.exports = model('Persona', adminSchema);