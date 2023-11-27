<script setup>
import AppNavbarLink from "./AppNavbarLink.vue";
</script>

<template>
  <div id="container-appnavbar">
    <div
      class="navbar"
      id="container-navbar-desktop"
    >
      <img
        id="logo"
        src="/favicon-home.png"
        alt="Logo"
      />
      <nav>
        <AppNavbarLink to="/">Houses</AppNavbarLink>
        <AppNavbarLink to="/my-viewed">My Viewed</AppNavbarLink>
        <AppNavbarLink to="/my-listing">My Listing</AppNavbarLink>
      </nav>
    </div>

    <div
      class="navbar"
      id="container-navbar-mobile"
    >
      <nav>
        <AppNavbarLink to="/">
          <div id="house-icon"></div>
        </AppNavbarLink>
        <AppNavbarLink to="/my-viewed">
          <div id="my-icon"></div>
        </AppNavbarLink>
        <AppNavbarLink to="/my-listing">
          <div id="list-icon"></div>
        </AppNavbarLink>
      </nav>
    </div>

  </div>
</template>

<style scoped>
.navbar {
  display: none;
}

img#logo {
  width: 2rem;
}

/* ============
   Desktop navbar 
  ============ */

.navbar#container-navbar-desktop {
  top: 0;
  position: fixed;
  z-index: 9999;
  display: flex;
  justify-content: flex-start;
  background-color: var(--background-2);
  align-items: center;
  width: 100%;
  height: 4rem;
  padding-left: 10rem;
  box-sizing: border-box;
}
img {
  width: 6rem;
  padding-right: 4.5rem;
}

a {
  padding-right: 5.5rem;
}

@media only screen and (max-width: 60rem) {
  /* ============
   Mobile navbar 
  ============ */
  a {
    padding: 0;
  }
  .navbar#container-navbar-desktop {
    display: none;
  }
  .navbar#container-navbar-mobile {
    bottom: 0;
    position: fixed;
    z-index: 9999;

    background-color: var(--background-2);
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 4rem;
  }

  #container-navbar-mobile nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    width: 70%;
  }

  #container-navbar-mobile div {
    width: 1.8rem;
    height: 1.8rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: relative;
    margin: auto;
    padding: 25%vw;
  }

  /* Mobile menu icons change if active */

  #house-icon {
    background-image: url("@/assets/ic_mobile_navigarion_home@3x.png");
  }

  .active-menu #house-icon {
    background-image: url("@/assets/ic_mobile_navigarion_home_active@3x.png");
  }

  #about-icon {
    background-image: url("@/assets/ic_mobile_navigarion_info@3x.png");
  }

  .active-menu #about-icon {
    background-image: url("@/assets/ic_mobile_navigarion_info_active@3x.png");
  }

  #my-icon {
    background-image: url("@/assets/ic_mobile_navigarion_myViewed@3x.png");
  }

  .active-menu #my-icon {
    background-image: url("@/assets/ic_mobile_navigarion_myViewed_active@3x.png");
  }

  #list-icon {
    background-image: url("@/assets/ic_mobile_navigarion_myListing@3x.png");
  }

  .active-menu #list-icon {
    background-image: url("@/assets/ic_mobile_navigarion_myListing_active@3x.png");
  }
}
</style>