<template>
    <div v-if="user" class="container">
        <h4 class="text-center">Hiệu chỉnh Liên hệ</h4>
        <div class="col-md-6 mx-auto">
            <UserForm :user="user" @submit:user="updateUser" @delete:user="deleteUser" />
            <p class="text-primary alert">{{ message }}</p>
        </div>
    </div>
</template>

<script>
import UserForm from "@/components/users/UserForm.vue";
import UserService from "@/services/user.service";

export default {
    components: {
        UserForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            user: null,
            message: "",
        };
    },
    methods: {
        async getUser(id) {
            try {
                this.user = await UserService.get(id);
            } catch (error) {
                console.log(error);

                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateUser(data) {
            try {
                await UserService.update(this.user._id, data);
                this.message = "Người dùng được cập nhật thành công.";
                this.$router.push({ name: "userpage" });
            } catch (error) {
                console.log(error);
            }
        },
        async deleteUser() {
            if (confirm("Bạn muốn xóa người dùng này?")) {
                try {
                    await UserService.delete(this.user._id);
                    this.$router.push({ name: "userpage" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getUser(this.id);
        this.message = "";
    },
};
</script>