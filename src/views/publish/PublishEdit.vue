<template>
    <div v-if="publish" class="container">
        <h4 class="text-center">Hiệu chỉnh nhà xuất bản</h4>
        <div class="col-md-6 mx-auto">
            <PublishForm :publish="publish" @submit:publish="updatePublish" @delete:publish="deletePublish" />
            <p class="text-primary alert">{{ message }}</p>
        </div>
    </div>
</template>

<script>
import PublishForm from "@/components/publish/PublishForm.vue";
import PublishService from "@/services/publish.service";

export default {
    components: {
        PublishForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            publish: null,
            message: "",
        };
    },
    methods: {
        async getPublish(id) {
            try {
                this.publish = await PublishService.get(id);
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
        async updatePublish(data) {
            try {
                await PublishService.update(this.publish._id, data);
                this.message = "Người dùng được cập nhật thành công.";
                this.$router.push({ name: "publishpage" });
            } catch (error) {
                console.log(error);
            }
        },
        async deletePublish() {
            if (confirm("Bạn muốn xóa người dùng này?")) {
                try {
                    await PublishService.delete(this.publish._id);
                    this.$router.push({ name: "publishpage" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getPublish(this.id);
        this.message = "";
    },
};
</script>