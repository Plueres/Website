<template>
  <div>
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <router-link to="/">Go to Home</router-link>
    <p v-if="token">Or to the dashboard</p>
    <router-link v-if="token" to="/dashboard">Go to dashboard</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFoundPage",
  data() {
    return {
      token: null,
    };
  },
  created() {
    document.title = "404 - Page Not Found";
    this.gettoken();
  },
  methods: {
    gettoken() {
      this.token = sessionStorage.getItem("token");
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
