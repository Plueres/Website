<template>
    <div class="Dashboard">
        <HeaderComponent />
        <h1>Movies Page</h1>
        <p>This is the Movieslist page.</p>

        <!-- Display raw JSON output -->
        <!-- <div v-if="data">
            <h2>Raw API Response:</h2>
            <pre>{{ data }}</pre>
        </div> -->

        <div v-if="data && data.length">
            <h2>Movies:</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Tags</th>
                        <th>Played</th>
                        <th>Finished</th>
                        <th>Personal Rating</th>
                        <th>Review</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in data" :key="index">
                        <td>{{ item.id }}</td>
                        <td>{{ item.title }}</td>
                        <td>{{ item.tags }}</td>
                        <td>{{ item.played }}</td>
                        <td>{{ item.finished }}</td>
                        <td>{{ item.personal_rating }}</td>
                        <td>{{ item.review }}</td>
                        <!-- !Does not work yet -->
                        <td><router-link>Edit</router-link></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script>
import HeaderComponent from '@/components/cms/HeaderComponent.vue';
export default {
    components: {
        HeaderComponent // Register the Header component
    },
    name: 'GetMovies',
    data() {
        return {
            data: null,
            id: '',
            name: '',
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                const response = await fetch(`${process.env.API_ORIGIN}/api/movies/get`, {
                    headers: {
                        'x-api-key': process.env.API_KEY
                    }
                });
                const result = await response.json();
                this.data = result;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
    },
};
</script>

<style scoped>
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
    background-color: #f2f2f2;
    text-align: left;
}
</style>