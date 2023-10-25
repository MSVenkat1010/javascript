/**
 * 
 * Given an array of integers, calculate the ratios of its elements that are positive, negative, and zero. Print the decimal value of each fraction on a new line with places after the decimal.

Note: This challenge introduces precision problems. The test cases are scaled to six decimal places, though answers with absolute error of up to are acceptable.

Example
arr = [-4 -9 0 4 1]
There are elements, two positive, two negative and one zero. Their ratios are 2/5 , 2/5 and 1/5. Results are printed as:
0.400000
0.400000
0.200000

Function Description

Complete the plusMinus function in the editor below.

plusMinus has the following parameter(s):
* int arr[n]: an array of integers

Prin
Print the ratios of positive, negative and zero values in the array. Each value should be printed on a separate line with digits after the decimal. The function should not return a value.
 */

function plusMinus(arr) {
  // Write your code here
  let n = arr.length;
  let countp = 0;
  let countn = 0;
  let count0 = 0;
  for (let i = 0; i < n; i++) {
    if (arr[i] > 0) {
      countp += 1;
    } else if (arr[i] < 0) {
      countn += 1;
    } else {
      count0 += 1;
    }
  }
  console.log(
    (countp / n).toFixed(6) +
      "\n" +
      (countn / n).toFixed(6) +
      "\n" +
      (count0 / n).toFixed(6)
  );
}

/**
input:
6
-4 3 -9 0 4 1
output:
0.500000
0.333333
0.166667
 */
