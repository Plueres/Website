<template>
    <div class="Dashboard">
        <HeaderComponent />
        <h1>Games Page</h1>
        <p>This is the gameslist page.</p>

        <div v-if="data && data.length">
            <h2>Games:</h2>
            <button @click="openCreateModal">Create</button>
            <div class="card-container" v-for="item in data" :key="item.id">
                <CardComponent class="card" :data="item" :fields="fields" />
            </div>
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
import CardComponent from '@/components/cms/CardComponent.vue';
import { gameFields } from '@/config/gameFields';
let callCount = 0;

export default {
    components: {
        HeaderComponent,
        PopUpModal,
        CardComponent
    },
    name: 'GetGames',
    data() {
        return {
            data: null,
            lastFetchTime: 0,
            isCreateModalVisible: false,
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
            callCount++;
            console.log(`fetchData called ${callCount} times`);
            console.log('Fetching data');
            const now = Date.now();
            // Check if data is cached and not stale
            if (this.data && (now - this.lastFetchTime < 60000)) { // 1 minute cache
                console.log('Using cached data:', this.data);
                return; // Return early if cached data is valid
            } else {
                console.log('Data is either null or stale. Fetching new data...'); // Log if condition is not met
            }

            try {
                const response = await fetch(`${process.env.API_ORIGIN}/api/games/get`, {
                    headers: {
                        'x-api-key': process.env.API_KEY
                    }
                });
                const result = await response.json();
                this.data = result;
                this.lastFetchTime = Date.now();
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
            this.fetchData();
            this.isCreateModalVisible = false;
        },
        handleCreateSave(result) {
            console.log('Created result:', result);
            this.data.push(result);
            this.closeCreateModal();
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