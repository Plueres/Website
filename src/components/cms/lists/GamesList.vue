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
            <button @click="openCreateModal">Create</button>
            <table>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th v-for="(item) in fields" :key="item.id" scope="col">
                            {{ item.label }}
                        </th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item) in data" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>{{ item.title }}</td>
                        <td>{{ item.tags }}</td>
                        <td>{{ item.played }}</td>
                        <td>{{ item.finished }}</td>
                        <td>{{ item.personal_rating }}</td>
                        <td>{{ item.review }}</td>
                        <td>
                            <button @click="openEditModal(item.id)">Edit</button>
                        </td>
                        <td>
                            <button @click="openDeleteModal(item.id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
        <PopUpModal :isVisible="isCreateModalVisible" :fields="fields" title="Create Game" submitButtonText="Create"
            :apiUrl="createApiUrl" method="POST" :apiKey="apiKey" @save="handleCreateSave" @close="closeCreateModal" />
        <PopUpModal :isVisible="isEditModalVisible" :fields="fields" title="Edit Game" submitButtonText="Save"
            :apiUrl="editApiUrl" method="PUT" :apiKey="apiKey" :currentEntry="currentEntry" @save="handleEditSave"
            @close="closeEditModal" />
        <PopUpModal :isVisible="isDeleteModalVisible" title="Delete Game" submitButtonText="Delete"
            :apiUrl="deleteApiUrl" method="DELETE" :apiKey="apiKey" :currentEntry="currentEntry" mode="delete"
            @delete="handleDelete" @close="closeDeleteModal" />
    </div>
</template>

<script>
import HeaderComponent from '@/components/cms/HeaderComponent.vue';
import PopUpModal from '@/components/cms/PopUpModal.vue';
import { gameFields } from '@/config/gameFields';

export default {
    components: {
        HeaderComponent,
        PopUpModal
    },
    name: 'GetGames',
    data() {
        return {
            data: null,
            isCreateModalVisible: false,
            isEditModalVisible: false,
            isDeleteModalVisible: false,
            currentEntry: {},
            fields: gameFields.map(field => ({ ...field })),
            createApiUrl: `${process.env.API_ORIGIN}/api/games/post`,
            editApiUrl: `${process.env.API_ORIGIN}/api/games/put`,
            deleteApiUrl: `${process.env.API_ORIGIN}/api/games/delete`,
            apiKey: process.env.API_KEY
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
        openCreateModal() {
            this.isCreateModalVisible = true;
            this.resetCreateFields(); // Reset fields for a new entry
        },
        closeCreateModal() {
            this.isCreateModalVisible = false;
        },
        handleCreateSave(result) {
            console.log('Created result:', result);
            this.closeCreateModal();
            this.fetchData();
        },
        openDeleteModal(id) {
            this.isDeleteModalVisible = true;
            this.currentEntry = this.data.find(item => item.id === id);
        },
        closeDeleteModal() {
            this.isDeleteModalVisible = false;
        },
        handleDelete(result) {
            console.log('Deleted result:', result);
            this.closeDeleteModal();
            this.fetchData();
        },
        openEditModal(id) {
            // Find the entry in the data array using the passed id
            const entryToEdit = this.data.find(item => item.id === id);

            if (entryToEdit) {
                this.currentEntry = entryToEdit; // Set the current entry to edit
                this.resetEditFields(); // Populate the fields with the current entry data
                this.isEditModalVisible = true; // Show the modal
            } else {
                console.error('No entry found for the given ID:', id);
            }
        },
        closeEditModal() {
            this.isEditModalVisible = false;
        },
        handleEditSave(result) {
            console.log('Edited result:', result);
            this.closeEditModal();
            this.fetchData();
        },
        resetCreateFields() {
            this.fields.forEach(field => {
                field.value = ''; // Reset values for create
            });
        },
        resetEditFields() {
            // Assuming this.currentEntry holds the entry you want to edit
            this.fields.forEach(field => {
                // Set the value of each field based on the current entry
                field.value = this.currentEntry[field.id] || ''; // Use the current entry value or an empty string
            });
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