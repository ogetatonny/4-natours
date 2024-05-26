const express = require('express')
const tourController = require('./../controllers/tourController');

const router = express.Router();


router.route('/').get(tourController.getAllTours).post(tourController.createTour);

router.param('id', (req, res, next, val) => {
    console.log('Tour id is: ${val}');
    next();
})

router.route('/:id').get(tourController.getTour).delete(tourController.deleteTour);

module.exports = router;