const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
    

    nombre_actividad:{
        type:String,
        required:true,
        trim:true
    },
    puntaje_actividad: {
        type: Number,
        required: true,
        trim: true
    },
    actividad:[Schema.Types.ObjectId]
    // ,
    // prefil:{
    //     type: Schema.Types.ObjectId,
    //     ref:"Perfil"
    // }
    
}
, {
    timestamps: true
});

module.exports = model('Progreso', adminSchema);