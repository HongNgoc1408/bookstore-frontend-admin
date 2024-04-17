<template>
    <Form @submit="submitPublish" :validation-schema="publishFormSchema">

        <div class="mb-3">
            <label for="name"><strong>Tên Nhà Xuất Bản</strong></label>
            <Field type="text" class="form-control" id="name" name="name" placeholder="" v-model="publishLocal.name"
                required />
            <ErrorMessage name="name" class="error-feedback" />
        </div>

        <div class="mb-3">
            <label for="address"><strong>Địa chỉ</strong></label>
            <Field type="text" class="form-control" id="address" name="address" placeholder="1234 Main St"
                v-model="publishLocal.address" required />
            <ErrorMessage name="address" class="error-feedback" />
        </div>

        <hr class="mb-4" />

        <div class="form-group">
            <button class="btn btn-primary form-control">
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
    emits: ["submit:publish", "delete:publish"],
    props: {
        publish: { type: Object, required: true }
    },
    data() {
        const publishFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
        });
        return {
            publishLocal: this.publish,
            publishFormSchema,
        };
    },
    methods: {
        submitPublish() {
            this.$emit("submit:publish", this.publishLocal);
        }
    },
};
</script>
