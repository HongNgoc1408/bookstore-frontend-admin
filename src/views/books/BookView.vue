<template>
    <div v-if="book" class="container">
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
        <h4>
            <i class="fa fa-book" aria-hidden="true"></i>
            Chi tiết Sách
        </h4>
        <BookCard :book="book" />
    </div>
</template>

<script>
import BookCard from "@/components/books/BookCard.vue";
import BookService from "@/services/book.service";

export default {
    components: {
        BookCard,
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
    },
    created() {
        this.getBook(this.id);
        this.message = "";
    },
};
</script>