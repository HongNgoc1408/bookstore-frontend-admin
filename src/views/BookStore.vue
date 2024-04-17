<template>
    <div class="container">
        <div class="row">
            <div class="col-6">
                <InputSearch v-model="searchText" />
            </div>
            <div class="col-5">
                <!-- <div class="row"> -->
                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                    <button type="button" class="btn btn-success" @click="goToAddBook">
                        <i class="fas fa-plus"></i> Thêm mới
                    </button>
                    <button type="button" class="btn btn-primary" @click="refreshList()">
                        <i class="fas fa-redo"></i> Làm mới
                    </button>
                    <button type="button" class="btn btn-danger" @click="removeAllBooks">
                        <i class="fas fa-trash"></i> Xóa tất cả
                    </button>
                </div>
            </div>
            <!-- </div> -->
        </div>
        <div class="row">
            <div class="mt-3 col-6">
                <h4>
                    <i class="fa fa-th-list" aria-hidden="true"></i>
                    Sách
                </h4>

                <BookList :books="books" :activeIndex="activeIndex" @delete:book="handleDeleteBook"
                    v-if="filteredBooksCount > 0" books="filteredBooks" v-model:activeIndex="activeIndex" />
                <p v-else>Không có sách nào.</p>
            </div>
            <div class="mt-3 col-6 gif-container">
                <div v-if="activeBook">
                    <h4>
                        <i class="fa fa-book" aria-hidden="true"></i>
                        Chi tiết Sách
                    </h4>
                    <BookCard :book="activeBook" />
                    <router-link :to="{
                    name: 'book.edit',
                    params: { id: activeBook._id },
                }">
                        <button type="button" class="mt-2 btn btn-warning">
                            <i class="fas fa-edit"></i> Hiệu chỉnh
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BookCard from "@/components/books/BookCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import BookList from "@/components/books/BookList.vue";
import BookService from "@/services/book.service";

export default {
    components: {
        BookCard,
        InputSearch,
        BookList,
    },
    data() {
        return {
            books: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        bookStrings() {
            return this.books.map((book) => {
                const { name, author, NXB, price, description, favorite } = book;
                return [name, author, NXB, price, description, favorite].join("");
            });
        },

        filteredBooks() {
            if (!this.searchText) return this.books;
            return this.books.filter((_book, index) =>
                this.bookStrings[index].includes(this.searchText)
            );
        },
        activeBook() {
            if (this.activeIndex < 0) return null;
            return this.filteredBooks[this.activeIndex];
        },
        filteredBooksCount() {
            return this.filteredBooks.length;
        },
    },
    methods: {
        async retrieveBooks() {
            try {
                this.books = await BookService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        async refreshList() {
            await this.retrieveBooks();
            this.activeIndex = -1;
        },
        async removeAllBooks() {
            if (confirm("Bạn muốn xóa tất cả Sách?")) {
                try {
                    await BookService.deleteAll();
                    await this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        async handleDeleteBook(deletedBook) {
            this.books = this.books.filter(book => book._id !== deletedBook._id);
        },
        goToAddBook() {
            this.$router.push({ name: "book.add" });
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>


<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>