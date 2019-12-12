// // const promise1 = Promise.resolve (1);
// // console.log(promise1)

// // const promise3 = new Promise ((resolve, reject) => {
// //     if(Math.random() < 0.5){
// //         reject (Error("bad luck"))
    
// //     return
// //     }
// //    resolve(promise1) 
// // })
// //getting the data from api
// const trips =await getTrips()
  
// // const drivers = getDriver().then
// // const value = await Promise.all([trips])
// //  console.log(value)
// //let driversIDArr = [];

// //using reduce to access each object in the array and manipulate it
// const analyse = trips.reduce( async (acc, val, index) => {
//     acc = await acc  
//     if (val.isCash === true) {
//       acc['noOfCashTrips']++;
//       //console.log(acc.noOfCashTrips);
//       acc.cashBilledTotal += convertToNumber(val.billedAmount);
//       //console.log(acc.cashBilledTotal);
//       //console.log(val.isCash);
//     } else {
//       acc.noOfNonCashTrips++;
//       //console.log(acc.noOfNonCashTrips);
//       acc.nonCashBilledTotal += convertToNumber(val.billedAmount);
//       //console.log(acc.nonCashBilledTotal);
//     }
//     driversIDArr.push(val.driverID)
//     acc.billedTotal += convertToNumber(val.billedAmount);
//     try {
//       const driversID = await getDriver(val.driverID)
//       if(!driversIDArr.includes(val.driverID)){
//       if(driversID.vehicleID.length > 1){
//         acc.noOfDriversWithMoreThanOneVehicle ++
//         //console.log(driversID)
//         //console.log(acc.noOfDriversWithMoreThanOneVehicle)
//       }
//     }
//     } catch (error) {
//       //console.log(error)
//     }
//     return await acc;
//   },
//   {
//     noOfCashTrips: 0,
//     noOfNonCashTrips: 0,
//     billedTotal: 0,
//     cashBilledTotal: 0,
//     nonCashBilledTotal: 0,
//     noOfDriversWithMoreThanOneVehicle: 0,
//     mostTripsByDriver: {
//       name: '',
//       email: '',
//       phone: '',
//       noOfTrips: 0,
//       totalAmountEarned: 0,
//     },
//     highestEarningDriver: {
//       name: '',
//       email: '',
//       phone: '',
//       noOfTrips: 0,
//       totalAmountEarned: 0,
//     },
//   },
// );
// const result =await analyse.then(answer => {
//   //console.log(answer);
//   return answer;
// })
// result.billedTotal = Math.trunc(result.billedTotal * 100)/100;
// result.cashBilledTotal = Math.trunc(result.cashBilledTotal * 100)/100;
// result.nonCashBilledTotal = Math.trunc(result.nonCashBilledTotal * 100)/100;
// console.log(result)
// console.log(driversIDArr)
// return result 
// }

// function convertToNumber(str) {
// return typeof str === 'number'
//   ? parseFloat(str)
//   : parseFloat(str.replace(',', ''));
// }
// analysis();