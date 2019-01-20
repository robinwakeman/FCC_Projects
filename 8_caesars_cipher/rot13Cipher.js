function rot13(str) {

  let arr = str.split('');
  let upperLetter = /[A-Z]/;

  for(let i=0; i<arr.length; i++){

    let char = arr[i]; // current character
    let code = arr[i].charCodeAt(0); // current char's unicode value
    let shift;

    if(upperLetter.test(char) && code>=65 && code<=90){
      if(code < 78) { shift = 13; }
      else { shift = -13; }

      arr[i] = String.fromCharCode(code + shift);
    }
  }
  return arr.join('');
}