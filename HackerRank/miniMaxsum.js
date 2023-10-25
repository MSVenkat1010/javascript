/**
 * 
 * """
Given five positive integers, find the minimum and maximum values that can be calculated by summing exactly four of the five integers. Then print the respective minimum and maximum values as a single line of two space-separated long integers.

Example
arr=[1,3,5,7,9]
The minimum sum is 1+3+5+7 = 16and the maximum sum is 3+5+7+9 =24. The function prints
16 24

Function Description

Complete the miniMaxSum function in the editor below.

miniMaxSum has the following parameter(s):
* arr: an array of integers

Print

Print two space-separated integers on one line: the minimum sum and the maximum sum of of elements.
"""} arr 
 */
function miniMaxSum(arr) {
    const min_num = Math.min(...arr);
    const max_num = Math.max(...arr);
    const total_sum = arr.reduce((acc, current) => acc + current, 0);
  
    const min_sum = total_sum - max_num;
    const max_sum = total_sum - min_num;
  
    console.log(min_sum, max_sum);
  }
  
  // Example usage:
  const arr = [1, 3, 5, 7, 9];
  miniMaxSum(arr);
  