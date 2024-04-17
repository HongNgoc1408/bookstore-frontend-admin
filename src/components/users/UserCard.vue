<script>
export default {
    props: {
        user: { type: Object, required: true },
    },
};
</script>

<template>
    <div>
        <div class="p-1">
            <strong>Tên:</strong>
            {{ user.name }}
        </div>
        <div class="p-1">
            <strong>Email:</strong>
            {{ user.email }}
        </div>
        <div class="p-1">
            <strong>SĐT:</strong>
            {{ user.phone }}
        </div>
        <div class="p-1">
            <strong>Địa chỉ:</strong>
            {{ user.address }}
        </div>
    </div>
</template>