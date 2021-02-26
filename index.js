const {notFound, serverError, router } = require('./healthcheck');
const stats = require('./cpuStats');
const express = require('express');
const {mongoose} = require('./connection');
const app = new express();
const healthCheck = require('@openreply/emw-health-check');

app.use(express.json());
app.use('/api/healthcheck', router);
app.use('/api/stats', stats);
// If the express server is running and reachable, the middleware will provide and success answer (HTTP Status: 200) with information regarding the service
// can be accessed with http://localhost:3000/health
app.use(healthCheck({ serviceName: 'proxy-setup', serviceVersion: "" }));
// custom middlewares
app.use(notFound); 
app.use(serverError);

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});