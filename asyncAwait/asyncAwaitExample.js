const runPromise = require('../runPromise');
const runners = require('../runners');
const promiseObject = require('promise-all-object');

async function fakeSync (runners) {
    const  results = [];
    for(const runner of runners) {
        try {
            const res = await runPromise(runner);
            results.push(res);
        } catch (e) {
            console.log(e)
        }
    }
    return results;
}

async function allOrNotOne (runners) {
    try {
        const run = runners.map(runner => runPromise(runner));
        return await Promise.all(run);
    } catch (e) {
        console.error(e);
        return [];
    }
}

async function ignoreFail (runners) {
    const run = runners.map(runner => {
        return runPromise(runner)
            .catch(e => console.error(e));
    });
    return await Promise.all(run);
}

async function structuredRun (runners) {
    const run = {};
    runners.forEach(runner => {
        run[runner.name] = runPromise(runner)
            .then(res => res.time)
            .catch(e => console.error(e));
    });
    return promiseObject(run);
}

async function example () {
    console.time('fakeSync');
    console.log(await fakeSync(runners))
    console.timeEnd('fakeSync');

    console.time('allOrNotOne');
    console.log(await allOrNotOne(runners))
    console.timeEnd('allOrNotOne');


    console.time('ignoreFail');
    console.log(await ignoreFail(runners))
    console.timeEnd('ignoreFail');

    console.time('structuredRun');
    console.log(await structuredRun(runners))
    console.timeEnd('structuredRun');
}

example();