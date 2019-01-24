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

  cidAmount = Math.round(cidAmount * 100) / 100; // adjust for precision error

  changeAmount = payment - price; // calculate amount of change due

  // Case 1: if cid < change due, set status to "INSUFFICIENT_FUNDS" and return notification object immediately
  if(cidAmount < changeAmount) {
    notification.status = "INSUFFICIENT_FUNDS";
    notification.change = [];
    return notification; // no point in continuing if the outcome has already been determined
  }

  // Case 2: if cid == change due, set status to "CLOSED", continue onwards to populate change array
  if(cidAmount == changeAmount) {
    notification.status = "CLOSED";
  }

  // Case 3: if cid > change due, set status to "OPEN", continue onwards to populate change array
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

    let unitAmount = unitWorth[cid[i][0]]; // ex. PENNY unitWorth is 0.01
    let unitSum = 0; // total dollar amount this unit will have in change[]

    // while
    // 1 - the amount of change we still need is greater than the amount of one more unit
    // 2 - there is enough of that unit in the drawer
    while(changeAmount >= unitAmount && cid[i][1] >= unitAmount) {

      unitSum += unitAmount; // add another of that unit to unitSum
      cid[i][1] -= unitAmount;  // decrease cash in drawer (cid)
      changeAmount-= unitAmount; // decrease amount of change still needed

      unitSum = Math.round(unitSum * 100) / 100; // adjust for precision error
      changeAmount = Math.round(changeAmount * 100) / 100;
      cid[i][1] = Math.round(cid[i][1] * 100) / 100;

    }

    // put change of this unit type in the change array only if the amount > 0
    if(unitSum > 0){
      notification.change.unshift([[cid[i][0]], unitSum]);
    }
  }
  // Case 4: if cid >= change due, but exact change cannot be given, replicate Case 1
  //
  // if changeAmount > 0 at the end of the sorting, that means we couldn't give exact change
  console.log("changeAmount: "+changeAmount);
  if(changeAmount > 0) {
    notification.status = "INSUFFICIENT_FUNDS";
    notification.change = [];
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

// case 1/2
 let two=checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
 console.log("status2: "+two.status+" change: "+ two.change);

//case 3 - answer on fcc listed in wrong order
let three=checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
 console.log("status3: "+three.status+" change: "+three.change);

// case 4
let four=checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
 console.log("status4: "+four.status+" change: "+four.change);

// case 5
let five=checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
 console.log("status5: "+five.status+" change: "+five.change);
// case 6
let six=checkCashRegister(19.50, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
console.log("status5: "+six.status+" change: "+ six.change);


