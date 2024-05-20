const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json()); // middleware

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello from the server side!', app: 'Natours' });
});

app.post('/', (req, res) => {
    res.send('You can post to this endpoint...');
});

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json', 'utf-8'));

const  getAllTours =  (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });
};

const getTour = (req, res) => {
    console.log(req.params);

    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    if (!tour) { // Corrected the comment style and indentation
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
};

const createTour = (req, res) => {
    // console.log('req.body');

    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    tours.push(newTour);

    fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(tours), err => {
        res.status(201).json({ // Issue: Need to handle the err parameter
            status: 'success',
            data: {
                tour: newTour
            }
        });
    });
};

const deleteTour = (req, res) => {
    const id = req.params.id * 1;

    const tour = tours.find(el => el.id === id); // Issue: Add logic to find the tour

    if (!tour) { // Issue: Incorrectly checking ID against length of tours array
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(tours), err => { // Issue: Need to handle the err parameter
        res.status(204).json({
            status: 'success',
            data: null
        });
    });
};

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.delete('/api/v1/tours/:id', deleteTour)

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app.route('/api/v1/tours/:id').get(getTour).delete(deleteTour);

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`); // Fixed template string
});
