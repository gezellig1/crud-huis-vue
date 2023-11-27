import { createRouter, createWebHistory } from "vue-router";
import HouseOverview from "../views/HouseOverview.vue";
import CreateListing from "../views/CreateListing.vue";
import EditListing from "../views/EditListing.vue";
import HouseDetails from "../views/HouseDetails.vue";
import MyViewed from "../views/MyViewed.vue";
import MyListing from "../views/MyListing.vue";

const routes = [
  {
    path: "/",
    name: "HouseOverview",
    component: HouseOverview,
  },

  {
    path: "/create-listing",
    name: "CreateListing",
    component: CreateListing,
  },
  {
    path: "/edit-listing/:id",
    name: "EditListing",
    component: EditListing,
    props: true,
  },
  {
    path: "/house-details/:id",
    name: "HouseDetails",
    component: HouseDetails,
  },
  {
    path: "/my-viewed",
    name: "My Viewed",
    component: MyViewed,
  },
  {
    path: "/my-listing",
    name: "My Listing",
    component: MyListing,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
