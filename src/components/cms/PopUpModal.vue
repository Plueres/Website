<template>
    <div v-if="isVisible" class="modal-overlay">
        <h2>{{ title }}</h2>
        <form v-if="mode !== 'delete'" @submit.prevent="submit">
            <div v-for="field in fields" :key="field.id">
                <label :for="field.id">{{ field.label }}</label>
                <input v-if="field.type === 'text' || field.type === 'number'" :type="field.type" :id="field.id"
                    v-model="field.value" />
                <textarea v-if="field.type === 'textarea'" :id="field.id" v-model="field.value"></textarea>
            </div>
            <button class="primary" type="submit">{{ submitButtonText }}</button>
            <button class="secondary" type="button" @click="$emit('close')">Cancel</button>
        </form>
        <div v-else>
            <p>Are you sure you want to delete this entry?</p>
            <p><strong>{{ currentEntry.title }}</strong></p> <!-- Display the title or any other relevant info -->
            <button class="danger" @click="confirmDelete">Delete</button>
            <button class="secondary" @click="$emit('close')">Cancel</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isVisible: Boolean,
        fields: {
            type: Array,
            default: () => [] // Default to an empty array
        },
        title: String,
        submitButtonText: {
            type: String,
            default: 'Save'
        },
        apiUrl: String,
        method: String,
        apiKey: String,
        currentEntry: { // New prop for the current entry ID
            type: Object,
            default: () => ({})// Default to null for create mode
        },
        mode: String
    },
    methods: {
        async submit() {
            try {
                if (this.mode === 'delete') {
                    // Handle delete logic
                    await this.deleteEntry();
                    this.$emit('close');
                    return;
                }

                const dataToSend = {
                    ...(this.currentEntry.id ? { id: this.currentEntry.id } : {}), // Include id if currentEntry has an id
                    ...this.fields.reduce((acc, field) => {
                        acc[field.id] = field.value; // Use the field id as the key and the value as the value
                        return acc;
                    }, {})
                };

                console.log('API URL:', this.apiUrl);
                console.log('HTTP Method:', this.method);
                console.log('Data to Send:', dataToSend);

                this.$emit('close');

                // Wrap the dataToSend in an array
                const response = await fetch(this.apiUrl, {
                    method: this.method,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': this.apiKey
                    },
                    body: JSON.stringify([dataToSend]) // Send as an array of objects
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Network response was not ok: ${errorText}`);
                }

                const result = await response.json();
                this.$emit('save', result); // Emit the result back to the parent
                this.$emit('close'); // Close the modal
            } catch (error) {
                console.error('Error submitting edit:', error);
                console.log(error);
            }
        },
        async confirmDelete() {
            await this.deleteEntry(); // Call the delete method
        },
        async deleteEntry() {
            try {
                const dataToSend = [{ id: this.currentEntry.id }];

                const response = await fetch(this.apiUrl, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': this.apiKey
                    },
                    body: JSON.stringify(dataToSend) // Send the modified body
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Network response was not ok: ${errorText}`);
                }

                this.$emit('delete', this.currentEntry.id); // Emit delete event
            } catch (error) {
                console.error('Error deleting entry:', error);
            }
        }
    }
};
</script>

<style scoped lang="scss">
@import '@/scss/_variables.scss';

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