<template>
    <button @click="exportToExcelPublisher">Export Excel</button>
    <ul class="list-group  mt-3">
        <li class="list-group-item list-group-item-action list-group-item-secondary"
            v-for="(publish, index) in publishs" :key="publish._id" :class="{ active: index === activeIndex }"
            @click="updateActiveIndex(index)" @delete:publish="deleteUser(publish)">
            {{ publish.name }}
            <span class="d-flex m-0 p-0" v-if="publish._id">
                <button type="button" class="ms-auto btn btn-danger" @click.stop="deleteUser(publish)">
                    Xóa
                </button>
            </span>
        </li>
    </ul>
</template>

<script>
import publishService from '@/services/publish.service';
import XLSX from 'xlsx';


export default {
    props: {
        publishs: { type: Array, default: [] },

        activeIndex: { type: Number, default: -1 },
    },

    emits: ["update:activeIndex", "delete: publish"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
        async deleteUser(publish) {
            if (confirm("Bạn muốn xóa nhà xuất bản này?")) {
                try {
                    await publishService.delete(publish._id);
                    this.$emit("delete:publish", publish);
                    window.location.reload();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        exportToExcelPublisher() {

            const data = [
                ["STT", "Tên nhà xuất bản", "Địa chỉ"]
            ];

            this.publishs.forEach((publish, index) => {
                const rowData = [
                    index + 1,
                    publish.name,
                    publish.address,
                ];
                data.push(rowData);
            });

            const ws = XLSX.utils.aoa_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            XLSX.writeFile(wb, 'publisher.xlsx');
        }
    }
};
</script>
