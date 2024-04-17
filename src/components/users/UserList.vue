<template>
    <ul class="list-group">
        <li class="list-group-item list-group-item-action list-group-item-secondary" v-for="(user, index) in users"
            :key="user._id" :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)"
            @delete:user="deleteUser(user)">
            {{ user.name }}
            <span class="d-flex m-0 p-0" v-if="user._id">
                <button type="button" class="ms-auto btn btn-danger" @click.stop="deleteUser(user)">
                    Xóa
                </button>
            </span>
        </li>
    </ul>
</template>

<script>
import userService from '@/services/user.service';
export default {
    props: {
        users: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
        async deleteUser(user) {
            if (confirm("Bạn muốn xóa người dùng này?")) {
                try {
                    await userService.delete(user._id);
                    this.$emit("delete:user", user);
                    window.location.reload();
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
};
</script>
