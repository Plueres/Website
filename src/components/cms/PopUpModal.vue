<template>
    <div v-if="isVisible" class="modal-container">
        <div class="modal">
            <h3>{{ title }}</h3>
            <form v-if="mode !== 'delete'" @submit.prevent="submit">
                <div class="modal-field" v-for="field in fields" :key="field.id">
                    <label class="modal-label" :for="field.id">{{ field.label }}</label>
                    <input class="modal-input" v-if="field.type === 'text' || field.type === 'number'"
                        :type="field.type" :id="field.id" v-model="field.value" />
                    <textarea class="modal-textarea" v-if="field.type === 'textarea'" :id="field.id"
                        v-model="field.value"></textarea>
                </div>
                <div class="buttons">
                    <button class="primary" type="submit">{{ submitButtonText }}</button>
                    <button class="secondary" type="button" @click="$emit('close')">Cancel</button>
                </div>
            </form>
            <div v-else>
                <p>Are you sure you want to delete this entry?</p>
                <p><strong>{{ currentEntry.title }}</strong></p>
                <p><strong>{{ currentEntry.id }}</strong></p>
                <div class="buttons">
                    <button class="danger" @click="confirmDelete">Delete</button>
                    <button class="secondary" @click="$emit('close')">Cancel</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    props: {
        entityType: String,
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
                console.warn(this.currentEntry.id);

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

                let result = await response.json();
                result = result.lists[this.entityType].entries;

                // Log the result to understand its structure
                console.log('API Response:', result);
                console.log('result is array:', result);

                // Check if result is defined, is an array, and has at least one element
                if (result && Array.isArray(result) && result.length > 0) {
                    this.$emit('save', result); // Emit the first element of the result array back to the parent
                    this.$emit('close'); // Close the modal
                    console.log('Emitting save event with:', result[0]);
                } else {
                    throw new Error('Unexpected response format');
                }

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

.modal-container {
    position: fixed;
    inset: 0;
    display: grid;
    place-items: center;
    z-index: 18;
    overflow: scroll;

    .modal {
        width: 80%;
        height: fit-content;
        background-color: white;
        color: black;
        box-shadow: 0 0 10px 0 darken($cms-background-color, 10%);
        display: flex;
        padding: 2rem;
        border-radius: 6px;
        justify-content: center;
        flex-direction: column;

        form {
            display: flex;
            flex-direction: column;
            width: 100%;
        }

        h3 {
            margin: 0;
            font-size: 1.4rem;
        }

        .modal-field {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex-wrap: wrap;
        }

        .modal-label {
            margin: 0.5rem;
            font-size: 1rem;
            text-align: left;
        }

        .modal-input {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        .modal-textarea {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            resize: vertical;
        }

        .buttons {
            button {
                display: flex;
                width: 100%;
                justify-content: center;
                margin-left: unset;
                margin-right: unset;
            }
        }
    }
}

@media (min-width: $desktop-min-width) {
    .modal-container {
        .modal {
            width: 50%;

            .buttons {
                button {
                    display: unset;
                    width: unset;
                    justify-content: unset;
                    margin-left: unset;
                    margin-right: unset;
                }
            }
        }
    }
}
</style>