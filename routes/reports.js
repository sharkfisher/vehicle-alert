var express = require('express');
var router = express.Router();
const vehAlert = require('./contract');

/* GET users listing. */
router.get('/:plate_id', function(req, res, next) {

	vehAlert.queryPlate(req.params.plate_id).then(result => res.json(result))
	.catch(err => res.error(err));
});

router.post('/', function(req, res, next) {
	console.log(req.body);
	const data = req.body;
	vehAlert.reportHit(data.plate, data.lat, data.lng, Date.now()).then((result)=> {console.log(result); res.status(200).end()})
	.catch(next);
});

module.exports = router;
