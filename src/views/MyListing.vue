<script setup>
import { useHouseStore } from "../stores/houses";
import MyInfo from "../components/MyInfo.vue";
import { onMounted, computed } from "vue";
import { onBeforeRouteLeave } from "vue-router";
const store = useHouseStore();

const myListedHouse = computed(() => {
  return store.myListedHouse;
});

onMounted(() => {
  store.fetchMyListingHouse();
});

// reset states preventing error
onBeforeRouteLeave(() => {
  store.resetMyListedHouse();
});
</script>

<template>

  <div id="container-my-list">
    <MyInfo
      :currentHouse="myListedHouse"
      viewMode="list"
    />
  </div>
</template>

<style scoped>
/* ============
   Myinfo container
   ============ */
#container-my-list {
  padding-left: 10rem;
  padding-right: 10rem;
  padding-top: 6rem;
  padding-bottom: 4rem;
}

@media only screen and (max-width: 60rem) {
  /* ============
   Myinfo container
   ============ */
  #container-my-list {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1rem;
    padding-bottom: 6rem;
  }
}
</style>