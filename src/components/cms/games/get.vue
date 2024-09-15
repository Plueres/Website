<template>
    <div class="Dashboard">
        <HeaderComponent />
        <h1>Games Page</h1>
        <p>This is the gameslist page.</p>

        <!-- Display raw JSON output -->
        <!-- <div v-if="data">
            <h2>Raw API Response:</h2>
            <pre>{{ data }}</pre>
        </div> -->

        <div v-if="data && data.length">
            <h2>Games:</h2>
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
                        <td>
                            <button @click="openModal(item)">Edit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>

        <EditModal :isVisible="isModalVisible" :entry="currentEntry" :fields="fields" :pageName="'games'"
            @save="updateEntry" @close="closeModal" />
    </div>
</template>

<script>
import HeaderComponent from '@/components/cms/HeaderComponent.vue';
import EditModal from '@/components/cms/EditModal.vue'; // Import the EditModal component

export default {
    components: {
        HeaderComponent,
        EditModal
    },
    name: 'GetGames',
    data() {
        return {
            data: null,
            isModalVisible: false, // To control modal visibility
            currentEntry: {}, // To hold the entry being edited
            fields: [], // To hold field definitions
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                const response = await fetch(`${process.env.API_ORIGIN}/api/games/get`, {
                    headers: {
                        'x-api-key': process.env.API_KEY
                    }
                });
                const result = await response.json();
                this.data = result;

                // Log the result to inspect its structure
                console.log('Games API Response:', result);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        openModal(entry) {
            this.currentEntry = { ...entry }; // Create a copy of the entry to edit

            // Check if currentEntry has properties
            if (Object.keys(this.currentEntry).length === 0) {
                console.error('Current entry is empty:', this.currentEntry);
                this.fields = []; // Set fields to an empty array if currentEntry is empty
                this.isModalVisible = true; // Show the modal even if fields are empty
                return;
            } else {
                console.log('Current entry has properties:', this.currentEntry);
            }

            // Create fields based on the currentEntry properties
            this.fields = Object.keys(this.currentEntry).map(key => {
                return {
                    id: key,
                    label: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '), // Capitalize and replace underscores with spaces
                    model: key,
                    type: typeof this.currentEntry[key] === 'number' ? 'number' : 'text', // Determine type based on value
                    required: false, // Set required as needed
                    value: this.currentEntry[key] // Set the current value
                };
            });

            // Log the fields to inspect their structure
            console.log('Fields for modal:', this.fields);

            this.isModalVisible = true; // Show the modal
        },
        closeModal() {
            this.isModalVisible = false; // Hide the modal
        },
        updateEntry(updatedEntry) {
            const index = this.data.findIndex(item => item.id === updatedEntry.id);
            if (index !== -1) {
                this.$set(this.data, index, updatedEntry); // Update the entry in the list
            }
            this.closeModal();
        }
    }
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