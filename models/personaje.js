const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
       
    nombre_personaje:{
        type:String,
        required:true,
        trim:true
    },
    jugador:{
        type: Schema.Types.ObjectId,
        ref:"Jugador"
    }
}, {
    timestamps: true
});

module.exports = model('Personaje', adminSchema);