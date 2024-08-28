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

        <div v-if="data">
            <h2>API Response:</h2>
            <pre>{{ data }}</pre>
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
            apiKey: 'API1', // Add your API key here
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                const response = await fetch('https://regrify-api.vercel.app/api/get-games');
                const result = await response.json();
                this.data = result;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        async sendData() {
            try {
                const response = await fetch('https://regrify-api.vercel.app/api/data', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.apiKey}`, // Add the API key to the headers
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
</style>