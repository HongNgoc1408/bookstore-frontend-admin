<script>
export default {
    props: {
        publish: { type: Object, required: true },
    },
};
</script>

<template>
    <div>
        <div class="p-1">
            <strong>Tên:</strong>
            {{ publish.name }}
        </div>
        <div class="p-1">
            <strong>Địa chỉ:</strong>
            {{ publish.address }}
        </div>
    </div>
</template>