<template>
  <HeaderComponent />
  <div class="Dashboard">
    <h3>Lists</h3>
    <div class="folders">
      <a href="dashboard/games"
        ><div class="folder"><h3>Games</h3></div></a
      >
      <a href="dashboard/movies"
        ><div class="folder"><h3>Movies</h3></div></a
      >
      <a href="dashboard/shows"
        ><div class="folder"><h3>Shows</h3></div></a
      >
    </div>
    <h3>To-Do List:</h3>
    <div v-if="data">
      <!-- <h2>API Response:</h2>
            <div v-for="(value, key) in data" :key="key">
                <h3>{{ key }}</h3>
                <table>
                    <thead>
                        <tr>
                            <th v-for=" (subValue, subKey) in value[0]" :key="subKey">{{ subKey }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in value" :key="index">
                            <td v-for="(subValue, subKey) in item" :key="subKey">{{ subValue }}</td>
                        </tr>
                    </tbody>
                </table>
            </div> -->

      <!-- <pre>{{ data }}</pre> -->
    </div>
    <div v-else>
      <p>{{ loading }}</p>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "@/components/cms/HeaderComponent.vue";
export default {
  components: {
    HeaderComponent, // Register the Header component
  },
  data() {
    return {
      data: null,
      loading: "",
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        this.loading = "Loading...";
        const response = {};
        // await fetch(`${process.env.API_ORIGIN}/api/get-lists`, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'x-api-key': process.env.API_KEY, // Ensure this is set correctly
        //     },
        // });
        if (response.status === 200) {
          const result = await response.json();
          this.data = result.lists;
        } else {
          this.loading = "There was an error retrieving the data";
        }
        console.log("Response:", this.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        this.loading = "Could not retrieve the data";
        console.log("API_ORIGIN:", process.env.API_ORIGIN);
        throw new Error("Network response was not ok");
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/_variables";

.Dashboard {
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #fcfcfc;
  text-align: left;
}

.folders {
  display: grid;
  grid-template: auto / repeat(2, 1fr);
  justify-items: stretch;
  gap: 1rem;
  a {
    text-decoration: none;
    transition: all 0.3s;
    color: #555;
    .folder {
      border: 5px solid #ddd;
      padding: 20px;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s;
      aspect-ratio: 1 / 1; /* Ensures the height and width are the same */
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        background-color: $primary-color;
        & h3 {
          color: $secondary-color;
        }
      }
      h3 {
        margin: 0;
      }
    }
  }
}
@media (min-width: $tablet-min-width) {
  .folders {
    grid-template: auto / repeat(3, 1fr);
  }
}
</style>
