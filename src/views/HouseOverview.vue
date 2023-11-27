<script setup>
import { toRaw, ref, watchEffect, onMounted } from "vue";
import DeleteListing from "../components/DeleteListing.vue";
import { useRouter } from "vue-router";
import { useHouseStore } from "../stores/houses";
import HouseCard from "../components/HouseCard.vue";

// handle reactivity

const store = useHouseStore();
const sortFilterHouses = ref([]);
const sortingMethod = ref("price");
const searchQuery = ref("");
const currentHouseId = ref(null);
const showDeletePopup = ref(false);

// fetch data - fetch and searchbar
onMounted(() => {
  // store.$reset(); // reset states
  store.fetchHouse().then(() => {
    sortFilterHouses.value = store.house;
    updatesortFilterHouses();
  });
});

// handle routing
const router = useRouter();
const goToCreateListing = () => {
  router.push("/create-listing");
};
const goToHouseDetails = (id) => {
  router.push({ name: "HouseDetails", params: { id: id } });
};
const showEditListing = (id) => {
  router.push({ name: "EditListing", params: { id: id } });
};

// // handle search bar
const updatesortFilterHouses = () => {
  let housesToDisplay = [...store.house];

  if (searchQuery.value !== "") {
    housesToDisplay = housesToDisplay.filter((house) => {
      const lowerCaseSearchQuery = searchQuery.value.toLowerCase();
      const { price, size, location } = toRaw(house);
      const { city, zip, street, houseNumber } = location;
      const infoForFilter = [price, size, city, zip, street, houseNumber];
      const results = infoForFilter.some((value) =>
        value.toString().trim().toLowerCase().includes(lowerCaseSearchQuery)
      );
      return results;
    });
  }

  housesToDisplay.sort(
    (a, b) => b[sortingMethod.value] - a[sortingMethod.value]
  );
  sortFilterHouses.value = housesToDisplay;
};

const sortBy = (type) => {
  sortingMethod.value = type;
  updatesortFilterHouses();
};

const clearSearch = () => {
  searchQuery.value = "";
};

const isButtonActive = (type) => {
  return sortingMethod.value === type;
};

watchEffect(() => {
  updatesortFilterHouses();
});

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
  event.stopPropagation();
  showDeletePopup.value = false;
  router.replace({ path: "/" });
};
</script>

<template>
  <div id="container-house-overview">
    <!-- Header, search bar, sort-->
    <div id="header-house-overview">
      <div
        class="desktop-only"
        id="header-create-listing"
      >
        <h1
          class="desktop-only"
          id="header-house"
        >Houses</h1>

        <button
          class="btn desktop-only"
          id="btn-create"
          v-on:click="goToCreateListing"
        >
          <img
            src="../assets/ic_plus_white@3x.png"
            class="icon"
          > CREATE NEW</button>

      </div>

      <div
        class="mobile-only"
        id="header-create-listing"
      >
        <h1
          id="header-house"
          class="mobile-only"
        >Houses</h1>
        <button
          class="icon"
          v-on:click="goToCreateListing"
        ><img
            src="../assets/ic_plus_grey@3x.png"
            class="mobile-only"
          >
        </button>
      </div>

      <div id="header-search-bar-sort">
        <div id="search-bar">
          <img
            src="../assets/ic_search@3x.png"
            class="icon"
          >
          <input
            v-model="searchQuery"
            v-on:focus="clearSearch"
            placeholder="Search for a house..."
          />
          <button
            class="icon"
            v-on:click="clearSearch"
            v-if="searchQuery"
          >
            <img
              src="../assets/ic_clear@3x.png"
              class="mobile-only"
            >
          </button>
        </div>
        <div id="btn-sorting">
          <button
            id="btn-price"
            :class="['btn', { active: isButtonActive('price') }]"
            v-on:click="sortBy('price')"
          >Price</button>

          <button
            id="btn-size"
            :class="['btn', { active: isButtonActive('size') }]"
            v-on:click="sortBy('size')"
          >Size</button>
        </div>

      </div>
    </div>

    <!-- Number of Results : conditional render -->
    <div v-if="searchQuery !== '' && sortFilterHouses.length === 1">
      <span id="yes-result">{{ sortFilterHouses.length }} result found</span>
    </div>

    <div v-else-if="searchQuery !== '' && sortFilterHouses.length > 1">
      <span id="yes-result">{{ sortFilterHouses.length }} results found</span>
    </div>

    <div v-else-if="searchQuery !== '' && sortFilterHouses.length === 0">
      <div id="no-result">
        <img
          src="../assets/img_empty_houses@3x.png"
          alt="No results found"
          width=500
        />
        <span>No results found.</span> <span>Please try another keywords.</span>
      </div>
    </div>
    <!-- Filtered List -->
    <div
      id="container-house-card"
      v-for="card in sortFilterHouses"
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
/* ============
   House overview container and format
   ============ */

#container-house-overview {
  padding-left: 10rem;
  padding-right: 10rem;
  padding-top: 6rem;
  padding-bottom: 4rem;
}
button,
input {
  min-width: 12rem;
}

h2 {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

/* ============
   House overview header & sort
   ============ */

#header-create-listing,
#header-search-bar-sort {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

#btn-create {
  display: flex;
  align-items: center;
  justify-content: center;
}

#btn-create .icon {
  display: inline-flex;
  margin-right: 0.5rem;
}

#search-bar {
  display: grid;
  grid-template-columns: 1.25rem auto 1.25rem;
  padding: 0.5rem;
  border-radius: 0.65rem;
  background: var(--tertiary);
  min-width: 20rem;
  align-items: center;
  height: 3rem;
  box-sizing: border-box;
}

#search-bar input {
  all: unset;
  border: none;
  outline: none;
  background: var(--tertiary);
}

#btn-sorting {
  display: flex;
}

#btn-price {
  min-width: 10rem;
  border-radius: 0.75rem 0 0 0.75rem;
  background-color: var(--tertiary-2);
}

#btn-size {
  min-width: 10rem;
  border-radius: 0 0.75rem 0.75rem 0;
  background-color: var(--tertiary-2);
}

#btn-price.btn.active,
#btn-size.btn.active {
  background-color: var(--primary);
  color: font;
}

#yes-result {
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
  display: block;
  margin-top: 1rem;
}

#no-result {
  display: grid;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
}

#no-result img {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1rem;
  width: 30%;
}

#no-result span {
  margin-left: auto;
  margin-right: auto;
}

@media only screen and (max-width: 60rem) {
  /* ============
   House overview container and format
   ============ */

  #container-house-overview {
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 1rem;
    padding-bottom: 6rem;
  }

  /* ============
   House overview header & sort
   ============ */

  #header-create-listing {
    justify-content: flex-end;
  }

  #header-house {
    margin-right: auto;
    margin-left: auto;
  }

  #btn-create {
    display: none;
  }

  #header-search-bar-sort {
    flex-direction: column;
  }

  #search-bar {
    width: 100%;
    margin-bottom: 1rem;
    box-sizing: border-box;
  }

  #btn-sorting,
  #btn-price,
  #btn-size {
    width: 100%;
  }

  #btn-create-mobile-only {
    all: unset;
    outline: revert;
    height: 3rem;
    border: none;
    cursor: pointer;
  }

  #no-result img {
    width: 80%;
  }
}
</style>