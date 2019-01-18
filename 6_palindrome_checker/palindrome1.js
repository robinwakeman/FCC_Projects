function palindrome(str) {

  let forwardArr = str.replace(/\W|_/g,"").toLowerCase().split("");
  let backwardArr = [...forwardArr].reverse();

  console.log(forwardArr);
  console.log(backwardArr);
  for(let i in forwardArr){
    if(forwardArr[i] !== backwardArr[i]){
      return false;
    }
  }
  return true;
}