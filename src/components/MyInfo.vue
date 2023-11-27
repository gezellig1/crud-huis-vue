<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import HouseCard from "./HouseCard.vue";
import DeleteListing from "./DeleteListing.vue";
import { useHouseStore } from "../stores/houses";
const store = useHouseStore();

const currentHouseId = ref(null);
const showDeletePopup = ref(false);

const props = defineProps({
  currentHouse: {
    type: Array,
  },
  viewMode: {
    type: String,
  },
});

// handle routing
const router = useRouter();
const showEditListing = (id) => {
  router.push({ name: "EditListing", params: { id: id } });
};
const goToHouseDetails = (id) => {
  router.push({ name: "HouseDetails", params: { id: id } });
};

// handle delete listing
const showDeletePopupForHouse = (id) => {
  currentHouseId.value = id;
  showDeletePopup.value = true;
};

const handleConfirmDelete = (id) => {
  event.stopPropagation();
  store.deleteHouse(id);
  showDeletePopup.value = false;
  router.replace({ path: "/" });
};

const handleCancelDelete = () => {
  showDeletePopup.value = false;
};

// handle routing --> Form route to create or edit
const titleText = computed(() => {
  return props.viewMode === "list" ? "My Listing" : "My Viewed";
});

const explainText = computed(() => {
  return props.viewMode === "list"
    ? `Listings created by me: ${props.currentHouse?.length ?? 0}`
    : `Listings seen by me: ${props.currentHouse?.length ?? 0}`;
});
</script>

<template>
  <div>

    <div>
      <h1 class="titletext">{{titleText}}</h1>
      <span>{{explainText}}</span>
    </div>

    <div
      id="house-card-list"
      v-for="card in currentHouse"
      :key="card.id"
      v-on:click="goToHouseDetails(card.id)"
    >

      <HouseCard
        :card="card"
        @showEditListing="showEditListing"
        @showDeletePopup="showDeletePopupForHouse"
      />

      <div>
        <DeleteListing
          :id="currentHouseId"
          :showPopup="showDeletePopup"
          v-on:confirmDelete="handleConfirmDelete"
          v-on:cancelDelete="handleCancelDelete"
        ></DeleteListing>
      </div>

    </div>
  </div>

</template>


<style scoped>
@media only screen and (max-width: 60rem) {
  .titletext {
    text-align: center;
  }
}
</style>