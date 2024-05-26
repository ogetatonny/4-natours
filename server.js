const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = require('./app');

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFndAndModify: false
}).then(con => {
    console.log(con.connections);
    console.log('DB connection successful');
});

const tourschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, 'a tour must have a price']
    }
});
const Tour = mongoose.model('Tour', tourSchema);
// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
