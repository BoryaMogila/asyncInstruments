const _ = require('lodash');
const runners = require('../runners');

const getFirstRunner = () => {
    const startAll = runners
        .filter(runner => runner.time)
        .map((runner) => new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(runner)
        }, runner.time)
    }));
    return Promise.race(startAll)
}

console.time('getFirstRunner');
getFirstRunner()
    .then(({ name, time }) => {
        console.log(`${name} пробіг дистанцію за ${time} мілісекунд`);
        console.timeEnd('getFirstRunner');
    })
    .catch(e => {
        console.error(e);
        console.timeEnd('getFirstRunner');
    });

