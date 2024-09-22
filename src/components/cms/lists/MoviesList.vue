<template>
    <HeaderComponent />
    <div class="page-content">
        <h1>Movies Page</h1>
        <p>This is the movieslist page.</p>

        <div v-if="data && data.length">
            <h3>Movies:</h3>
            <button class="primary" @click="openCreateModal">Create</button>
            <div class="card-container">
                <CardComponent v-for="item in data" :key="item.id" :data="item" :fields="fields"
                    @edit="openEditModal(item.id)" @delete="openDeleteModal(item.id)" />
            </div>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
        <PopUpModal entityType="movies" :isVisible="isCreateModalVisible" :fields="fields" title="Create Movie"
            submitButtonText="Create" :apiUrl="createApiUrl" method="POST" :apiKey="apiKey" @save="handleCreateSave"
            @close="closeCreateModal" />
        <PopUpModal entityType="movies" :isVisible="isEditModalVisible" :fields="fields" title="Edit Movie"
            submitButtonText="Save" :apiUrl="editApiUrl" method="PUT" :apiKey="apiKey" :currentEntry="currentEntry"
            @save="handleEditSave" @close="closeEditModal" />
        <PopUpModal entityType="movies" :isVisible="isDeleteModalVisible" title="Delete Movie" submitButtonText="Delete"
            :apiUrl="deleteApiUrl" method="DELETE" :apiKey="apiKey" :currentEntry="currentEntry" mode="delete"
            @delete="handleDelete" @close="closeDeleteModal" />
    </div>
</template>

<script>
import HeaderComponent from '@/components/cms/HeaderComponent.vue';
import PopUpModal from '@/components/cms/PopUpModal.vue';
import CardComponent from '@/components/cms/CardComponent.vue';
import { movieFields } from '@/config/movieFields';

export default {
    components: {
        HeaderComponent,
        PopUpModal,
        CardComponent
    },
    name: 'GetMovies',
    data() {
        return {
            data: [],
            lastFetchTime: null,
            isCreateModalVisible: false,
            isEditModalVisible: false,
            isDeleteModalVisible: false,
            currentEntry: {},
            fields: movieFields.map(field => ({ ...field })),
            createApiUrl: `${process.env.API_ORIGIN}/api/movies/post`,
            editApiUrl: `${process.env.API_ORIGIN}/api/movies/put`,
            deleteApiUrl: `${process.env.API_ORIGIN}/api/movies/delete`,
            apiKey: process.env.API_KEY,
            callCount: 0
        };
    },
    mounted() {
        this.fetchData();
    },
    created() {
        // Load cached data from localStorage
        const cachedData = localStorage.getItem('moviesData');
        const cachedTime = localStorage.getItem('moviesLastFetchTime');
        this.callCount = localStorage.getItem('callCount');

        if (cachedData && cachedTime) {
            this.data = JSON.parse(cachedData);
            this.lastFetchTime = parseInt(cachedTime, 10);
        }
    },
    methods: {
        async fetchData() {
            const now = new Date().getTime();
            this.callCount++;
            localStorage.setItem('callCount', this.callCount);
            console.log(`fetchData called ${this.callCount} times`);
            console.log('Fetching data...');

            try {
                const headers = {
                    'x-api-key': process.env.API_KEY
                };


                // Add conditional headers if Last-Modified is available
                if (this.lastFetchTime) {
                    headers['If-Modified-Since'] = localStorage.getItem('lastFetchTime');
                }
                console.log('Headers:', headers['If-Modified-Since']);
                const response = await fetch(`${process.env.API_ORIGIN}/api/movies/get`, { headers });

                if (response.status === 304) {
                    console.log('Data not modified. Using cached data:', this.data);
                    // Return the cached data
                    return this.data;
                }

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const result = await response.json();
                this.data = result.entries;
                localStorage.setItem('moviesData', JSON.stringify(this.data));
                // Log before updating lastFetchTime
                this.lastFetchTime = now;
                localStorage.setItem('lastFetchTime', this.lastFetchTime);
                // Log after updating lastFetchTime
                console.log('Updated lastFetchTime new value:', this.lastFetchTime);

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
            this.data.unshift(result[0]); // Add the new movie to the beginning of the list
            this.closeCreateModal();
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
            const index = this.data.findIndex(item => item.id === result);
            if (index !== -1) {
                this.data.splice(index, 1); // Remove the item from the list
            } else {
                console.error('No entry found for the given ID:', result);
            }
            this.fetchData();
            this.closeDeleteModal();
        },
        openEditModal(id) {
            if (Array.isArray(this.data)) {
                const entryToEdit = this.data.find(item => item.id === id);
                if (entryToEdit) {
                    this.currentEntry = entryToEdit; // Set the current entry to edit
                    this.resetEditFields(); // Populate the fields with the current entry data
                    this.isEditModalVisible = true;
                } else {
                    console.error('No entry found for the given ID:', id);
                }
            } else {
                console.error('Data is not an array:', this.data);
            }
        },
        closeEditModal() {
            this.isEditModalVisible = false;
        },
        handleEditSave(result) {
            console.log('Edited result:', result[0]); // Log the edited result

            // Extract the updated movie from the response
            const updatedMovie = result[0]; // Assuming there's always one entity in the array

            // Step 1: Find the index of the item to update
            const index = this.data.findIndex(item => item.id === updatedMovie.id);
            console.log('Current data:', this.data); // Log the current state of the data array
            console.log('Index found:', index); // Log the index found

            // Step 2: Check if the item exists
            if (index !== -1) {
                // Step 3: Update the specific item in the local data array
                this.data[index] = updatedMovie; // Directly update the item
                localStorage.setItem('moviesData', JSON.stringify(this.data));
            } else {
                console.error('No entry found for the given ID:', updatedMovie.id); // Log an error if not found
            }
            this.fetchData();
            // Step 4: Close the edit modal
            this.closeEditModal();
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