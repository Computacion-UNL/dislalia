const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
    correo: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }, 
    emailVerified:{
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = model('Cuenta', adminSchema);