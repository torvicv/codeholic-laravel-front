<script>
    export default {
        name: 'Auth',
        props: {
            title: {
                type: String,
                required: true
            }
        },
    }
</script>

<template>
    <header>
        <h1 class="text-4xl font-bold text-center py-4">{{ title }}</h1>
    </header>
    <slot />
</template>