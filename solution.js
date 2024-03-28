let cashBox = [
    { 50: 10 },
    { 20: 10 },
    { 10: 10 },
    { 5: 25 },
    { 2: 25 },
    { 1: 25 },
    { 0.5: 25 },
    { 0.2: 25 },
    { 0.1: 25 },
    { 0.05: 25 },
    { 0.02: 25 },
    { 0.01: 25 },
  ];
  let moneyArray = [50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01];
  
  cashBox.push({ total: 0 });
  
  function createCashCounter() {
    function transaction(price, paidAmount) {
      let cashReturn = paidAmount - price;
      let cashReturnFix = +cashReturn.toFixed(2);
      let cashReturnArray = [];
      let cashBoxCopy = JSON.parse(JSON.stringify(cashBox));
  
      if (cashReturnFix < 0) {
        return `Customer should pay ${-cashReturnFix} Euro`;
      } else if (cashReturnFix === 0) {
        cashBox[cashBox.length - 1].total += paidAmount;
        return "No cash return needed";
      } else {
        cashBox[cashBox.length - 1].total += paidAmount;
        for (let i = 0; i < moneyArray.length; i++) {
          let noOfBanknotes = Math.floor(cashReturnFix / moneyArray[i]);
  
          if (noOfBanknotes > 0) {
            if (noOfBanknotes > cashBox[i][moneyArray[i]]) {
              cashReturnFix =
                cashReturnFix - cashBox[i][moneyArray[i]] * moneyArray[i];
  
              let PropertyName = `${moneyArray[i]} Euro`;
  
              cashReturnArray.push({ [PropertyName]: cashBox[i][moneyArray[i]] });
  
              cashBox[i][moneyArray[i]] = 0;
            } else {
              cashReturnFix = +(
                cashReturnFix -
                noOfBanknotes * moneyArray[i]
              ).toFixed(2);
  
              if (cashBox[i][moneyArray[i]] > 0) {
                cashBox[i][moneyArray[i]] =
                  cashBox[i][moneyArray[i]] - noOfBanknotes;
  
                let PropertyName = `${moneyArray[i]} Euro`;
  
                cashReturnArray.push({ [PropertyName]: noOfBanknotes });
              }
            }
          }
        }
        if (cashReturnFix !== 0) {
          // console.log(cashReturnArray);
          cashBox = cashBoxCopy;
          console.log(cashBox);
          return "Not enough change";
        }
      }
      console.log("This is our current cashbox:", cashBox);
  
      let cashReturnFiltered = cashReturnArray.filter((item) => {
        const value = Object.values(item)[0];
        return value !== 0;
      });
      console.log("This is your change:");
      return cashReturnFiltered;
    }
    return transaction;
  }
  
  let cashCounter = createCashCounter();
  
  console.log(cashCounter(77.87, 198.65), "\n");
  console.log(cashCounter(19.49, 100), "\n");
  console.log(cashCounter(265.77, 600), "\n");
  console.log(cashCounter(15, 100), "\n");
