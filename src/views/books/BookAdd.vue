<template>
    <div class="container">
        <h6 class="mb-3 text-primary">
            <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><router-link :to="{ name: 'bookstore' }" class="nav-link">
                            Trang chủ
                        </router-link></li>
                    <li class="breadcrumb-item active" aria-current="page">Sách</li>
                </ol>
            </nav>
        </h6>
        <h4 class="text-center">Thêm Sách</h4>
        <div class="col-6 offset-3">
            <BookForm :book="newBook" @submit:book="addBook" />
        </div>
    </div>

</template>

<script>
import BookForm from "@/components/books/BookForm.vue";
import BookService from "@/services/book.service";
export default {
    components: {
        BookForm,
    },
    data() {
        return {
            newBook: {
                image: '',
                name: '',
                quantity: '',
                description: '',
                publish: '',
                year: '',
                author: '',
                type: '',
                favorite: false,
            },
        }
    },
    methods: {
        async addBook(data) {
            try {
                await BookService.create(data);
                alert("Sách được thêm thành công.");
                this.$router.push({ name: "bookstore" });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>