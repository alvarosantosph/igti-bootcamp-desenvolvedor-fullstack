import process from './process.js';

await process.createFiles();
console.log(await process.getCitiesCount('RJ'));
console.log(await process.getStatesWithMoreOrLessCities(true));
console.log(await process.getStatesWithMoreOrLessCities(false));
console.log(await process.getBiggerOrSmallerNameCities(true));
console.log(await process.getBiggerOrSmallerNameCities(false));
console.log(await process.getBiggerOrSmallerCityName(true));
console.log(await process.getBiggerOrSmallerCityName(false));