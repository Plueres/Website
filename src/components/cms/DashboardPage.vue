<template>
    <div class="Dashboard">
        <h1>Dashboard Page</h1>
        <p>This is the dashboard page.</p>
        <div v-if="data">
            <h2>API Response:</h2>
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
            </div>
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
                        'x-api-key': process.env.API_KEY
                    }
                });
                const result = await response.json();
                this.data = result.data;
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