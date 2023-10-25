/**
Question:
Write a program to count the number of digits in a given integer.

Example:
Input: 12345
Output: 5

Input: 987654321
Output: 9

Constraints:

The input integer can be both positive and negative.
Consider the input integer to be within the range of a 32-bit signed integer.

 */
function countDigits(number) {
    const integerPart = Math.floor(Math.abs(number)); // Get the integer part
    const numStr = integerPart.toString(); // Convert it to a string
    const digitCount = numStr.length; // Count the digits
    return digitCount;
}
// Test cases
console.log(countDigits(12345.678)); // Should return 5 (digits in the integer part)
console.log(countDigits(-9876.54321)); // Should return 4 (digits in the integer part)
console.log(countDigits(0.123)); // Should return 1 (single digit in the integer part)
console.log(countDigits(123.0)); // Should return 3 (digits in the integer part)
console.log(countDigits(1.23456789)); // Should return 1 (single digit in the integer part)
console.log(countDigits(0)); // Should return 1 (single digit for zero)
console.log(countDigits(-12345.6789)); // Should return 5 (digits in the integer part)
console.log(countDigits(123456789))// Should return 5 (digits in the integer part)