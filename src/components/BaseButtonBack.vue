<script setup>
import backGrey from "../assets/ic_back_grey@3x.png";
import backWhite from "../assets/ic_back_white@3x.png";
import { useRouter } from "vue-router";
const router = useRouter();
const goToHouseOverview = () => {
  router.push("/");
};
const props = defineProps({
  color: {
    type: String,
    default: "grey",
  },
});

const backButtonIcon = props.color === "grey" ? backGrey : backWhite;
</script>


<template>
  <div id="container-btn">
    <div id="btn-back">
      <button
        class="icon"
        v-on:click="goToHouseOverview"
      >
        <img
          :src="backButtonIcon"
          class="icon"
        >
        <span class="desktop-only">Back to Overview</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
button.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}
#btn-back img {
  display: inline-flex;
  margin-right: 0.5rem;
}
</style>