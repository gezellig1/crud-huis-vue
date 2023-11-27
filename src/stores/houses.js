import { defineStore } from "pinia";
import {
  getHouse,
  getHouseById,
  deleteHouseById,
  postHouse,
  editHousebyID,
  postHouseImage,
} from "../utils/api.js";

export const useHouseStore = defineStore({
  id: "house",
  state: () => ({
    house: [],
    currentHouse: [],
    myListedHouse: [],
    myViewedHouse: [],
  }),

  actions: {
    fetchHouse() {
      return new Promise((resolve, reject) => {
        getHouse()
          .then((data) => {
            this.house = data;
            resolve(this.house);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    fetchHouseById(id) {
      return new Promise((resolve, reject) => {
        getHouseById(id)
          .then((data) => {
            this.currentHouse = data;
            resolve(this.currentHouse);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    fetchMyViewedHouse(id) {
      return new Promise((resolve, reject) => {
        getHouseById(id)
          .then((data) => {
            if (Object.keys(data).length === 0) {
              resolve(id); // staled id
            } else {
              this.myViewedHouse.push(data[0]);
              resolve(this.myViewedHouse);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    fetchMyListingHouse() {
      return new Promise((resolve, reject) => {
        getHouse()
          .then((allHouses) => {
            const filteredList = allHouses.filter(
              (house) => house.madeByMe === true
            );
            this.myListedHouse = filteredList;
            resolve(this.myListedHouse);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deleteHouse(id) {
      return new Promise((resolve, reject) => {
        deleteHouseById(id)
          .then(() => {
            this.house = this.house.filter((house) => house.id !== id);
            this.myViewedHouse = this.myViewedHouse.filter(
              (house) => house.id !== id
            );
            this.myListedHouse = this.myListedHouse.filter(
              (house) => house.id !== id
            );
            resolve(this.house);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    addHouse(formData, imageData) {
      return new Promise((resolve, reject) => {
        const updateStore = (id) => {
          getHouseById(id).then((fullAddedInfo) => {
            this.house.push(fullAddedInfo[0]);
          });
        };

        let addedHouseId;
        const addedHouse = postHouse(formData);

        addedHouse
          .then((apiHouseid) => {
            addedHouseId = apiHouseid;
            return postHouseImage(imageData, addedHouseId);
          })
          .then(() => {
            if (addedHouseId) {
              updateStore(addedHouseId);
              resolve(addedHouseId);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    editHouse(formData, imageData, id) {
      return new Promise((resolve, reject) => {
        const updateStore = (id) => {
          getHouseById(id).then((fullAddedInfo) => {
            this.currentHouse = fullAddedInfo[0];
            const houseIndex = this.house.findIndex((house) => house.id === id);
            if (houseIndex !== -1) {
              this.house[houseIndex] = fullAddedInfo[0];
            }
          });
        };
        const editedHouse = editHousebyID(formData, id);

        editedHouse
          .then(() => {
            if (editedHouse && imageData) {
              postHouseImage(imageData, id).then(() => {
                updateStore(id);
                resolve(id);
              });
            } else if (editedHouse) {
              updateStore(id);
              resolve(id);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    resetMyViewedHouse() {
      this.myViewedHouse = [];
    },
    resetMyListedHouse() {
      this.myListedHouse = [];
    },
  },
});
