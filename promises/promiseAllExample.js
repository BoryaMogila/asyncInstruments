const _ = require('lodash');
const runners = require('../runners');

const getAllRunners = () => {
    const startAll = runners.map((runner) => new Promise((resolve, reject) => {
        if (!runner.time) {
            resolve(runner);
            return;
        }
        setTimeout(() => {
            resolve(runner)
        }, runner.time)
    }));
    return Promise.all(startAll)
};

getAllRunners()
    .then(results => {
        results.map(({ name, time }) => {
            if (!time) {
                console.log(`${name} не добіг`);
                return;
            }
            console.log(`${name} пробіг дистанцію за ${time} мілісекунд`)
        })
    })
    .catch(e => console.error(e));