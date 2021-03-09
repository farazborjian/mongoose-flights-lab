const Flight = require('../models/flight');

module.exports = {
	new: newFlight,
	index,
	create,
};

function newFlight(req, res) {
	res.render('flights/new');
}

function index(req, res) {
	Flight.find({}, function (err, flights) {
		res.render('flights/index', { title: 'All Flights', flights });
	});
}

function create(req, res) {
	req.body.nowFlying = !!req.body.nowFlying;

	req.body.cast = req.body.cast.replace(/\s*,\s*/g, ',');
	if (req.body.cast) req.body.cast = req.body.cast.split(',');

	const flight = new Flight(req.body);
	flight.save(function (err) {
		if (err) return res.render('flights/new');

		res.redirect('/flights/index');
	});
}
