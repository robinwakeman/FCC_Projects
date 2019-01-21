function convertToRoman(decimalNum) {
    let numeralVals = [ 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1 ];
    let numerals = [ 'M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I' ];
    let romanNumeral = [];
    // for each possible "numeral value" digit/character
    for(let valueIndex in numeralVals){
        // while the remaining unconverted decimal number is still evenly divisible by the current numeral value
        while(decimalNum / numeralVals[valueIndex] >= 1) {
            let division = decimalNum / numeralVals[valueIndex]; // test
            console.log(decimalNum+"/"+numeralVals[valueIndex]+"="+division); //test
            // push a copy of the current numeral value to the converted roman numeral
            romanNumeral.push(numerals[valueIndex]);
            // decrease the remaining decimal number by the value of the numeral converted
            decimalNum -= numeralVals[valueIndex];
        }
    }
 return romanNumeral.join('');
}

let x=convertToRoman(2);
console.log(x);