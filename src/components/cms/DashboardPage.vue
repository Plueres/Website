<template>
    <div class="Dashboard">
        <h1>Dashboard Page</h1>
        <p>This is the dashboard page.</p>
        <div v-if="data && data.length">
            <h2>API Response:</h2>
            <table>
                <thead>
                    <tr>
                        <th v-for="(value, key) in data[0]" :key="key">{{ key }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in data" :key="index">
                        <td v-for="(value, key) in item" :key="key">{{ value }}</td>
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
export default {
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
                const response = await fetch('http://localhost:3000/api/get-all', {
                    headers: {
                        'x-api-key': process.env.VUE_APP_API_KEY // Use environment variable
                    }
                });
                const result = await response.json();
                console.log('Fetched data:', result); // Log the fetched data
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