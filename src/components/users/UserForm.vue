<template>
    <Form @submit="submitUser" :validation-schema="userFormSchema">
        <div class="row">
            <div class="col-md-6 mb-3">
                <label for="name"><strong>Họ và Tên</strong></label>
                <Field type="text" class="form-control" id="name" placeholder="" v-model="userLocal.name" name="name"
                    required />
                <ErrorMessage name="name" class="error-feedback" />
            </div>
            <div class="col-md-6 mb-3">
                <label for="phone"><strong>SĐT</strong></label>
                <Field type="tel" class="form-control" id="phone" placeholder="" v-model="userLocal.phone" name="phone"
                    required />
                <ErrorMessage name="phone" class="error-feedback" />

            </div>
        </div>

        <div class="mb-3">
            <label for="email"><strong>Email</strong></label>
            <Field type="email" class="form-control" id="email" placeholder="you@example.com" v-model="userLocal.email"
                name="email" />
            <ErrorMessage name="email" class="error-feedback" />

        </div>
        <div class="mb-3">
            <label for="gender"><strong>Giới tính</strong></label>
            <Field type="gender" class="form-control" id="gender" placeholder="you@example.com"
                v-model="userLocal.gender" name="gender" />
            <ErrorMessage name="gender" class="error-feedback" />
        </div>
        <div class="mb-3">
            <label for="password"><strong>Mật khẩu</strong></label>
            <Field type="password" class="form-control" id="password" placeholder="you@example.com"
                v-model="userLocal.password" name="password" />
            <ErrorMessage name="password" class="error-feedback" />

        </div>
        <div class="mb-3">
            <label for="address"><strong>Địa chỉ</strong></label>
            <Field type="text" class="form-control" id="address" placeholder="1234 Main St" v-model="userLocal.address"
                name="address" required />
            <ErrorMessage name="address" class="error-feedback" />
        </div>
        <div class="mb-3">
            <label for="isAdmin"><strong>Quyền tài khoản</strong></label>
            <Field type="isAdmin" class="form-control" id="isAdmin" placeholder="" v-model="userLocal.isAdmin"
                name="isAdmin" />
            <ErrorMessage name="isAdmin" class="error-feedback" />

        </div>

        <hr class="mb-4" />

        <div class="form-group">
            <button class="btn btn-primary form-control" @click="submitUser">
                <i class="fas fa-save"></i> Lưu
            </button>
        </div>
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
    emits: ["submit:usser", "delete:user"],
    props: {
        user: { type: Object, required: true }
    },
    data() {
        const userFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            email: yup
                .string()
                .email("E-mail không đúng.")
                .max(50, "E-mail tối đa 50 ký tự."),
            address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
            phone: yup
                .string()
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),
        });
        return {
            userLocal: { ...this.user },
            userFormSchema,
        };
    },
    methods: {
        submitUser() {
            this.$emit("submit:user", this.userLocal);
            console.log(this.userLocal);
        }
    },
};
</script>

<style scoped></style>
