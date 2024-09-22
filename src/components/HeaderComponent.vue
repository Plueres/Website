<template>
  <header class="header">
    <div class="header-content">
      <a href="/" class="logo">
        <img
          src="https://raw.githubusercontent.com/Plueres/plueres/main/website_images/icon192.png"
          alt="Logo"
        />
      </a>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
};
</script>

<style scoped lang="scss">
@import "@/scss/_variables";

// Header
.header {
  padding: 1rem;
  position: static;
  top: 0;
  z-index: 17;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo img {
  height: 40px;
  margin-right: 1rem;
}
</style>
