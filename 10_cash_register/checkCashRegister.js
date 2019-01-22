function checkCashRegister(price, payment, cid) {
  let notification = {
    status: null,
    change: []
  };
  let changeAmount, cidAmount, cidUnitCount=[];
  let unitWorth = {'PENNY': 0.01,
                  'NICKEL': 0.05,
                  'DIME': 0.1,
                  'QUARTER': 0.25,
                  'ONE': 1,
                  'FIVE': 5,
                  'TEN': 10,
                  'TWENTY': 20,
                  'ONE HUNDRED': 100};

  // calculate the total value of the change in drawer
  cidAmount = cid.reduce(function(sum, current){
                  return sum + current[1];
                }, 0);

  // adjust for rounding error
  cidAmount = parseFloat(cidAmount).toFixed(2);
  //console.log("cid amount: "+ cidAmount); //test

  // calculate amount of change due
  changeAmount = payment - price;
  //console.log("change amount: "+changeAmount); //test

    // Case 1: if cid < change due,
  // return insufficient funds status object
  if(cidAmount < changeAmount) {
    notification.status = "INSUFFICIENT_FUNDS";
    notification.change = [];
    return notification; // no point in continuing if the outcome has already been determined
  }

  // Case 2: if cid >= change due, but exact change cannot be given,
  // return insufficient funds status object
  // TODO


  // Case 3: if cid == change due,
  // return closed status object
  if(cidAmount == changeAmount) {
    notification.status = "CLOSED";
  }

  // Case 4: if cid > change due,
  // return open status object
  if(cidAmount > changeAmount) {
    notification.status = "OPEN";
  }

  // count how many of each type of change contained in cid, return a new array
  // for example: cid[0]{'PENNY': 1.01} -> cidUnitCount[0] = {'PENNY': 101}
  cidUnitCount = cid.map(function(unitType){
    return {[unitType[0]]: unitType[1]/unitWorth[unitType[0]]};
  });

  // Calculate amount of each unit of change due (in dollars)
  //
  // assumption: cid will always be sorted, lowest value unit - higest
  // so PENNY object will be at cid[0], ONE HUNDRED object will be at cid[8]
  for(let i=8; i>=0; i--){

//LOGIC ERROR IN THIS SECTION
    let unitAmount = unitWorth[cid[i][0]];
    let unitSum = 0;

    if(unitAmount <= cid[i][1] && unitAmount < changeAmount){
      unitSum = unitAmount;
    }

    // while unitAmount <= amount of that unit in drawer cid[i][1]
    if(unitSum > 0){
    while(unitSum <= cid[i][1] && unitSum < changeAmount) {
      // add another of that unit to unitAmount
//      unitAmount += unitWorth[cid[i][0]];
      unitSum += unitAmount;
      // decrease cash in drawer (cid) by amount of change given
      changeAmount-= unitAmount;
      //unitAmount = Math.floor(changeAmount / unitWorth[cid[i][0]]) * unitWorth[cid[i][0]];
    }}
    console.log("unitAmount:"+unitSum);

    // round dollar amount to two decimal places
    unitSum = parseFloat(unitSum).toFixed(2)
    console.log(cid[i][0]+" worth: "+unitWorth[cid[i][0]]+ " | given: "+unitSum); //test

    // if there is change in that unit, put it in the change array
    if(unitSum > 0){
      notification.change.unshift([[cid[i][0]], unitSum]);
    }
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

//let x=checkCashRegister(19.5, 301.16, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
let x=checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
console.log("status: "+x.status+" change: "+ x.change);

