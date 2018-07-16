function * someGenerator () {
    const input = yield 1;
    const fn = yield 2 * input;
    yield fn(input);
    yield [...anotherGenerator()];
}

function * anotherGenerator () {
    yield 1;
    yield [];
    yield {};
}

const iterator = someGenerator();
console.log(iterator.next());
console.log(iterator.next(12));
console.log(iterator.next(input => input * 100));
console.log(iterator.next());
console.log(iterator.next());
