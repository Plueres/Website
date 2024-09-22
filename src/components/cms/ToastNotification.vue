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
              this.$el.style.backgroundColor = "rgba(255, 0, 0, 0.3)";
              this.$el.querySelector('p').style.color = "rgb(64, 0, 0)"; // Darkened even more
              break;
          case "warning":
              this.$el.style.backgroundColor = "rgba(255, 255, 0, 0.3)";
                this.$el.querySelector('p').style.color = "rgb(128, 128, 0)"; // More yellow and darkened
                break;
          case "info":
              this.$el.style.backgroundColor = "rgba(0, 123, 255, 0.3)";
              this.$el.querySelector('p').style.color = "rgb(0, 60, 128)"; // Darkened even more
              break;
          case "success":
              this.$el.style.backgroundColor = "rgba(40, 167, 69, 0.3)";
              this.$el.querySelector('p').style.color = "rgb(20, 82, 34)"; // Darkened even more
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
  
}
p {
  font-size: 1.2rem;
  padding: 0;
  margin: 0;
}
</style>
