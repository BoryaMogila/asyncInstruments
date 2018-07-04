module.exports =  function run(runner) {
   return new Promise((resolve, reject) => {
        if (!runner.time) {
            reject(`${runner.name} не добіг!`);
        }
        setTimeout(() => {
            resolve(runner)
        }, runner.time)
    });
}