<template>
    <ul class="list-group">
        <li class="list-group-item list-group-item-action list-group-item-secondary" v-for="(book, index) in books"
            :key="book._id" :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)"
            @delete:book="deleteBook(book)">
            {{ book.name }}
            <span class="d-flex m-0 p-0" v-if="book._id">
                <button type="button" class="ms-auto btn btn-danger" @click.stop="deleteBook(book)">
                    Xóa
                </button>
            </span>
        </li>
    </ul>
</template>

<script>
import bookService from '@/services/book.service';

export default {
    props: {
        books: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex", "delete:book"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
        async deleteBook(book) {
            if (confirm("Bạn muốn xóa sách này?")) {
                try {
                    await bookService.delete(book._id);
                    this.$emit("delete:book", book); 
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
};
</script>
