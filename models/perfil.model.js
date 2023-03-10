const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
    progreso: {
        type: Schema.Types.ObjectId,
        ref: "Progreso"
    },
    jugador: {
        type: Schema.Types.ObjectId,
        ref: "Jugador"
    }
}, {
    timestamps: true
});

module.exports = model('Perfil', adminSchema);