<script setup>
import FormTemplate from "../components/FormTemplate.vue";
import { useHouseStore } from "../stores/houses";
import { useRouter } from "vue-router";

const store = useHouseStore();
const router = useRouter();
const editListing = async (formData, id, imageFormData) => {
  const results = await store.editHouse(formData, id, imageFormData);
  await router.push({ name: "HouseDetails", params: { id: results } });
};
</script>

<template>
  <FormTemplate
    :onSubmit="editListing"
    viewMode="edit"
  />
</template>