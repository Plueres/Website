<template>
  <div class="toast">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
    };
  },

  mounted() {
    this.checkMessageType();
  },

  methods: {
    showToast(message, messageType) {
      console.log("Message:", message);
      console.log("Message type:", messageType);
      this.checkMessageType(messageType);
      this.message = message;
      this.$el.style.margin = "1rem";
      this.$el.style.padding = "1rem 2rem";
      setTimeout(() => {
        this.message = "";
        this.$el.style.margin = 0;
        this.$el.style.padding = 0;
      }, 10000);
    },
    checkMessageType(messageType) {
      switch (messageType) {
        case "error":
          this.$el.style.backgroundColor = "#ff0000";
          break;
        case "warning":
          this.$el.style.backgroundColor = "#ffae42";
          break;
        case "info":
          this.$el.style.backgroundColor = "#007bff";
          break;
        case "success":
          this.$el.style.backgroundColor = "#28a745";
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/_variables";
.toast {
  border-radius: 5px;
  box-shadow: 0 0 0 3px $accent-color;
  z-index: 20;
}
p {
  color: white;
  font-size: 1.2rem;
  padding: 0;
  margin: 0;
}
</style>
