<template>
    <Form @submit="submitBook" :validation-schema="bookFormSchema">
        <div class="form-group">
            <label for="image"><strong>Ảnh</strong></label>
            <Field name="image" type="text" class="form-control" v-model="bookLocal.image" />
            <ErrorMessage name="image" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="name"><strong>Tên</strong></label>
            <Field name="name" type="text" class="form-control" v-model="bookLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="author"> <strong>Tác giả</strong></label>
            <Field name="author" type="text" class="form-control" v-model="bookLocal.author" />
            <ErrorMessage name="author" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="publisher"> <strong>Nhà xuất bản</strong></label>
            <select v-model="bookLocal.publisher" class="form-control">
                <option disabled value="">Chọn nhà xuất bản</option>
                <option v-for="publisher in publishers" :key="publisher.id" :value="publisher.name">{{ publisher.name }}
                </option>
            </select>
            <ErrorMessage name="publisher" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="year"><strong>Năm xuất bản</strong></label>
            <Field name="year" type="number" class="form-control" v-model="bookLocal.year" />
            <ErrorMessage name="year" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="type"> <strong>Thể loại</strong></label>
            <Field name="type" type="text" class="form-control" v-model="bookLocal.type" />
            <ErrorMessage name="type" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="quantity"><strong>Số lượng trong kho</strong></label>
            <Field name="quantity" type="number" class="form-control" v-model="bookLocal.countInStock" />
            <ErrorMessage name="quantity" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="description"><strong>Mô tả</strong></label>
            <textarea name="description" type="text" class="form-control" v-model="bookLocal.description"
                rows="5"></textarea>
            <ErrorMessage name="description" class="error-feedback" />
        </div>

        <div class="form-group my-3">
            <button class="btn btn-warning form-control" @click="submitBook">
                <i class="fas fa-save"></i> Lưu
            </button>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import PublishService from "./../../services/publish.service"

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:book", "delete:book"],
    props: {
        book: { type: Object, required: true }
    },
    mounted() {
        this.getPublish();
    },
    data() {
        const bookFormSchema = yup.object().shape({
            image: yup
                .string()
                .required("Ảnh phải có giá trị."),
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            type: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            year: yup
                .number()
                .min(1000)
                .max(2024)
                .required("Năm xuất bản phải có giá trị"),
            quantity: yup
                .string()
                .required("Số lượng phải có giá trị"),
            author: yup
                .string()
                .required("Tác giả phải có giá trị"),
            publisher: yup
                .string()
        });
        return {
            bookLocal: this.book,
            bookFormSchema,
            publishers: [],
        };
    },
    mounted() {
        this.getPublish();
    },
    methods: {
        async getPublish() {
            this.publishers = await PublishService.getAll();
        },
        submitBook() {
            this.$emit("submit:book", this.bookLocal);
        },
        deleteBook() {
            this.$emit("delete:book", this.bookLocal.id);
        },
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>