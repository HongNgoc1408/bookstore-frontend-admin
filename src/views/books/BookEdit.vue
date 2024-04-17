<template>
    <div v-if="book" class="container">
        <router-link :to="{
        name: 'bookstore'
    }" class="nav-link text-primary"> Quay về </router-link>
        <h4> Hiệu chỉnh Liên hệ </h4>
        <BookForm :book="book" @submit:book="updateBook" />
        <p class="text-primary">{{ message }}</p>
    </div>
</template>

<script>
import BookForm from "@/components/books/BookForm.vue";
import BookService from "@/services/book.service";

export default {
    components: {
        BookForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            book: null,
            message: "",
        };
    },
    methods: {
        async getBook(id) {
            try {
                this.book = await BookService.get(id);
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
        async updateBook(data) {
            try {
                await BookService.update(this.book._id, data);
                this.message = "Sách được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.getBook(this.id);
        this.message = "";
    },
};
</script>