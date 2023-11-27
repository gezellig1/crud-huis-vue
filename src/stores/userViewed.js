import { defineStore } from "pinia";

export const useUserViewedStore = defineStore({
  id: "userViewed",
  state: () => ({
    userViewedId: [],
  }),
  actions: {
    addViewedId(idref) {
      //localStorage.removeItem("userViewedId");
      const id = parseInt(idref);
      const storedViewedId =
        JSON.parse(localStorage.getItem("userViewedId")) || [];
      this.userViewedId = storedViewedId.map(Number) || [];
      if (!this.userViewedId?.includes(id) && !(id === 0)) {
        this.userViewedId.push(id);
        localStorage.setItem("userViewedId", JSON.stringify(this.userViewedId));
        return this.userViewedId;
      }
    },
    fetchViewedId() {
      const storedViewedId =
        JSON.parse(localStorage.getItem("userViewedId")) || [];
      this.userViewedId = storedViewedId.map(Number) || [];
      return this.userViewedId;
    },

    removeViewedId(staledId) {
      const storedViewedId =
        JSON.parse(localStorage.getItem("userViewedId")) || [];
      const existingArray = storedViewedId.map(Number) || [];
      this.userViewedId = existingArray.filter(
        (existingId) => existingId !== staledId
      );
      localStorage.setItem("userViewedId", JSON.stringify(this.userViewedId));
      return this.userViewedId;
    },
  },
});
