const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
    
    
    dificultad: {
        type: String,
        required: true,
        trim: true,
        
    },
    puntuacion: {
        type: Schema.Types.ObjectId,
        ref: "Puntuacion"
    }
}, {
    timestamps: true
});

module.exports = model('Nivel_juego', adminSchema);