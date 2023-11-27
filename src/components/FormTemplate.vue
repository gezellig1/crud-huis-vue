<script setup>
import { ref, computed, defineProps } from "vue";
import { useRouter } from "vue-router";
import { useHouseStore } from "../stores/houses";
import { formAPIformat, flattenObject } from "../utils/data";
import BaseButtonBack from "../components/BaseButtonBack.vue";

// Handle reactivity
const store = useHouseStore();
const props = defineProps({
  onSubmit: Function,
  id: [Number, String],
  viewMode: {
    type: String,
    required: true,
    validator: (value) => ["create", "edit"].includes(value),
  },
});
const form = ref({
  hasGarage: "",
  streetName: "",
  houseNumber: "",
  zip: "",
  city: "",
  price: "",
  size: "",
  bedrooms: "",
  bathrooms: "",
  constructionYear: "",
  description: "",
});

// Handle routing
const router = useRouter();
const goToHouseDetails = (id) => {
  router.push({ name: "HouseDetails", params: { id: id } });
};

const titleText = computed(() => {
  return props.viewMode === "create" ? "Create new listing" : "Edit listing";
});
const buttonText = computed(() => {
  return props.viewMode === "create" ? "POST" : "SAVE";
});

// handle image
const imageExist = ref("");
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // for display image only
    form.value.image = URL.createObjectURL(file);
    // create new formdata as different api endpoint
    const imageData = new FormData();
    imageData.append("image", file);
    imageExist.value = imageData;
  }
};

const removeImage = () => {
  // for posted image
  imageExist.value = "";
  // for display image only
  form.value.image = null;
  document.getElementById("preview-image").value = "";
};

//Handle invalid input layout & validation
const blurredFields = ref({
  streetName: false,
  houseNumber: false,
  zip: false,
  city: false,
  price: false,
  size: false,
  hasGarage: false,
  bedrooms: false,
  bathrooms: false,
  constructionYear: false,
  description: false,
});
const hasBlurredFields = computed(() => {
  return Object.values(blurredFields.value).some((val) => val);
});

const handleBlur = (field, event) => {
  const inputValue = event.target.value;
  if (field === "zip") {
    const regeZipcode = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i;
    blurredFields.value[field] = !regeZipcode.test(inputValue);
  } else if (field === "constructionYear") {
    const valid = inputValue > 1901;
    blurredFields.value[field] = !valid;
  } else {
    blurredFields.value[field] = !inputValue.trim();
  }
};

// Data only restructured when edited form, improve web performance
const editFormInfoRender = async () => {
  const id = parseInt(props.id);
  if (props.id) {
    const response = await store.fetchHouseById(id);
    const flatObject = flattenObject(response);
    form.value = { ...form.value, ...flatObject };
  }
};
editFormInfoRender();

//Handle submit
const filledTextNumInput = computed(() => {
  return Object.entries(form.value).every(([key, val]) => {
    if (key === "numberAddition") return true; //optional, excl when get API data in edit mode.
    return val;
  });
});

const handleSubmit = async (event) => {
  if (
    filledTextNumInput.value &&
    ((imageExist.value && props.viewMode === "create") ||
      props.viewMode === "edit")
  ) {
    event.preventDefault();
    const image = imageExist.value;
    const editedformData = formAPIformat(form.value);
    props.onSubmit(editedformData, image, props.id);
  }
};
</script>

<template>
  <div id="container-form-template">
    <div id="container-form">
      <div id="header-form">
        <div
          id="container-btn-back"
          v-if="props.viewMode === 'create'"
        >
          <BaseButtonBack :color="'grey'" />
        </div>

        <div
          id="container-btn-back"
          v-if="props.viewMode === 'edit'"
        >
          <div id="container-btn-mobile-only">
            <button
              id="btn-back-details"
              class="icon"
              v-on:click="goToHouseDetails"
            >
              <img
                src="../assets/ic_back_grey@3x.png"
                class="icon"
              >
              <span class="desktop-only"> Back to detail page</span>
            </button>

          </div>
        </div>

        <h1>{{titleText}}</h1>

      </div>

      <form
        id="container-form-field"
        v-on:submit="handleSubmit($event)"
      >

        <div>
          <label for="streetName">Street Name*
            <input
              type="text"
              id="streetName"
              v-model="form.streetName"
              placeholder="Enter the street name"
              v-on:blur="handleBlur('streetName', $event)"
              :class="{ 'invalid-input': blurredFields.streetName }"
              required
            />
          </label>

        </div>
        <div class="group-form-field">

          <label for="houseNumber">House Number*
            <input
              type="number"
              id="houseNumber"
              placeholder="Enter house number"
              v-model="form.houseNumber"
              v-on:blur="handleBlur('houseNumber', $event)"
              :class="{ 'invalid-input': blurredFields.houseNumber }"
              required
            />
          </label>

          <label for="numberAddition">Addition (optional)
            <input
              type="text"
              id="numberAddition"
              placeholder="e.g. A"
              v-model="form.numberAddition"
            />
          </label>
        </div>

        <div>
          <label for="postalCode">Postal code*
            <input
              type="text"
              id="zip"
              placeholder="e.g.1000 AA"
              v-model="form.zip"
              v-on:blur="handleBlur('zip', $event)"
              pattern="/^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i"
              :class="{ 'invalid-input': blurredFields.zip }"
              required
            />
          </label>
        </div>
        <div>
          <label for="city">City*</label>
          <input
            type="text"
            id="city"
            placeholder="e.g. Utrecht"
            v-model="form.city"
            v-on:blur="handleBlur('city', $event)"
            :class="{ 'invalid-input': blurredFields.city }"
            required
          />
        </div>

        <div>
          <label
            for="image-handler"
            id="image-handler"
          >
            Upload picture (PNG or JPG)*
            <div
              v-if="form.image"
              id="container-image"
            >
              <img
                :src="form.image"
                alt="Preview"
                id="preview-image"
              >
              <button
                v-on:click="removeImage"
                id="btn-delete"
              ><img src="@/assets/ic_clear_white@3x.png"></button>
            </div>

            <div
              v-else
              id="container-image-upload"
              :class="[{ 'invalid-input': filledTextNumInput && !imageExist?.value }]"
            >
              <label
                for="image"
                id="label-upload"
              >
                <span id="icon-upload">+</span>
              </label>
              <input
                type="file"
                id="image"
                accept=".jpg,.png"
                v-on:change="handleImageUpload"
                required
              >

            </div>
          </label>
        </div>

        <div>
          <label for="price">Price*</label>
          <input
            type="text"
            id="price"
            placeholder="e.g. €150.000"
            v-model="form.price"
            v-on:blur="handleBlur('price', $event)"
            :class="{ 'invalid-input': blurredFields.price }"
            required
          />
        </div>

        <div class="group-form-field">
          <label for="size">Size (m²)*
            <input
              type="number"
              id="size"
              placeholder="e.g.60"
              v-model="form.size"
              v-on:blur="handleBlur('size', $event)"
              :class="{ 'invalid-input': blurredFields.size }"
              required
            />
          </label>

          <label for="garage">Garage*
            <select
              id="hasGarage"
              v-model="form.hasGarage"
              v-on:blur="handleBlur('hasGarage', $event)"
              :class="{ 'invalid-input': blurredFields.hasGarage }"
              required
            >
              <option
                disabled
                value=""
              >Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label>

        </div>
        <div class="group-form-field">
          <label for="bedrooms">Bedrooms*
            <input
              type="number"
              id="bedrooms"
              placeholder="Enter amount"
              v-model="form.bedrooms"
              v-on:blur="handleBlur('bedrooms', $event)"
              :class="{ 'invalid-input': blurredFields.bedrooms }"
              required
            />
          </label>
          <label for="bathrooms">Bathrooms*
            <input
              type="number"
              id="bathrooms"
              placeholder="Enter amount"
              v-model="form.bathrooms"
              v-on:blur="handleBlur('bathrooms', $event)"
              :class="{ 'invalid-input': blurredFields.bathrooms }"
              required
            />
          </label>
        </div>
        <div>
          <label for="constructionYear">Construction Year*
            <input
              type="number"
              id="constructionYear"
              v-model="form.constructionYear"
              placeholder="e.g.1901"
              v-on:blur="handleBlur('constructionYear', $event)"
              :class="{ 'invalid-input': blurredFields.constructionYear }"
              required
            />
          </label>
        </div>
        <div>
          <label for="description">Description*
            <textarea
              id="description"
              placeholder="Enter description"
              v-model="form.description"
              rows="4"
              cols="50"
              v-on:blur="handleBlur('description', $event)"
              :class="{ 'invalid-input': blurredFields.description }"
              required
            ></textarea>
          </label>
        </div>

        <div id="container-btn-submit">
          <span
            v-if="!filledTextNumInput"
            :class="['error-text-hidden', { 'error-text': hasBlurredFields }]"
          >Required field missing or wrong format</span>
          <button
            class="btn"
            :class="{'btn-inactive': !filledTextNumInput && !imageExist?.value}"
            type="submit"
          >{{buttonText}}</button>

        </div>

      </form>
    </div>
  </div>
</template>

<style scoped>
/* ============
   Form container
  ============ */
#container-form-template {
  background-image: url("@/assets/img_background@3x.png");
  background-size: cover;
  background-position: center;
  padding-top: 6rem;
  padding-left: 10rem;
  padding-bottom: 2rem;
}

#container-form {
  max-width: 37vw;
  display: grid;
  box-sizing: border-box;
}

#header-form {
  display: flex;
  flex-direction: column;
}

h1 {
  margin-top: 0;
}

button#btn-back-details.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}
button#btn-back-details img {
  display: inline-flex;
  margin-right: 0.5rem;
}

/* ============
  Form input field
  ============ */

input,
select,
textarea {
  font-family: "Open Sans", sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  margin-top: 0.5rem;
  margin-bottom: 1rem;

  border: #ffffff;
  border-radius: 0.5rem;
  width: 100%;
  padding: 1rem;
  background-color: #ffffff;

  color: var(--text-secondary);
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

textarea {
  min-width: 100%;
  min-height: 10rem;
  resize: none;
}

::placeholder {
  padding-left: 0.3rem;
}

.group-form-field {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  gap: 0.5rem;
}

/* Start: image handler */
#preview-image label {
  display: block;
}
#container-image {
  position: relative;
  width: 6.5rem;
  height: 6.5rem;
  display: block;
  margin-bottom: 1rem;
}
#preview-image {
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  object-fit: cover;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}

#btn-delete {
  all: unset;
}

#btn-delete img {
  position: absolute;
  top: 0;
  right: -1rem;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
}

#container-image-upload {
  width: 6.5rem;
  height: 6.5rem;
  border: 2px dashed #999;
  display: grid;
  place-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

#image {
  display: none;
}

#label-upload {
  display: block;
}

#icon-upload {
  padding: 2rem;
  font-size: 48px;
  cursor: pointer;
}
/* End: image handler */

/* Start: remove spin buttons next to fields */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* End: remove spin buttons next to fields */

#container-btn-submit {
  display: grid;
}

#container-btn-submit button {
  min-width: 18vw;
  justify-self: right;
}

.btn-inactive {
  opacity: 0.5;
}

/* Start: invalid input */
#container-form-field .invalid-input {
  border: 0.1rem solid red;
}

#container-form-field .invalid-input::placeholder {
  color: red;
}

.error-text-hidden {
  display: none;
}

.error-text {
  display: inline-block;
  font-family: "Montserrat", sans-serif;
  font-size: 0.875rem;
  font-style: italic;
  color: red;
  margin-bottom: 0.5rem;
}
/* End: invalid input */

@media only screen and (max-width: 60rem) {
  /* ============
   Form container
   ============ */
  #container-form-template {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1rem;
    padding-bottom: 6rem;
  }
  #container-form {
    max-width: none;
  }

  #header-form {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  #header-form h1 {
    margin-right: auto;
    margin-left: auto;
  }

  /* ============
   Form input field
   ============ */

  label {
    font-size: 0.75rem;
  }

  input {
    font-size: 0.75rem;
  }

  .error-text {
    font-size: 0.75rem;
  }

  #header-form {
    grid-template-columns: 2rem auto;
  }

  #container-btn-submit button {
    max-width: none;
    justify-self: auto;
  }
}
</style>
