<template>
    <Form @submit="submitLogin" :validation-schema="loginFormSchema" class="form-login">
        <div class="text-center mb-4">
            <h1 class="h3 mb-3 font-weight-normal">Login</h1>
        </div>

        <div class="mb-3">
            <label for="email">Email</label>
            <Field type="email" name="email" class="form-control" placeholder="you@example.com"
                v-model="loginData.email" />
            <ErrorMessage name="email" class="error-feedback text-danger" />
        </div>

        <div class="mb-3">
            <label for="password">Password</label>
            <Field type="password" name="password" class="form-control" placeholder="Password"
                v-model="loginData.password" />
            <ErrorMessage name="password" class="error-feedback text-danger" />
        </div>

        <div class="checkbox mb-3">
            <label>
                <input type="checkbox" v-model="loginData.rememberMe"> Remember me
            </label>
        </div>

        <button class="btn btn-primary btn-block" type="submit">Login</button>

    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        return {
            loginData: {
                email: "",
                password: "",
                rememberMe: false,
            },
            loginFormSchema: yup.object().shape({
                email: yup.string().email("Email không hợp lệ.").required("Vui lòng nhập Email."),
                password: yup.string().required("Vui lòng nhập mật khẩu."),
            }),
        };
    },
    methods: {
        submitLogin() {
            this.$emit("submit:login", this.loginData);
        }
    },
}
</script>

<style scoped></style>