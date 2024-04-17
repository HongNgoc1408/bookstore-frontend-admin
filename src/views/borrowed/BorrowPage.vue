<template>
    <div class="container">
        <div class="col-6">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3">
            <h4 class="mb-4">
                <i class="fas fa-clipboard mr-2"></i> Đơn mượn sách
            </h4>
            <BorrowList v-if="filteredBorrowsCount > 0" :borrows="filteredBorrows" v-model:activeIndex="activeIndex" />
            <p v-else class="text-muted" style="min-width: 750px;">Không có đơn mượn nào.</p>
        </div>
    </div>
</template>


<script>
import InputSearch from '@/components/InputSearch.vue';
import BorrowService from '@/services/borrow.service';
import BorrowList from '@/components/borrowed/BorrowList.vue';

export default {
    components: {
        InputSearch,
        BorrowList,
    },
    data() {
        return {
            borrows: [],
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
        borrowStrings() {
            return this.borrows.map((borrow) => {
                const { name, status } = borrow;
                return [name, status].join("");
            });
        },
        filteredBorrows() {
            if (!this.searchText) return this.borrows;
            return this.borrows.filter((_borrow, index) =>
                this.borrowStrings[index].includes(this.searchText)
            );
        },
        activeBorrow() {
            if (this.activeIndex < 0) return null;
            return this.filteredBorrows[this.activeIndex];
        },
        filteredBorrowsCount() {
            return this.filteredBorrows.length;
        },
    },
    methods: {
        async retrieveBorrows() {
            try {
                this.borrows = await BorrowService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveBorrows();
            this.activeIndex = -1;
        }
    },
    mounted() {
        this.refreshList();
    },

};
</script>
