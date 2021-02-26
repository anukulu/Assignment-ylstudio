const SystemHealthMonitor = require('system-health-monitor');
const express = require('express');
const router = express.Router();

// used this library to get the cpu usage percentage of the node process
// can also be used to check memory overload
router.get('/', async (req, res, next) => {
    const monitorConfig = {
        checkIntervalMsec: 1000,
        mem: {
            thresholdType: 'rate',
            highWatermark: 0.8
        },
        cpu: {
            calculationAlgo: 'last_value',
            thresholdType: 'rate',
            highWatermark: 0.8
        }
    };
    const monitor = new SystemHealthMonitor(monitorConfig);
    monitor.start()
        .then(()=> {
            res.send({
                // totalMemory : monitor.getMemTotal(), // returns total amount of memory in megabytes on the host, returned value is an integer
                // freeMemory: monitor.getMemFree(), //  returns amount of the free memory in megabytes, returned value is an integer
                noOfCpuCores: monitor.getCpuCount(), // returns total amount of CPU cores;
                cpuUsageInPercentage: monitor.getCpuUsage(), // returns value from 0 to 100 that indicates average CPU utilization by all cores of all processors
            });
            monitor.stop();
        })
        .catch(err => {
            console.error(err);
            process.exit(1);
    });
});

module.exports = router;
