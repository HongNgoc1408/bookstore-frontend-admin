<template>
    <div class="container">
        <h4 class="text-center">Hiệu chỉnh mượn sách</h4>
        <div class="mx-auto">
            <BorrowForm :borrow="borrow" @submit:borrow="updateBorrow" />
            <p class="text-center">{{ message }}</p>
        </div>
    </div>
</template>


<script>
import BorrowForm from "@/components/borrowed/BorrowForm.vue";
import bookService from "@/services/book.service";
import BorrowService from "@/services/borrow.service";

export default {
    components: {
        BorrowForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            borrow: null,
            message: "",
        };
    },
    methods: {
        async getBorrow(id) {
            try {
                this.borrow = await BorrowService.get(id);
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

        async updateBorrow(data) {
            try {
                console.log(data.status);
                if (data.status === 'Đã trả') {
                    for (const book of data.books) {
                        const bookDetails = await bookService.get(book.bookId);
                        console.log("bookDetails", bookDetails);
                        if (bookDetails && (bookDetails.quantity > 0)) {
                            const updatedCountInStock = bookDetails.countInStock + book.quantity;
                            console.log("updatedCountInStock", updatedCountInStock);
                            const updatedQuantity = bookDetails.quantity - book.quantity;
                            console.log("updatedQuantity", updatedQuantity);
                            await bookService.update(book.bookId, { countInStock: updatedCountInStock, quantity: updatedQuantity });
                        }
                    }
                }

                const returnDate = new Date(data.ngayTra);
                const currentDate = new Date();
                // console.log(currentDate)
                if (returnDate < currentDate) {
                    data.status = 'Quá hạn';
                }

                await BorrowService.update(this.borrow._id, data);
                alert("Thông tin đã được thay đổi.");
                this.$router.push({ name: "borrowed" });
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.getBorrow(this.id);
        this.message = "";
    },
};
</script>

<style scoped>
.page {
    text-align: left;
    max-width: 100px;
}
</style>