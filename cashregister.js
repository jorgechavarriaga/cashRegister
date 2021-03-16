
const checkCashRegister = (price, cash, cid) => {
    const currencyAmount = {
      "PENNY": .01,"NICKEL": .05,"DIME": .10,"QUARTER": .25,"ONE": 1.00,"FIVE": 5.00,"TEN": 10.00,"TWENTY": 20.00,"ONE HUNDRED": 100.00
      };
  
    let totalCashInDrawer = 0;
    for (let element of cid) {
      totalCashInDrawer += element[1];
    }
    totalCashInDrawer = totalCashInDrawer.toFixed(2);
  
    let change = cash - price;
    const changeArray = [];
    for (var index = 0 ; index < cid.length; index++){
      if (cid[index][1] < 0){
        return `${cid[index][0]} $${cid[index][1]} is not a valid number in the CID`
      }
    };
    if (price > cash){
      return { status: "INSUFFICIENT_FUNDS", change: changeArray };
    } else if (change > totalCashInDrawer) {
      return { status: "INSUFFICIENT_FUNDS", change: changeArray };
    } else if (change.toFixed(2) === totalCashInDrawer) {
      return { status: "CLOSED", change: cid };
    } else {
      cid = cid.reverse();
      for (let elem of cid) {
        let temp = [elem[0], 0];
        while (change >= currencyAmount[elem[0]] && elem[1] > 0) {
          temp[1] += currencyAmount[elem[0]];
          elem[1] -= currencyAmount[elem[0]];
          change -= currencyAmount[elem[0]];
          change = change.toFixed(2);
        }
        if (temp[1] > 0) {
          changeArray.push(temp);
        }
      }
    }
    if (change > 0) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
    return { status: "OPEN", change: changeArray};
  }
  
  // Test 1
  var test1 = checkCashRegister(19.5,20,[["PENNY", 1.01],["NICKEL", 2.05],["DIME", 3.1],["QUARTER",4.25],["ONE",90],["FIVE",55],["TEN",20],["TWENTY",60],["ONE HUNDRED",100]]);
  console.log(test1);
  
  // Test 2
  var test2 = checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER",4.25], ["ONE",90], ["FIVE",55], ["TEN",20], ["TWENTY",60], ["ONE HUNDRED", 100]]);
  console.log(test2);
  
  // Test 3 
  var test3 =checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
  console.log(test3);
  
  // Test 4
  var test4 = checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
  console.log(test4);
  
  // Test 5
  var test5 = checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
  console.log(test5);
  
  // Test 6 
  var test6 = checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
  console.log(test6);
  
  