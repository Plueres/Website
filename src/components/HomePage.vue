<template>
  <div class="home">
    <Header />
    <h3>Hey! I'm</h3>
    <h1>Rick Slierendregt</h1>
    <h5>Software Developer</h5>
    <!--
     ! This should have another div containing both svg's. 
     ! There should be a way to make them smoothly overlap without having ugly code like transform: translate to overlap them 
     * also the second svg should be replaced by the footer
     ? think of a different way to make the svg's overlap
     -->
    <div v-if="mobile" class="svg-container-main">
      <svg
        width="1440"
        height="2756"
        viewBox="0 0 1440 2756"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-1 463C-1 463 129.94 658.61 232.5 618.5C333.5 579 346 439.5 464 396.5C582 353.5 667.5 516.5 762 463C856.5 409.5 976.5 221.5 976.5 0H1441V1781V2756H388C388 2756 825.5 2729.5 619 2588.5C430.497 2459.79 373.354 2688.94 285.5 2353.5C234.429 2158.5 -1 2479.5 -1 2479.5V463Z"
          fill="#8195FF"
        />
      </svg>
    </div>
    <div v-else class="svg-container-main">
      <svg
        width="360"
        height="3600"
        viewBox="0 720 360 3000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 468.196C0 468.196 130.94 643.173 233.5 582.687C334.5 523.122 347 412.758 465 347.915C583 283.072 668.5 778.873 763 698.196C857.5 617.519 977.5 334.018 977.5 0H1442V2685.72V4156H357C357 4156 568.142 4136.01 391.5 3898C285 3754.5 196 4033.96 219.5 3751C244.202 3453.57 0 3739.04 0 3739.04V468.196Z"
          fill="#8195FF"
        />
      </svg>
    </div>
    <div v-if="mobile" class="svg-container-footer">
      <svg
        width="1440"
        height="2756"
        viewBox="0 0 1440 2756"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-1 463C-1 463 129.94 658.61 232.5 618.5C333.5 579 346 439.5 464 396.5C582 353.5 667.5 516.5 762 463C856.5 409.5 976.5 221.5 976.5 0H1441V1781V2756H388C388 2756 825.5 2729.5 619 2588.5C430.497 2459.79 373.354 2688.94 285.5 2353.5C234.429 2158.5 -1 2479.5 -1 2479.5V463Z"
          fill="#8195FF"
        />
      </svg>
    </div>
    <div v-else class="svg-container-footer">
      <svg
        width="360"
        height="3600"
        viewBox="0 720 360 3000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 468.196C0 468.196 130.94 643.173 233.5 582.687C334.5 523.122 347 412.758 465 347.915C583 283.072 668.5 778.873 763 698.196C857.5 617.519 977.5 334.018 977.5 0H1442V2685.72V4156H357C357 4156 568.142 4136.01 391.5 3898C285 3754.5 196 4033.96 219.5 3751C244.202 3453.57 0 3739.04 0 3739.04V468.196Z"
          fill="#8195FF"
        />
      </svg>
    </div>
    <div></div>
    <p>
      What Should Be On a Web Developer Portfolio? <br />
      Include at least these in your web developer portfolio: <br />
      – Contact information, including relevant social media accounts <br />
      – Short bio and your photo <br />
      – Relevant experience and skills with context <br />
      – Personal projects <br />
      – Documented source code <br />
      – Education <br />
      – Awards/recognition <br />
      – Downloadable web developer resume
    </p>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import Header from "@/components/HeaderComponent.vue";

export default {
  name: "HomePage",
  components: {
    Header,
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/_variables";

.home {
  background-color: $secondary-color;
  z-index: 16;
}
.svg-container-main {
  display: flex;
  justify-content: flex-start; /* Align to the left */
  align-items: center; /* Center vertically */
  width: 100%; /* Full width */
  overflow: hidden; /* Hide overflow */
  z-index: 18; /* Ensure the SVG is on top */
}
.svg-container-footer {
  display: flex;
  justify-content: flex-end; /* Align to the right */
  align-items: center; /* Center vertically */
  width: 100%; /* Full width */
  overflow: hidden; /* Hide overflow */
  z-index: 16;
}

.svg-container svg {
  max-width: 100%;
  height: auto; /* Maintain aspect ratio */
}
</style>
