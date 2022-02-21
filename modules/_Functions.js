////////////////
// FUNCTIONS //
//////////////
function getNewDate() {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let d = new Date();
  let newDate = {
    year: d.getFullYear(),
    month: month[d.getMonth()],
    date: d.getDate().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }),
    hour: d.getHours().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }),
    min: d.getMinutes().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }),
    sec: d.getSeconds().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }),
    timestamp: Date.now(),
  };
  return newDate;
}
function getNewId(list) {
  let maxId = 0;
  for (const item of list) {
    if (item.id > maxId) {
      maxId = item.id;
    }
  }
  return maxId + 1;
}
//////////////
// EXPORTS //
////////////
module.exports = { getNewDate, getNewId };
