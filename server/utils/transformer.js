function capitalize(string, splitChar = " ") {
  const split = string.split(splitChar);
  let finalString = "";

  split.forEach((str, idx) => {
    finalString +=
      str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() + " ";
  });

  return finalString.trim();
}

function capitalizeFirst(string, splitChar = " ") {
  const split = string.split(splitChar);
  let finalString = "";

  split.forEach((str, idx) => {
    if (idx == 0) {
      finalString +=
        str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() + " ";
    } else {
      finalString += str.toLowerCase() + " ";
    }
  });

  return finalString.trim();
}

export { capitalize, capitalizeFirst };
