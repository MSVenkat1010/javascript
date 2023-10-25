function lcm(a, b) {
    //Formula: LCM(a, b) = (a * b) / GCD(a, b)
    // Calculate the GCD using the Euclidean algorithm
    function gcd(a, b) {
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    return (a * b) / gcd(a, b);
}

console.log(lcm(24, 36)); // Output: 72
console.log(lcm(14, 28)); // Output: 28
console.log(lcm(50, 75)); // Output: 150
console.log(lcm(63, 81)); // Output: 567
console.log(lcm(5, 7));   // Output: 35
