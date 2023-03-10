const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    estado: {
        type: number,
        required: true,
        trim: true
    },
    num_puntaje: {
        type: Number,
        required: true,
        trim: true
    },
    actividad: {
        type: Schema.Types.ObjectId,
        ref: "Actividad"
    }
    
}
, {
    timestamps: true
});

module.exports = model('Fase', adminSchema);