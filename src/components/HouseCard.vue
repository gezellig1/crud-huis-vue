<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  card: {
    type: Object,
  },
});

const emit = defineEmits(["showEditListing", "showDeletePopup"]);

const showEditListing = () => {
  emit("showEditListing", props.card.id);
};

const showDeletePopup = () => {
  emit("showDeletePopup", props.card.id);
};

// convert numbers into localized number format
const formatPrice = (price) => {
  const formattedPrice = `€${price.toLocaleString("nl-NL", {
    minimumFractionDigits: 0,
  })}`;
  return formattedPrice;
};
</script>

<template>
  <div id="house-card">
    <div id="house-card-image">
      <img
        v-bind:src="props.card.image"
        alt=""
      />
    </div>
    <div id="house-card-info">
      <div id="house-card-title">
        <div>
          <h2>{{ props.card.location.street || "" }} {{ props.card.location.houseNumber || "" }} {{ props.card.location.houseNumberAddition || "" }} </h2>
        </div>
        <div
          id="container-btn-edit-delete"
          v-if="props.card.madeByMe"
        >
          <button
            class="icon"
            v-on:click.stop="showEditListing(props.card.id)"
          ><img
              src="../assets/ic_edit@3x.png"
              alt="Edit listing"
              class="icon"
            ></button>
          <button
            class="icon"
            v-on:click.stop="showDeletePopup(props.card.id)"
          ><img
              src="../assets/ic_delete@3x.png"
              alt="Delete listing"
              class="icon"
            ></button>
        </div>
      </div>
      <div id="house-card-price">
        <span>{{ formatPrice(props.card.price) }}</span>
      </div>
      <div id="house-card-address">{{ props.card.location.zip }} {{ props.card.location.city }}</div>
      <div id="house-card-room">
        <img
          class="icon"
          src="../assets/ic_bed@3x.png"
          alt="bedroom"
        >
        <span> {{ props.card.rooms.bedrooms }}</span>
        <img
          class="icon"
          src="../assets/ic_bath@3x.png"
          alt="bathroom"
        >
        <span> {{ props.card.rooms.bathrooms }}</span>

        <img
          class="icon"
          src="../assets/ic_size@3x.png"
          alt="size"
        >
        <span> {{ props.card.size}} m²</span>
      </div>
    </div>

  </div>
</template>

<style scoped>
h2 {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

#house-card {
  width: 100%;
  display: grid;
  border-radius: 0.75rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
  margin-bottom: 1rem;
  overflow: hidden;
  font-family: "Open Sans", sans-serif;
  font-size: 1rem;
  font-weight: 600;

  grid-template-columns: 11.5rem auto;
  background-color: var(--background-2);
}

#house-card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#house-card-image {
  padding: 1.5rem;
  width: 8rem;
  height: 8rem;
}

#house-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.75rem;
}

#house-card-info {
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-right: 1rem;
}

#house-card-address {
  color: var(--text-secondary);
  font-weight: 300;
  padding: 0.5rem;
  padding-left: 0;
}

#house-card-room {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-secondary);
  font-weight: 400;
  padding: 0.25rem;
  padding-left: 0;
}

@media only screen and (max-width: 60rem) {
  #house-card {
    grid-template-columns: 9rem auto;
  }
  #house-card-info {
    font-size: 0.75rem;
  }
  #house-card-image {
    padding: 1rem;
    width: 7rem;
    height: 7rem;
  }
  h2 {
    margin-top: 0.3rem;
  }
}
</style>