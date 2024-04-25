<template>
    <div class="card rounded">
        <Form @submit="submitBorrow" :validation-schema="borrowFormSchema" class="my-form">
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="name"><strong>Tên người mượn sách</strong></label>
                        <Field name="name" type="text" class="form-control" v-model="borrowLocal.name" />
                        <ErrorMessage name="name" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <label for="ngayMuon"><strong>Ngày Mượn</strong></label>
                        <Field name="ngayMuon" type="date" class="form-control" v-model="borrowLocal.ngayMuon" />
                        <ErrorMessage name="ngayMuon" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <label for="ngayTra"><strong>Ngày Trả</strong></label>
                        <Field name="ngayTra" type="date" class="form-control" v-model="borrowLocal.ngayTra" />
                        <ErrorMessage name="ngayTra" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <label for="status"><strong>Tình trạng</strong></label>
                        <select v-model="borrowLocal.status" class="form-control">
                            <option disabled value="">Chọn tình trạng</option>
                            <option v-for="option in statusOptions" :value="option.value" :key="option.value">
                                {{ option.text }}
                            </option>
                        </select>
                    </div>
                </div>

                <div class="col-md-8">
                    <div class="row" v-for="(book, index) in borrowLocal.books" :key="index">
                        <div class="col-md-9">
                            <div class="form-group">
                                <label><strong>{{ 'Tên sách ' + (index + 1) }}</strong></label>
                                <Field :name="'books[' + index + '].name'" type="text" class="form-control"
                                    v-model="book.name" />
                                <ErrorMessage :name="'books[' + index + '].name'" class="error-feedback" />
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label><strong>{{ 'Số lượng sách ' + (index + 1) }}</strong></label>
                                <Field :name="'books[' + index + '].quantity'" type="number" class="form-control"
                                    v-model="book.quantity" />
                                <ErrorMessage :name="'books[' + index + '].quantity'" class="error-feedback" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <button class="btn btn-warning me-1" type="submit" @click="submitBorrow">
                        <i class="fas fa-save"></i> Lưu
                    </button>
                </div>
            </div>
        </Form>
    </div>

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
    emits: ["submit:borrow", "delete:borrow"],
    props: {
        borrow: { type: Object, required: true }
    },
    data() {
        const borrowFormSchema = yup.object().shape({
            name: yup
                .string()
                .required('Tên người mượn sách không được để trống.'),
            ngayMuon: '',
            ngayTra: '',
            status: yup
                .string()
                .required('Tình trạng không được để trống.'),
            books: yup.array().of(
                yup.object().shape({
                    name: yup
                        .string()
                        .required('Tên sách không được để trống.'),
                    quantity: yup
                        .number()
                        .required('Số lượng không được để trống.')
                        .positive('Số lượng phải lớn hơn 0.')
                        .integer('Số lượng phải là số nguyên.')
                })
            )
        });

        return {
            borrowLocal: this.borrow,
            borrowFormSchema,
            statusOptions: [
                { value: 'Đang đợi duyệt', text: 'Đang đợi duyệt' },
                { value: 'Đang mượn', text: 'Đang mượn' },
                { value: 'Quá hạn', text: 'Quá hạn' },
                { value: 'Đã trả', text: 'Đã trả' },
                { value: 'Đã hủy', text: 'Đã hủy' }
            ],
        };
    },
    methods: {
        submitBorrow() {
            // console.log(this.borrowLocal);
            this.$emit("submit:borrow", this.borrowLocal);

        }
    },
};
</script>

<style scoped>
.my-form .form-group {
    margin-bottom: 20px;
}
</style>
