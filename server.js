const dotenv = require('dotenv');
dotenv.config();
const app = require('./app');
const mongoose = require('mongoose');

const DB = process.env.MONGODB_SERVER.replace('<PASSWORD>', process.env.DB_PASSWORD);
// console.log(process.env) 


mongoose.connect(DB)
    .then(() => console.log('Connected to MONGODB!'))
    .catch(err => console.log('Failed to connect MONGODB!'));

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})