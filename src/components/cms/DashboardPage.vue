<template>
    <div class="Dashboard">
        <h1>Dashboard Page</h1>
        <p>This is the dashboard page.</p>

        <div>
            <label for="id">ID:</label>
            <input type="text" v-model="id" id="id" />
        </div>
        <div>
            <label for="name">Name:</label>
            <input type="text" v-model="name" id="name" />
        </div>
        <button @click="sendData">Send Data</button>

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
    name: 'DashboardPage',
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
                const response = await fetch('http://localhost:3001/api/get-games');
                const result = await response.json();
                console.log('Fetched data:', result); // Log the fetched data
                this.data = result;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        async sendData() {
            try {
                const response = await fetch('http://localhost:3001/api/post-games', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: this.id,
                        name: this.name,
                    }),
                });

                // Log the raw response
                const text = await response.text();
                console.log('Raw response:', text);

                // Try to parse the response as JSON
                const result = JSON.parse(text);
                console.log('POST response:', result);
            } catch (error) {
                console.error('Error sending data:', error);
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