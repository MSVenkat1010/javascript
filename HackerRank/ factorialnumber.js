function factorialnumber(n){
    if(n==0||n==1){
return 1
    }
    return n * factorialnumber(n-1)
}

console.log(factorialnumber(12)) //120