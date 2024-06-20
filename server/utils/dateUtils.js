function convertToDate(dateString) {
  // Split the date string into day, month, and year components
  const dateParts = dateString.split("/");

  if (dateParts.length != 3) return null;

  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; // Months are 0-indexed in JavaScript
  const year = parseInt(dateParts[2], 10);

  if ([day, month, year].some((field) => isNaN(field))) return null;

  const date = new Date(year, month, day);

  let isValidDate = null;

  // Check if the constructed date object's day, month, and year match the original values
  if (
    date.getDate() === day &&
    date.getMonth() === month &&
    date.getFullYear() === year
  ) {
    isValidDate = true;
  }

  if (!isValidDate) return null;
  else return date;
}

function calculateAge(birthDate) {
  var ageDifMs = Date.now() - birthDate.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.trunc(ageDate.getUTCFullYear() - 1970);
}

export { convertToDate, calculateAge };
