/*
Question:
Write a program to count the number of trailing zeros in the factorial of a given non-negative integer.

Example:
Input: 5
Output: 1
Explanation: The factorial of 5 is 120, which has one trailing zero.

Input: 10
Output: 2
Explanation: The factorial of 10 is 3,628,800, which has two trailing zeros.

Note:

You are not allowed to calculate the entire factorial of the number, as it may result in large numbers. Find a way to count the trailing zeros efficiently.
Your task is to write a program in your preferred programming language to determine the number of trailing zeros in the factorial of the given non-negative integer.
 */

function zeroCounter(str){
    let count=0
while(str>0){
if((str%10===0)){
count++;
} else {
    break;
}
str=Math.floor(str/10)
}
return count;
}
function trailingZeroFactorial(n) {
    let count = 0;

    // Divide n by increasingly larger powers of 5
    // and add the quotient to the count until the quotient is zero
    while (n > 0) {
        n = Math.floor(n / 5);
        count += n;
    }

    return count;
}

// Example usage:
console.log(trailingZeroFactorial(5)); // Output: 1
console.log(trailingZeroFactorial(10)); // Output: 2

/*
Trailing Zeros Definition: Trailing zeros are zeros that appear at the end of a number and don't affect the number's value. For example, in the number 120, there is one trailing zero.

Factorial and Trailing Zeros: When calculating the factorial of a number, trailing zeros are primarily determined by the factors of 5 and multiples of 10.

Counting Factors of 5: To efficiently count trailing zeros, we divide the number by 5 and accumulate the quotient. Each division represents a factor of 5 and contributes one trailing zero.

Efficiency: This approach is efficient because it focuses on counting the factors of 5, which directly determines the number of trailing zeros. It avoids the need to calculate the entire factorial, which can be large for large numbers.

Example: For example, in the factorial of 25 (25!), there are 5 factors of 5, which means it has 5 trailing zeros. */
console.log("check=>",trailingZeroFactorial(12
    ))