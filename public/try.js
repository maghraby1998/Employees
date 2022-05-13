const valid = /^\d+$/;

const value = 23324;

const checkInt = (int) => {
    let result;

    if (int.toString().match(valid)) {
        result = true;
    } else {
        result= false
    }

    return result;
}

console.log(checkInt(value))