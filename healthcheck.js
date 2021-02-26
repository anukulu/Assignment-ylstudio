const express = require('express');
const router = express.Router();

const serverError = (err, req, res, next) => { // for handling invalid json if request is sent as post
    res.message = err.message;
    res.status(err.status || 500);
    // console.log(err);
    return res.send("Something went wrong because of a bad request...");
}

const notFound = (req, res, next) => {
    res.send({
        msg: "Not Found",
        status: 404,
    });
}

router.get('/', async (_req, res, _next) => {
	
	const startUsage = process.cpuUsage();
	const now = Date.now();

	while(Date.now() - now < 500); // delaying by 0.5s just to check

	const used = process.memoryUsage();
	const newArr = {}; 
	for (key in used) { newArr[key] = Math.round(used[key]/1024/1024 * 100)/ 100;}
	const healthcheck = {
		uptime: process.uptime(), //server uptime
		message: 'OK',
		timestamp: Date.now(),
		memoryUsage : newArr, // memory usage in V8, javascript heap, external pr-ocesses used by the node process given in bytes
		cpuUsageByProcess : {"user" : process.cpuUsage().user / 1000000, //cpu usage time by the node process in user code and system code given in seconds
							 "system" : process.cpuUsage().system / 1000000,
							}, 
		 // current date and time
	};
	try {
		res.send(healthcheck);
	} catch (err) {
		healthcheck.message = err;
		res.status(503).send("Service Unavailable..."); // if error send a 503 response (service unavailable)
	}
});

module.exports.serverError = serverError;
module.exports.notFound = notFound;
module.exports.router = router;