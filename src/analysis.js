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
    trips = await getTrips();
    driversID = trips.map(currentValue => {
      currentValue.driverID
    });
    unqieDriversID = [...new Set(driversID)];

    // console.log(unqieDriversID)
    // } catch (error) {
    //   //console.error(error.message);
    // }
    let noOfDriversWithMoreThanOneVehicle = 0;

    let allDriversIDPromises = unqieDriversID.map(currentValue =>
      getDriver(currentValue),
    );
    console.log(allDriversIDPromises);
    let allDriversInfoPromise = allDriversIDPromises.reduce(
      async (acc, val, i) => {
        try {
          acc = await acc;
          let driverInfo = await val;
          acc.push(driverInfo);
          // console.log(driverInfo);
        } catch (err) {
          console.log(err);
        }
        return acc;
      },
      [],
    );
   
    let allDriversInfo = await allDriversInfoPromise;
    console.log(allDriversInfo);

    // for (value of allDriversInfo) {
    //   if (value.vehicleID.length > 1) {
    //     noOfDriversWithMoreThanOneVehicle += 1;
    //   }
    //   driverDetails.push(value);
    //   value['noOfTrips'] = 0;
    //   value['totalAmountEarned'] = 0;
    //     for (driver of unqieDriversID){
    //     // console.log(detail);
        

    //     // let driverDetail = { ...detail };
    //     //
    //     // // console.log(driverDetail)
    //     allDriverDetails.set(driver, value);
    //     //console.log(allDriverDetails)
    //     }
    // }
   
    let skeleton = {
      noOfCashTrips: 0,
      noOfNonCashTrips: 0,
      billedTotal: 0,
      cashBilledTotal: 0,
      nonCashBilledTotal: 0,
      noOfDriversWithMoreThanOneVehicle,
      mostTripsByDriver:{
        name: '',
        email: '',
        phone:'',
        noOfTrips: 0,
        totalAmountEarned: 0
      },
      highestEarningDriver:{
        name: '',
        email: '',
        phone: '',
        noOfTrips: 0,
        totalAmountEarned: 0
      }
    };

    let result = trips.reduce((accumulator, currentValue) => {
      const ban = convertToNumber(currentValue.billedAmount);
      accumulator.billedTotal += ban;
      if (currentValue.isCash) {
        accumulator.noOfCashTrips += 1;
        accumulator.cashBilledTotal += ban;
        
      } else {
        accumulator.noOfNonCashTrips += 1;
        accumulator.nonCashBilledTotal += ban;
        // accumulator.nonCashBilledTotal = parseFloat(accumulator.nonCashBilledTotal.toFixed(2));
      }
      

      return accumulator;
    }, skeleton);
    result.cashBilledTotal = parseFloat(result.cashBilledTotal.toFixed(2));
    result.nonCashBilledTotal = parseFloat(
      result.nonCashBilledTotal.toFixed(2),
    );
    result.billedTotal = parseFloat(result.billedTotal.toFixed(2));
   //console.log(result)
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
