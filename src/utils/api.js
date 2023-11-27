const API = import.meta.env.VITE_APP_API_URL;
const apiKey = import.meta.env.VITE_APP_API_KEY;
const myHeaders = new Headers();
myHeaders.append("X-Api-Key", apiKey);

export const getHouse = () => {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(API, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getHouseById = (id) => {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${API}/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteHouseById = (id) => {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };
    console.log(`${API}/${id}`);

    fetch(`${API}/${id}`, requestOptions)
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const postHouseImage = (image, id) => {
  return new Promise((resolve, reject) => {
    const postImageOptions = {
      method: "POST",
      headers: myHeaders,
      body: image,
      redirect: "follow",
    };
    fetch(`${API}/${id}/upload`, postImageOptions)
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const postHouse = (formdata) => {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(API, requestOptions)
      .then((response) => response.text())
      .then((resultText) => {
        const result = JSON.parse(resultText);
        const id = result["id"];
        resolve(id);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const editHousebyID = (formdata, id) => {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${API}/${id}`, requestOptions)
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
