function checkCashRegister(price, payment, cid) {
  let notification = {
    status: null,
    change: []
  };
  let changeAmount, cidAmount;
  let changeUnitCount=[], cidUnitCount=[];
  let unitWorth = {'PENNY': 0.01,
                  'NICKEL': 0.05,
                  'DIME': 0.1,
                  'QUARTER': 0.25,
                  'ONE': 1,
                  'FIVE': 5,
                  'TEN': 10,
                  'TWENTY': 20,
                  'ONE HUNDRED': 10};

  // calculate the total value of the change in drawer
  cidAmount = cid.reduce(function(sum, current){
                  return sum + current[1];
                }, 0);

  // adjust for rounding error
  cidAmount = parseFloat(cidAmount).toFixed(2);
  console.log("cid amount: "+ cidAmount); //test

  // calculate amount of change due
  changeAmount = payment - price;
  console.log("change amount: "+changeAmount); //test

  // count how many of each type of change contained in cid, return a new array
  // for example: cid[0]{'PENNY': 1.01} -> cidUnitCount[0] = {'PENNY': 101}
  cidUnitCount = cid.map(function(unitType){
    return {[unitType[0]]: unitType[1]/unitWorth[unitType[0]]};
  });

  console.log("cid unit count keys: "+Object.keys(cidUnitCount)); //test
  console.log(Object.keys(cidUnitCount[0])); //test - unit name
  console.log(cidUnitCount[0][Object.keys(cidUnitCount[0])]); //test - unit count

    // count/calculatue units of change due
  // use changeAmount and cidUnitCount

  // for each unit put into changeUnitCount, decrease that unit in cidUnitCount

  // changeUnitCount = cid.forEach(function(elem){

  // });

  // hundreds
  let in100s = Math.floor(changeAmount / 100) * 100;
  changeAmount -= in100s;
  let in20s = Math.floor(changeAmount / 20) * 20;
  changeAmount -= in20s;
  let in10s = Math.floor(changeAmount / 10) * 10;
  changeAmount -= in10s;
  let in5s = Math.floor(changeAmount / 5) * 5;
  changeAmount -= in5s;
  let in1s = Math.floor(changeAmount);
  changeAmount -= in1s;
  let inQuarters = Math.floor(changeAmount / 0.25) * 0.25;
  changeAmount -= inQuarters;
  let inDimes = Math.floor(changeAmount / 0.1) * 0.1;
  changeAmount -= inDimes;
  let inNickels = Math.floor(changeAmount / 0.05) * 0.05;
  changeAmount -= inNickels;
  let inPennies = Math.floor(changeAmount / 0.01) * 0.01;

  console.log("in hundreds: "+in100s);
  console.log("in twenties: "+in20s);
  console.log("in tens: "+in10s);
  console.log("in fives: "+in5s);
  console.log("in ones: "+in1s);
  console.log("in quarters: "+inQuarters);
  console.log("in dimes: "+inDimes);
  console.log("in nickels: "+inNickels);
  console.log("in pennies: "+inPennies);




  // Case 1: if cid < change due,
  // return insufficient funds status object
   if(cidAmount < changeAmount) {
    notification.status = "INSUFFICIENT_FUNDS";
    notification.change = [];
  }

  // Case 2: if cid >= change due, but exact change cannot be given,
  // return insufficient funds status object


  // Case 3: if cid == change due,
  // return closed status object
  if(cidAmount == changeAmount) {
    notification.status = "CLOSED";
    notification.change = changeUnitCount;
  }

  // Case 4: if cid > change due,
  // return open status object
  if(cidAmount > changeAmount) {
    notification.status = "OPEN";
    notification.change = changeUnitCount;
  }
  return notification;
}

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.1],
// ["QUARTER", 4.25],
// ["ONE", 90],
// ["FIVE", 55],
// ["TEN", 20],
// ["TWENTY", 60],
// ["ONE HUNDRED", 100]]

let x=checkCashRegister(19.5, 301.16, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
console.log("function returns: "+x.status);

