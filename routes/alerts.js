var express = require('express');
var router = express.Router();
const vehAlert = require('./contract');
const GeoJSON = require('geojson');

/* GET users listing. */
router.post('/:plate_id', function(req, res, next) {
	const plate = req.params.plate_id;
	console.log(plate);
	// store in SC
	vehAlert.addAlert(plate).then(()=> {
		res.status(200).end();
	}).catch(err => next(err));
});

router.delete('/:plate_id', function(req, res, next) {
	console.log(req.params.plate_id);
	// delete from SC
	res.status(200).end();
});

router.get('/:plate_id', function(req, res, next) {
	vehAlert.getHits(req.params.plate_id).then(results => {
		console.log(results);
		const gjson = GeoJSON.parse(results, {Point: ['lat', 'lng'], include: ['ts']});
  };
		res.json(gjson);
	}).catch(err => next(err));
});

module.exports = router;
