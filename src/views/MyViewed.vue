<script setup>
import { useHouseStore } from "../stores/houses";
import MyInfo from "../components/MyInfo.vue";
import { useUserViewedStore } from "../stores/userViewed";
import { onMounted, computed, toRaw } from "vue";
import { onBeforeRouteLeave } from "vue-router";
const store = useHouseStore();
const userViewedStore = useUserViewedStore();

const viewedHouse = computed(() => {
  return store.myViewedHouse;
});

onMounted(() => {
  const userViewedID = toRaw(userViewedStore.fetchViewedId());
  userViewedID.map((viewedHouseId) => {
    store.fetchMyViewedHouse(viewedHouseId).then((invalidId) => {
      if (invalidId) {
        userViewedStore.removeViewedId(invalidId);
      }
    });
  });
});

// reset states preventing error
onBeforeRouteLeave(() => {
  store.resetMyViewedHouse();
});
</script>

<template>
  <div id="container-my-view">
    <MyInfo
      :currentHouse="viewedHouse"
      viewMode="view"
    />
  </div>

</template>

<style scoped>
/* ============
   Myinfo container
   ============ */
#container-my-view {
  padding-left: 10rem;
  padding-right: 10rem;
  padding-top: 6rem;
  padding-bottom: 4rem;
}

@media only screen and (max-width: 60rem) {
  /* ============
   Myinfo container
   ============ */
  #container-my-view {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1rem;
    padding-bottom: 6rem;
  }

  #no-result img {
    width: 80%;
  }
}
</style>
