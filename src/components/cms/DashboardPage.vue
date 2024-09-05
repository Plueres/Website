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
            <p>{{ loading }}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: null,
            loading: '',
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                this.loading = 'Loading...';
                const response = await fetch(`${process.env.API_ORIGIN}/api/get-all`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': process.env.API_KEY, // Ensure this is set correctly
                    },
                });
                if (response.status === 200) {
                    const result = await response.json();
                    this.data = result.data;
                } else {
                    this.loading = 'There was an error retrieving the data';
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                console.log('API_ORIGIN:', process.env.API_ORIGIN);
                throw new Error('Network response was not ok');
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