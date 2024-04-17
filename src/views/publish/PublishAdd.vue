<template>
    <div class="page">
        <h4>Thêm nhà xuất bản</h4>
        <PublishForm :publish="newPublish" @submit:publish="addPublish" />
    </div>
</template>

<script>
import PublishForm from "@/components/publish/PublishForm.vue";
import PublishService from "@/services/publish.service";

export default {
    components: {
        PublishForm,
    },
    data() {
        return {
            newPublish: {
                name: '',
                address: ''
            },
        }
    },
    methods: {
        async addPublish(data) {
            try {
                await PublishService.create(data);
                alert("Nhà xuất bản được thêm thành công.");
                this.$router.push({ name: "publishpage" });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>