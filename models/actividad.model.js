const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
       
    nombre_actividad:{
        type:String,
        required:true,
        trim:true
    },
    recurso: [String],
    info:[String],
    nivel_juego: {
        type: Schema.Types.ObjectId,
        ref: "Nivel_juego"
    },
    jugador:{
        type: Schema.Types.ObjectId,
        ref:"Jugador"
    }
}, {
    timestamps: true
});

module.exports = model('Actividad', adminSchema);