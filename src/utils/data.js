// Flatten API get data to render as edited form format
export const flattenObject = (obj, parentKey = "", result = {}) => {
  for (let key in obj) {
    let newKey = parentKey ? key : key;
    if (newKey === "street") {
      newKey = "streetName";
      result[newKey] = obj[key];
      continue;
    }
    if (newKey === "hasGarage") {
      result[newKey] = obj[key] ? "Yes" : "No";
      continue;
    }
    if (key === "houseNumberAddition") {
      newKey = "numberAddition";
      if (
        obj[key] !== null &&
        obj[key] !== undefined &&
        obj[key].trim() !== ""
      ) {
        result[newKey] = obj[key];
      }
      continue;
    }
    if (typeof obj[key] === "object" && obj[key] !== null) {
      flattenObject(obj[key], newKey, result);
    } else {
      result[newKey] = obj[key];
    }
  }
  return result;
};

// Format zipcode when posting data to API, i.e. "1111 AB"
export const formAPIformat = (input) => {
  const formattedForm = new FormData();
  for (const [key, value] of Object.entries(input)) {
    if (key === "zip") {
      const numericPart = value.slice(0, 4);
      const letterPart = value.slice(-2).toUpperCase();
      const formattedZip = `${numericPart} ${letterPart}`;
      formattedForm.append(key, formattedZip);
    } else {
      formattedForm.append(key, value);
    }
  }
  return formattedForm;
};
