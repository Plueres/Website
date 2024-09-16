<template>
    <div class="card">
        <div class="card-header">
            <h2>{{ data.title }}</h2>
        </div>
        <div class="card-body" v-for="field in fields" :key="field.id">
            <p>{{ field.label }}: {{ data[field.id] }}</p>
        </div>
        <button @click="this.$emit('edit', this.data.id)">Edit</button>
        <button @click="this.$emit('delete', this.data.id)">Delete</button>
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