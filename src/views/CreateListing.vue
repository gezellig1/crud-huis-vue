<script setup>
import FormTemplate from "../components/FormTemplate.vue";
import { useHouseStore } from "../stores/houses";
import { useRouter } from "vue-router";

const store = useHouseStore();
const router = useRouter();

const createListing = (formData, imageFormData) => {
  store.addHouse(formData, imageFormData).then((newId) => {
    router.push({ name: "HouseDetails", params: { id: newId } });
  });
};
</script>

<template>
  <FormTemplate
    :onSubmit="createListing"
    viewMode="create"
  />
</template>

