<template>
    <div>
        <button @click="exportToExcelBorrow">Export Excel</button>
        <div class="mt-3">
            <div v-for="(borrow) in sortedBorrows" :key="borrow._id" class="accordion" :id="'accordion_' + borrow._id">
                <div class="accordion-item">
                    <h2 class="accordion-header">

                        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                            :data-bs-target="'#collapse_' + borrow._id" aria-expanded="true"
                            aria-controls="'collapse_' + borrow._id">
                            <div class="d-flex w-100 justify-content-between list-group-item">
                                <span class="col">
                                    <h5 class="mb-1">Mã đơn mượn: {{ borrow._id }}</h5>
                                    <h6>Tên người mượn: {{ borrow.name }}</h6>
                                    <h6>Mã số: {{ borrow.userId }}</h6>
                                </span>
                                <span class="col">
                                    <h6>Ngày mượn: {{ borrow.ngayMuon }}</h6>
                                    <h6>Ngày trả: {{ borrow.ngayTra }}</h6>
                                </span>


                                <p class="mb-1">
                                <h6>
                                    <span :class="{
                                        'text-warning': borrow.status === 'Đang đợi duyệt',
                                        'text-info': borrow.status === 'Đang mượn',
                                        'text-primary': borrow.status === 'Đã trả',
                                        'text-danger': borrow.status === 'Đã hủy' || borrow.status === 'Quá hạn'
                                    }">
                                        {{ borrow.status }}
                                    </span>
                                </h6>
                                </p>
                            </div>
                        </button>
                    </h2>
                    <div :id="'collapse_' + borrow._id" class="accordion-collapse collapse show"
                        :data-bs-parent="'#accordion_' + borrow._id">
                        <div class="accordion-body">
                            <div class="row">
                                <div class="col-10">
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item" v-for="(book, bookIndex) in borrow.books"
                                            :key="book.bookId">
                                            <strong>{{ 'Sách ' + (bookIndex + 1) }}:</strong>
                                            {{ book.name }} - <strong>Số lượng:</strong> {{ book.quantity }}
                                        </li>
                                    </ul>
                                </div>
                                <div class="col-2 d-flex justify-content-end align-items-center">
                                    <router-link :to="{ name: 'borrow.edit', params: { id: borrow._id }, }">
                                        <button class="btn btn-warning" style="white-space: nowrap;">
                                            <i class="fas fa-edit"></i> Hiệu chỉnh
                                        </button>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import XLSX from 'xlsx';

export default {
    props: {
        borrows: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    computed: {
        sortedBorrows() {
            return this.borrows.slice().sort((a, b) => {
                const statusOrder = {
                    'Đang đợi duyệt': 1,
                    'Quá hạn': 2,
                    'Đang mượn': 3,
                    'Đã trả': 4,
                    'Đã hủy': 5,

                };
                return statusOrder[a.status] - statusOrder[b.status];
            });
        }
    },
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
        exportToExcelBorrow() {

            const data = [
                ["STT", "Mã đơn mượn", "Tên người mượn", "Mã số", "Ngày mượn", "Ngày trả", "Trạng thái", "Tên sách", "Số lượng"]
            ];

            this.sortedBorrows.forEach((borrow, index) => {
                borrow.books.forEach((book, bookIndex) => {
                    const rowData = [
                        index + 1,
                        borrow._id,
                        borrow.name,
                        borrow.userId,
                        borrow.ngayMuon,
                        borrow.ngayTra,
                        borrow.status,
                        book.name,
                        book.quantity
                    ];
                    data.push(rowData);
                });
            });

            const ws = XLSX.utils.aoa_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            XLSX.writeFile(wb, 'borrows.xlsx');
        }
    }


};
</script>