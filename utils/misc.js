const strings = require('../config/strings')
let utils = {};


utils.generateFibanocciSeries = function (count, prime_only){
    let result = [];
    let index = 1;
    let result_length = 0;
    while (result_length < count){
        let num = Math.round(Number((getY_1(index) - getY_2(index)) / Math.sqrt(5)));
        if (!isFinite(num)){
            if (prime_only && result.length < count){
                let higher_primes = JSON.parse(JSON.stringify(strings.HIGHER_PRIME))
                let difference = count - result.length;
                difference = higher_primes.slice(0,difference);
                result = result.concat(difference)
            }
            return result;
        }
        num = BigInt(num)
        index += 1;
        if (prime_only){
            if (isPrime(num)) {
                result.push((num+"").replace("n",""));
                result_length +=1;
            }
        }else{
            result.push((num+"").replace("n",""));
            result_length +=1;
        }
    }
    return result
};

function getY_1(N) {
    return Math.pow((1 + Math.sqrt(5.0)) / 2.0, N);
}

function getY_2(N) {
    return Math.pow((1 - Math.sqrt(5.0)) / 2.0, N);
}

function isPrime(num) {

    if (num === 2n || num === 3n)
        return true;

    if (num % 2n === 0n || num % 3n === 0n) {
        return false;
    }

    let i = 5n;
    let s = 2n;

    while (i * i <= num) {
        if (num % i === 0n) {
            return false;
        }
        i += s;
        s = 6n - s;
    }
    return true;
}



module.exports = utils;