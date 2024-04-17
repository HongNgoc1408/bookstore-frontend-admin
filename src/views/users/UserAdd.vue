<template>
    <div class="page">
        <h4>Thêm người dùng</h4>
        <UserForm :user="newUser" @submit:user="addUser" />
        <p class="text-primary">{{ message }}</p>
    </div>
</template>

<script>
import UserForm from "@/components/users/UserForm.vue";
import UserService from "@/services/user.service";

export default {
    components: {
        UserForm,
    },
    data() {
        return {
            newUser: {
                name: '',
                email: '',
                phone: '',
                address: '',
                password: '',
                gender: '',
                isAdmin: ''
            },
            message: "",
        }
    },
    
};
</script>