const co = require('co');
const runPromise = require('../runPromise');
const runners = require('../runners');

function * fakeSyncGenerator (runners) {
    const  results = [];
    for(const runner of runners) {
        try {
            const res = yield runPromise(runner);
            results.push(res);
        } catch (e) {
            console.log(e)
        }
    }
    return results;
}

function * allOrNotOneGenerator (runners) {
    try {
        const run = runners.map(runner => runPromise(runner));
        return yield run;
    } catch (e) {
        console.error(e);
        return [];
    }
}

function * ignoreFailGenerator (runners) {
    const run = runners.map(runner => {
        return runPromise(runner)
            .catch(e => console.error(e));
    });
    return yield run;
}

function * structuredRunGenerator (runners) {
    const run = {};
    runners.forEach(runner => {
        run[runner.name] = runPromise(runner)
            .then(res => res.time)
            .catch(e => console.error(e));
    });
    return yield run;
}

co(function * () {
    console.time('fakeSyncGenerator');
    console.log(yield fakeSyncGenerator(runners))
    console.timeEnd('fakeSyncGenerator');

    console.time('allOrNotOneGenerator');
    console.log(yield allOrNotOneGenerator(runners))
    console.timeEnd('allOrNotOneGenerator');


    console.time('ignoreFailGenerator');
    console.log(yield ignoreFailGenerator(runners))
    console.timeEnd('ignoreFailGenerator');

    console.time('structuredRunGenerator');
    console.log(yield structuredRunGenerator(runners))
    console.timeEnd('structuredRunGenerator');
});
