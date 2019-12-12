const { getTrips, getDriver } = require('api');
/**
 * This function should return the trip data analysis
 *
 * Question 3
 * @returns {any} Trip data analysis
 */

async function analysis() {
  //console.time('a')
  let trips;
  let driversID;
  let unqieDriversID;
  let driverDetails = [];
  let allDriverDetails = new Map();
  // try {
  trips = await getTrips();
  driversID = trips.map(currentValue => currentValue.driverID);
  unqieDriversID = [...new Set(driversID)];

    // console.log(unqieDriversID)
  // } catch (error) {
  //   //console.error(error.message);
  // }
  let noOfDriversWithMoreThanOneVehicle = 0;
  let p = [];
  for (value of unqieDriversID) {
    //console.log(value)
    // try {
      // let detail = await getDriver(value);
      p.push(getDriver(value).then(detail => {
        console.log(detail);
        // console.log(detail);
        if (detail.vehicleID.length > 1) {
          noOfDriversWithMoreThanOneVehicle += 1;
        }
        driverDetails.push(detail);
        // let driverDetail = { ...detail };
        detail['noOfTrips'] = 0;
        detail['totalAmountEarned'] = 0;
        // console.log(driverDetail)
        allDriverDetails.set(value, detail);
        //console.log(allDriverDetails)
      }).catch(err => {}));
    // } catch (error) {
      //console.log(error.message);
    // }
  }
  // console.log(driverDetails)
  let pp = await Promise.all(p).catch(err => console.log(err));
  // driverDetails.forEach(currentValue => {
  //   if (currentValue.vehicleID.length > 1) {
  //     noOfDriversWithMoreThanOneVehicle += 1;
  //   }
  // });
  //console.log(noOfDriversWithMoreThanOneVehicle)
  let skeleton = {
    noOfCashTrips: 0,
    noOfNonCashTrips: 0,
    billedTotal: 0,
    cashBilledTotal: 0,
    nonCashBilledTotal: 0,
    noOfDriversWithMoreThanOneVehicle,
  };
  // console.log(skeleton)
  
  let result = trips.reduce((accumulator, currentValue) => {
    const ban = convertToNumber(currentValue.billedAmount);
    accumulator.billedTotal += ban;
    if (currentValue.isCash) {
      accumulator.noOfCashTrips += 1;
      accumulator.cashBilledTotal += ban;
      // accumulator.cashBilledTotal = parseFloat(
      //   accumulator.cashBilledTotal.toFixed(2),
      // );
    } else {
      accumulator.noOfNonCashTrips += 1;
      accumulator.nonCashBilledTotal += ban;
      // accumulator.nonCashBilledTotal = parseFloat(accumulator.nonCashBilledTotal.toFixed(2));
    }
    //console.log(currentValue)
    if (allDriverDetails.has(currentValue.driverID)) {
      let details = allDriverDetails.get(currentValue.driverID);
      details.noOfTrips += 1;
      details.totalAmountEarned += ban;
      let sortedTrips = [...allDriverDetails].sort((a, b) =>b[1].noOfTrips - a[1].noOfTrips,);
      console.log(sortedTrips);
      // console.log(sortedTrips)
      let sortedAmount = [...allDriverDetails].sort(
        (a, b) => b[1].totalAmountEarned - a[1].totalAmountEarned,
      );
      // let {
      //   name,
      //   email,
      //   phone,
      //   noOfTrips,
      //   totalAmountEarned
      // } 
      mostTripsByDriver = {
        name: sortedTrips[0][1].name,
        email :sortedTrips[0][1].email,
        phone: sortedTrips[0][1].phone,
        noOfTrips: sortedTrips[0][1].noOfTrips,
        totalAmountEarned: sortedTrips[0][1].totalAmountEarned
      };
      highestEarningDriver = {
        name: sortedAmount[0][1].name,
        email: sortedAmount[0][1].email,
        phone: sortedAmount[0][1].phone,
        noOfTrips: sortedAmount[0][1].noOfTrips,
        totalAmountEarned: sortedAmount[0][1].totalAmountEarned
      };
      accumulator['mostTripsByDriver'] = mostTripsByDriver;
      accumulator['highestEarningDriver'] = highestEarningDriver;
    }

    return accumulator;
  }, skeleton);
  result.cashBilledTotal = parseFloat(result.cashBilledTotal.toFixed(2));
  result.nonCashBilledTotal = parseFloat(result.nonCashBilledTotal.toFixed(2));
  result.billedTotal = parseFloat(result.billedTotal.toFixed(2));
  // console.log(result)
  //console.timeEnd('a')
  return result;
}

analysis();

function convertToNumber(str) {
  return typeof str === 'number'
    ? parseFloat(str)
    : parseFloat(str.replace(',', ''));
}
module.exports = analysis;
