<template>
    <button @click="exportToExcel" class="btn btn-warning">Export Excel</button>
    <table class="table overflow-auto ">
        <thead>
            <tr>
                <th scope="col">STT</th>
                <th scope="col">Ảnh</th>
                <th scope="col">Tên</th>
                <th scope="col">Tác giả</th>
                <th scope="col" class="text-nowrap">Nhà xuất bản</th>
                <th scope="col" class="text-nowrap">Năm xuất bản</th>
                <th scope="col" class="text-nowrap">Thể loại</th>
                <th scope="col" class="text-nowrap">Trong kho</th>
                <th scope="col" class="text-nowrap">Đã mượn</th>
                <th scope="col" class="text-nowrap">Mô tả</th>
                <th scope="col" class="text-nowrap">Hành động</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(book, index) in books" :key="book._id" :class="{ active: index === activeIndex }"
                @click="updateActiveIndex(index)" @delete:book="deleteBook(book)">
                <th scope="row">{{ index + 1 }}</th>
                <td>
                    <img v-if="book.image" v-bind:src="book.image" alt="" class="w-100">
                    <span v-else class="fas fa-times"></span>
                </td>
                <td scope="row"> {{ book.name }}</td>
                <td scope="row"> {{ book.author }}</td>
                <td scope="row"> {{ book.publisher }}</td>
                <td scope="row">{{ book.year }}</td>
                <td scope="row"> {{ book.type }}</td>
                <td scope="row">{{ book.countInStock }}</td>
                <td scope="row">{{ book.quantity }}</td>
                <td scope="row" class="text-truncate" style="max-width: 150px;"> {{ book.description }}</td>
                <td scope="row">
                    <div class="col my-2">
                        <router-link :to="{
                            name: 'book.view',
                            params: { id: book._id },
                        }" class="me-2">
                            <button type="button" class="mx-2 btn btn-primary">
                                <i class="fa-solid fa-eye"></i>
                            </button>
                        </router-link>
                    </div>
                    <div class="col my-2">
                        <router-link :to="{
                            name: 'book.edit',
                            params: { id: book._id },
                        }" class="me-2">
                            <button type="button" class="mx-2 btn btn-warning">
                                <i class="fas fa-edit"></i>
                            </button>
                        </router-link>
                    </div>
                    <div class="col my-2">
                        <button type="button" class="mx-2 btn btn-danger" @click.stop="deleteBook(book)">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import bookService from '@/services/book.service';
import XLSX from 'xlsx';

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
        },
        exportToExcel() {
            const data = [
                ["STT", "Ảnh", "Tên", "Tác giả", "Nhà xuất bản", "Năm xuất bản", "Thể loại", "Trong kho", "Đã mượn"]
            ];

            this.books.forEach((book, index) => {
                const rowData = [
                    index + 1,
                    book.image ? book.image : "",
                    book.name,
                    book.author,
                    book.publisher,
                    book.year,
                    book.type,
                    book.countInStock,
                    book.quantity,

                ];
                data.push(rowData);
            });

            const ws = XLSX.utils.aoa_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            XLSX.writeFile(wb, 'books.xlsx');
        }
    }
};
</script>
