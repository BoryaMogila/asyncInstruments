const _ = require('lodash');
const runners = require('../runners');
const runPromise = require('../runPromise');

const getRandomResult = () => {
    const runnerId = _.random(0, runners.length - 1);
    const randomRunner = runners[runnerId];
    return runPromise(randomRunner)
};
console.time('getRandomResult');
getRandomResult()
    .then(({ name, time }) => {
        console.log(`${name} пробіг дистанцію за ${time} мілісекунд`);
        console.timeEnd('getRandomResult');
    })
    .catch(e => {
        console.error(e);
        console.timeEnd('getRandomResult');
    });