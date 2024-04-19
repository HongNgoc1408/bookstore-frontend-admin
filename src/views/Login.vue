<template>
    <div class="container">
        <div class="card col-md-5 rounded">
            <div class="card-body">
                <FormLogin @submit:login="loginUser" />
            </div>

        </div>
    </div>
</template>

<script>

import UserService from '@/services/user.service';
import FormLogin from "@/components/FormLogin.vue"

export default {
    components: {
        FormLogin
    },
    data() {
        return {
            newUser: {
                email: '',
                password: '',
            },
            message: "",
        };
    },
    methods: {
        async loginUser(data) {
            try {
                const user = await UserService.login(data.email, data.password);

                if (user.isAdmin) {
                    this.$router.push({ name: "bookstore" });
                    // Lưu thông tin user vào localStorage
                    localStorage.setItem('userId', user._id);
                    localStorage.setItem('userName', user.name);

                } else {
                    alert('Bạn không có quyền truy cập.');
                }
            } catch (error) {
                alert('Đăng nhập không thành công: ' + error.message);
            }
        }
    },
}
</script>