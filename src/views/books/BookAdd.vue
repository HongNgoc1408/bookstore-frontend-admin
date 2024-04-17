<template>
    <div class="page">
        <h4>Thêm Sách</h4>
        <BookForm :book="newBook" @submit:book="addBook" />
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
                window.alert("Sách được thêm thành công.");

            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>