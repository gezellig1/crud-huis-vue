<script setup>
import { defineProps, defineEmits } from "vue";

const emit = defineEmits(["confirmDelete", "cancelDelete"]);
const props = defineProps({
  showPopup: {
    type: Boolean,
  },
  id: {
    type: Number,
  },
});

const confirmDelete = () => {
  emit("confirmDelete", props.id);
};

const cancelDelete = () => {
  emit("cancelDelete");
};
</script>

<template>
  <div
    id="container-delete-listing"
    v-if="showPopup"
  >
    <div id="overlay-delete-popup"></div>
    <div id="container-delete-popup">

      <h1>Delete listing</h1>
      <span>Are you sure you want to delete this listing?</span>
      <span id="end-warning">This action cannot be undone.</span>
      <button
        class="btn"
        id="btn-delete"
        v-on:click="confirmDelete"
      >YES, DELETE</button>
      <button
        class="btn "
        id="btn-back"
        v-on:click="cancelDelete"
      >GO BACK</button>
    </div>
  </div>

</template>


<style scoped>
#overlay-delete-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 20%;
  z-index: 1000;
}

#container-delete-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1rem;
  max-width: 56rem;
  padding: 2rem 6rem;
  text-align: center;
}

#end-warning {
  padding-bottom: 2rem;
}

.btn#btn-delete,
.btn#btn-back {
  width: 100%;
  margin: 0.8rem;
  min-width: 20rem;
}

.btn#btn-back {
  background-color: var(--secondary);
}

@media only screen and (max-width: 60rem) {
  #container-delete-popup {
    padding: 2rem 2rem;
  }
}
</style>