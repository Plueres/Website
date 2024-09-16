<template>
    <div class="card">
        <div class="card-header">
            <h3>{{ data.title }}</h3>
        </div>
        <div class="card-body">
            <p v-for="field in fields" :key="field.id">{{ field.label }}: {{ data[field.id] }}</p>
        </div>
        <div class="card-buttons">
            <button class="secondary" @click="this.$emit('edit', this.data.id)">Edit</button>
            <button class="danger" @click="this.$emit('delete', this.data.id)">Delete</button>
        </div>
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
    }
}
</script>
