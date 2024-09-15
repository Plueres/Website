<!-- src/components/EditModal.vue -->
<template>
    <div class="modal-overlay" v-if="isVisible">
        <h2>Edit Entry</h2>
        <form @submit.prevent="submitEdit">
            <div v-for="field in fields" :key="field.id">
                <label :for="field.id">{{ field.label }}</label>
                <input v-if="field.type === 'text' || field.type === 'number'" :type="field.type" :id="field.id"
                    v-model="field.value" />
                <textarea v-if="field.type === 'textarea'" :id="field.id" v-model="field.value"></textarea>
            </div>
            <button type="submit">Save</button>
            <button type="button" @click="$emit('close')">Cancel</button>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        isVisible: Boolean,
        fields: Array,
        entry: Object,
        pageName: String // New prop for the page name
    },
    methods: {
        async submitEdit() {
            const apiUrl = this.entry.id
                ? `http://localhost:3000/api/${this.pageName}/put`
                : `http://localhost:3000/api/${this.pageName}/post`;

            // Log all keys in the current entry
            const allKeys = Object.keys(this.entry);
            console.log('All keys in the current entry:', allKeys);

            // Create an updated entry object by merging the current entry with the updated fields
            const updatedEntry = { ...this.entry }; // Start with the current entry

            // Update only the fields that are being edited
            this.fields.forEach(field => {
                updatedEntry[field.model] = field.value; // Update the field with the new value
            });

            // Log the API URL and updated entry
            console.log('API URL:', apiUrl);
            console.log('Updated Entry:', JSON.stringify(updatedEntry, null, 2)); // Pretty print

            try {
                const response = await fetch(apiUrl, {
                    method: this.entry.id ? 'PUT' : 'POST', // Use PUT for updates, POST for new entries
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': process.env.API_KEY
                    },
                    body: JSON.stringify([updatedEntry]) // Wrap updatedEntry in an array
                });

                if (!response.ok) {
                    const errorText = await response.text(); // Get the error response text
                    throw new Error(`Network response was not ok: ${errorText}`);
                }

                const result = await response.json();
                this.$emit('save', result); // Emit the result back to the parent

                location.reload();
            } catch (error) {
                console.error('Error submitting edit:', error);
            }
        }
    }
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 400px;
}

.modal h2 {
    margin: 0 0 20px;
}

.modal form {
    display: flex;
    flex-direction: column;
}

.modal label {
    margin-bottom: 5px;
}

.modal input,
.modal textarea {
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>

<!-- ! Make sure that the inputs are entered through where the modal gets imported, not generated from what is already available -->