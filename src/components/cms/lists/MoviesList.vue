<template>
    <div class="Dashboard">
        <HeaderComponent />
        <h1>Movies Page</h1>
        <p>This is the movieslist page.</p>

        <!-- Display raw JSON output -->
        <!-- <div v-if="data">
            <h2>Raw API Response:</h2>
            <pre>{{ data }}</pre>
        </div> -->

        <div v-if="data && data.length">
            <h2>Movies:</h2>
            <button @click="openCreateModal">Create</button>
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
                        <th>Delete</th>
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
        <PopUpModal :isVisible="isCreateModalVisible" :fields="fields" title="Create Movie" submitButtonText="Create"
            :apiUrl="createApiUrl" method="POST" :apiKey="apiKey" @save="handleCreateSave" @close="closeCreateModal" />
        <PopUpModal :isVisible="isEditModalVisible" :fields="fields" title="Edit Movie" submitButtonText="Save"
            :apiUrl="editApiUrl" method="PUT" :apiKey="apiKey" :currentEntry="currentEntry" @save="handleEditSave"
            @close="closeEditModal" />
        <PopUpModal :isVisible="isDeleteModalVisible" title="Delete Movie" submitButtonText="Delete"
            :apiUrl="deleteApiUrl" method="DELETE" :apiKey="apiKey" :currentEntry="currentEntry" mode="delete"
            @delete="handleDelete" @close="closeDeleteModal" />
    </div>
</template>

<script>
import HeaderComponent from '@/components/cms/HeaderComponent.vue';
import PopUpModal from '@/components/cms/PopUpModal.vue';
import { movieFields } from '@/config/movieFields';

export default {
    components: {
        HeaderComponent,
        PopUpModal
    },
    name: 'GetMovies',
    data() {
        return {
            data: null,
            isCreateModalVisible: false,
            isEditModalVisible: false,
            isDeleteModalVisible: false,
            currentEntry: {},
            fields: movieFields.map(field => ({ ...field })),
            createApiUrl: `${process.env.API_ORIGIN}/api/movies/post`,
            editApiUrl: `${process.env.API_ORIGIN}/api/movies/put`,
            deleteApiUrl: `${process.env.API_ORIGIN}/api/movies/delete`,
            apiKey: process.env.API_KEY
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

                // Log the result to inspect its structure
                console.log('Movies API Response:', result);

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