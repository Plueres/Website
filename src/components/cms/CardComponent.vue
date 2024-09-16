<template>
    <div class="card">
        <div class="card-header">
            <h3>{{ data.title }}</h3>
        </div>
        <div class="card-body" v-for="field in fields" :key="field.id">
            <p>{{ field.label }}: {{ data[field.id] }}</p>
        </div>
        <button class="secondary" @click="this.$emit('edit', this.data.id)">Edit</button>
        <button class="danger" @click="this.$emit('delete', this.data.id)">Delete</button>
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

<style scoped lang="scss">
@import '@/scss/_variables';

// Card
.card-container {
    display: grid;
    grid-template-rows: repeat(1, 1fr);
    margin: 1rem;
}

.card {
    border: 1px solid $card-background-color;
    padding: 10px;
    border-radius: 5px;
}

@media (min-width: $desktop-min-width) {
    .card-container {
        display: flex;
        flex-wrap: wrap;
        gap: 2px;
        width: 100%;
        justify-content: left;
    }

    .card {
        background-color: $primary-color;
        padding: 14px;
    }
}
</style>
