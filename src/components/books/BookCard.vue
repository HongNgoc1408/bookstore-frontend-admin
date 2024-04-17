<script>
export default {
    props: {
        book: { type: Object, required: true },
    },
};
</script>

<template>
    <div class="row">
        <div class="col-4">
            <div class="p-1">
                <img v-if="book.image" v-bind:src="book.image" alt="" width="100%">
                <span v-else class="fas fa-times"></span>
            </div>
        </div>
        <div class="col-4">
            <div class="p-1">
                <strong>Tên:</strong>
                {{ book.name }}
            </div>
            <div class="p-1">
                <strong>Tác giả:</strong>
                {{ book.author }}
            </div>
            <div class="p-1">
                <strong>Nhà xuất bản:</strong>
                {{ book.publisher }}
            </div>
            <div class="p-1">
                <strong>Năm xuất bản:</strong>
                {{ book.year }}
            </div>
            <div class="p-1">
                <strong>Thể loại:</strong>
                {{ book.type }}
            </div>
            <div class="p-1">
                <strong>Số lượng trong kho:</strong>
                {{ book.countInStock }}
            </div>
            <div class="p-1">
                <strong>Số lượng đã mượn:</strong>
                {{ book.quantity }}
            </div>
        </div>
        <div class="col-4">
            <div class="p-1">
                <strong>Mô tả:</strong>
                {{ book.description }}
            </div>
        </div>
    </div>

</template>