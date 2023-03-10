
const bcrypt = require('bcryptjs');
/**
 * @description Metodo para encriptar 
 * @param {*} textPlain 
 * @returns 
 */
const encrypt = async (textPlain) => {
    const hash = await bcrypt.hash(textPlain, 10);
    return hash;
}
/**
 * @description Metodo para desencriptar contraseñas 
 * @param {*} textPlain 
 * @param {*} hashPassword 
 * @returns 
 */
const compare = async (textPlain, hashPassword) => {
    return await bcrypt.compare(textPlain, hashPassword);
}

module.exports = {encrypt, compare};