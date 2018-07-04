function * someGenerator () {
    const input = yield 1;
    const fn = yield 2 * input;
    yield fn(input);
    yield [...anotherGenerator()];
}

function * anotherGenerator () {
    yield 1;
    yield [ ];
    yield {};
}

const iterator = someGenerator();
console.log(iterator.next());
console.log(iterator.next(12));
console.log(iterator.next(input => input * 100));
console.log(iterator.next());
console.log(iterator.next());


async function someAsuncFunction () {
    const res = await someAsyncOperation(params);
    // сихронний код
    const res2 = await someAsyncOperation(res);
    return await someAsyncOperation(res2);
}

someAsuncFunction().then(res => console.log(res));
