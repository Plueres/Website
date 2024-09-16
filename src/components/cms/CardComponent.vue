<template>
    <div class="card">
        <div class="card-header">
            <h2>{{ data.title }}</h2>
        </div>
        <div class="card-body" v-for="field in fields" :key="field.id">
            <p>{{ field.label }}: {{ data[field.id] }}</p>
        </div>
        <button @click="openEditModal(data.id)">Edit</button>
        <button @click="openDeleteModal(data.id)">Delete</button>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            required: true
        },
        fields: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            localData: [this.data],
            currentEntry: null,
            isEditModalVisible: false,
            isDeleteModalVisible: false
        };
    },
    methods: {
        openDeleteModal(id) {
            this.isDeleteModalVisible = true;
            this.currentEntry = this.data.find(item => item.id === id);
        },
        closeDeleteModal() {
            this.fetchData();
            this.isDeleteModalVisible = false;
        },
        handleDelete(result) {
            console.log('Deleted result:', result);
            this.localData = this.data.filter(item => item.id !== result.id);
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
            this.fetchData();
            this.isEditModalVisible = false;
        },
        handleEditSave(result) {
            console.log('Edited result:', result); // Log the edited result

            // Extract the updated game from the response
            const updatedGame = result.entities[0]; // Assuming there's always one entity in the array

            // Step 1: Find the index of the item to update
            const index = this.localData.findIndex(item => item.id === updatedGame.id);
            console.log('Current data:', this.localData); // Log the current state of the data array
            console.log('Index found:', index); // Log the index found

            // Step 2: Check if the item exists
            if (index !== -1) {
                // Step 3: Update the specific item in the local data array
                this.localData[index] = updatedGame; // Directly update the item
            } else {
                console.error('No entry found for the given ID:', updatedGame.id); // Log an error if not found
            }

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
    }
}
</script>