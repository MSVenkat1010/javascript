/*
Question:
Write a program to determine if a given integer is a palindrome. 
A palindrome is a number that remains the same when its digits are reversed.

Example:
Input: 121
Output: true (121 is a palindrome)

Input: -121
Output: false (-121 is not a palindrome)

Input: 12345
Output: false (12345 is not a palindrome) */
function palindromNum(n){
 //321
let reversed = 0
let org = n
let digit =0
while(org>0){
    digit = Math.floor(org%10)
    reversed=reversed*10 + digit
    org=Math.floor(org/10)
}

return (reversed===n)

}
console.log(palindromNum(121)); // true
console.log(palindromNum(-121)); // false
console.log(palindromNum(12345)); // false