<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useHouseStore } from "../stores/houses";
import { useUserViewedStore } from "../stores/userViewed";
import BaseButtonBack from "../components/BaseButtonBack.vue";
import DeleteListing from "../components/DeleteListing.vue";

const store = useHouseStore();
const userViewedStore = useUserViewedStore();
const route = useRoute();
const houseId = ref(route.params.id);
const currentHouseId = ref(null);
const showDeletePopup = ref(false);

const currentHouse = computed(() => store.currentHouse);

onMounted(() => {
  store.fetchHouseById(houseId.value);
  userViewedStore.addViewedId(houseId.value);
});
const router = useRouter();
const showEditListing = (id) => {
  router.push({ name: "EditListing", params: { id: id } });
};

const formatPrice = (price) => {
  return `${price.toLocaleString("nl-NL", { minimumFractionDigits: 0 })}`;
};

const showDeletePopupForHouse = (id) => {
  currentHouseId.value = id;
  showDeletePopup.value = true;
};

const handleConfirmDelete = (id) => {
  event.stopPropagation();
  store.deleteHouse(id);
  router.replace({ path: "/" });
  showDeletePopup.value = false;
};

const handleCancelDelete = () => {
  event.stopPropagation();
  showDeletePopup.value = false;
};
</script>

<template>
  <div id="container-house-details">
    <div class="desktop-only">
      <BaseButtonBack :color="'grey'" />
    </div>
    <!-- detail card here  -->
    <div
      id="house-card-list"
      v-for="card in currentHouse"
      :key="card.id"
    >

      <div id="container-house-card">
        <div id="container-btn-mobile-only">
          <BaseButtonBack :color="'white'" />
          <div v-if="card.madeByMe">
            <button
              class="icon"
              v-on:click.stop="showEditListing(card.id)"
            ><img
                src="../assets/ic_edit_white@3x.png"
                alt="button to edit listing"
                class="icon"
              ></button>
            <button
              class="icon"
              v-on:click.stop="showDeletePopupForHouse(card.id)"
            ><img
                src="../assets/ic_delete_white@3x.png"
                alt="button to delete listing"
                class="icon"
              >
            </button>
          </div>

        </div>
        <div id="house-card-image">
          <img
            v-bind:src="card.image"
            alt=""
          />
        </div>
        <div id="house-card-info">
          <div id="house-card-title">
            <h1>{{ card.location.street || "" }} {{ card.location.houseNumber || "" }} {{ card.location.houseNumberAddition || "" }} </h1>

            <div
              v-if="card.madeByMe"
              id="container-btn-desktop-only"
            >
              <button
                class="icon"
                v-on:click.stop="showEditListing(card.id)"
              ><img
                  src="../assets/ic_edit@3x.png"
                  alt="button to edit listing"
                  class="icon"
                ></button>
              <button
                class="icon"
                v-on:click.stop="showDeletePopupForHouse(card.id)"
              ><img
                  src="../assets/ic_delete@3x.png"
                  alt="button to delete listing"
                  class="icon"
                >
              </button>
            </div>
          </div>

          <div class="house-card-info-group">
            <img
              class="icon"
              src="../assets/ic_location@3x.png"
              alt="location"
            >
            <span>{{ card.location.zip }} {{ card.location.city }}</span>
          </div>

          <div class="house-card-info-group">

            <img
              class="icon"
              src="../assets/ic_price@3x.png"
              alt="price"
            >
            <span>{{ formatPrice(card.price) }}</span>
            <img
              class="icon"
              src="../assets/ic_size@3x.png"
              width=20
              alt="size"
            >
            <span>{{ card.size }} m2</span>
            <img
              class="icon"
              src="../assets/ic_construction_date@3x.png"
              alt="size"
            >
            <span>Build in {{card.constructionYear}}</span>

          </div>

          <div class="house-card-info-group">
            <img
              class="icon"
              src="../assets/ic_bed@3x.png"
              alt="bedroom"
            >
            <span> {{ card.rooms.bedrooms }}</span>
            <img
              class="icon"
              src="../assets/ic_bath@3x.png"
              alt="bathroom"
            >
            <span> {{ card.rooms.bathrooms }}</span>

            <img
              class="icon"
              src="../assets/ic_garage@3x.png"
              alt="garage"
            >
            <span v-if="!card.hasGarage">No</span>
            <span v-else>Yes</span>
          </div>

          <div>
            <p> {{card.description}}</p>
          </div>
        </div>
      </div>
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
/* ============
   House details container
   ============ */
#container-house-details {
  padding-left: 10rem;
  padding-right: 10rem;
  padding-top: 6rem;
  padding-bottom: 4rem;
}

/* ============
  Desktop/mobile menu
   ============ */

#container-btn-mobile-only {
  display: none;
}
#house-card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#container-house-card {
  display: flex;
  flex-direction: column;
  background-color: var(--background-1);
  max-width: 56vw;

  overflow: hidden;
}

#house-card-image img {
  max-height: 50vh;
}

#house-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

#house-card-info {
  padding-top: 0;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: var(--background-2);
  font-size: 1rem;
  font-family: "Open Sans", sans-serif;
}
#house-card-info img {
  width: 1rem;
}

.house-card-info-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 0.5rem;
  color: var(--text-secondary);
}

p {
  color: var(--text-secondary);
  padding-bottom: 2rem;
  font-size: 1.125rem;
}

@media only screen and (max-width: 60rem) {
  /* ============
   House details container
   ============ */
  #container-house-details {
    padding: 0;
  }

  /* ============
  Desktop/mobile menu
   ============ */

  #container-btn-desktop-only,
  #container-btn-back {
    display: none;
  }

  #container-house-card {
    position: relative;
    min-width: 100%;
  }

  #container-btn-mobile-only {
    position: absolute;
    width: 95%;
    display: flex;
    justify-content: space-between;
    margin-left: 1.5rem;
    margin-top: 1rem;
  }

  /* ============
  Header
   ============ */

  #house-card-list {
    padding-top: 0;
  }

  #house-card-image {
    min-width: 100%;
  }

  #house-card-info {
    border-radius: 1rem;
    min-height: 100%;
  }

  p,
  span {
    font-size: 0.75rem;
  }
}
</style>


