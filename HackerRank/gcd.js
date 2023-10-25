/*
The greatest common divisor (GCD) of two or more numbers is the greatest common factor number that divides them, exactly. It is also called the highest common factor (HCF). For example, the greatest common factor of 15 and 10 is 5, since both the numbers can be divided by 5. */
function gcd(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

console.log( gcd(36, 24));

