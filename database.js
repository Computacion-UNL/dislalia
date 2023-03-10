const mongoose = require('mongoose');
// const URI = process.env.MONGODB_URI || 'mongodb://localhost/juegosdatos';
const URI = process.env.MONGODB_URI || 'mongodb+srv://admin:skilletsi12@cluster0.fvyrwfy.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
)
  .then(() => console.log('💾 Base de Datos Conectada'))
  .catch(e => console.log(e));


