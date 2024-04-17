<template>
    <div class="container">
        <div class="row">
            <div class="col-6">
                <InputSearch v-model="searchText" />
            </div>
            <div class="col-5">
                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                    <button type="button" class="btn btn-success" @click="goToAddPublish">
                        <i class="fas fa-plus"></i> Thêm mới
                    </button>
                    <button type="button" class="btn btn-primary" @click="refreshList()">
                        <i class="fas fa-redo"></i> Làm mới
                    </button>
                    <button type="button" class="btn btn-danger" @click="removeAllPublishs">
                        <i class="fas fa-trash"></i> Xóa tất cả
                    </button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="mt-3 col-6">
                <h4>
                    <i class="fa fa-publish" aria-hidden="true"></i>
                    Nhà xuất bản
                </h4>

                <PublishList v-if="filteredPublishsCount > 0" :publishs="filteredPublishs"
                    v-model:activeIndex="activeIndex" />
                <p v-else>Không có nhà xuất bản nào.</p>
            </div>
            <div class="mt-3 col-6 gif-container">
                <div v-if="activePublish">
                    <h4>
                        <i class="fas fa-address-card"></i>
                        Chi tiết nhà xuất bản

                    </h4>
                    <PublishCard :publish="activePublish" />
                    <router-link :to="{
                        name: 'publish.edit',
                        params: { id: activePublish._id },
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
import PublishCard from "@/components/publish/PublishCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import PublishList from "@/components/publish/PublishList.vue";
import PublishService from "@/services/publish.service";

export default {
    components: {
        PublishCard,
        InputSearch,
        PublishList,
    },
    data() {
        return {
            publishs: [],
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
        publishStrings() {
            return this.publishs.map((publish) => {
                const { name, address } = publish;
                return [name, address].join("");
            });
        },

        filteredPublishs() {
            if (!this.searchText) return this.publishs;
            return this.publishs.filter((_publish, index) =>
                this.publishStrings[index].includes(this.searchText)
            );
        },
        activePublish() {
            if (this.activeIndex < 0) return null;
            return this.filteredPublishs[this.activeIndex];
        },
        filteredPublishsCount() {
            return this.filteredPublishs.length;
        },
    },
    methods: {
        async removeAllPublishs() {
            if (confirm("Bạn muốn xóa tất cả nhà xuất bản?")) {
                try {
                    await PublishService.deleteAll();
                    await this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        async handleDeletePublish(deletedPublish) {
            this.publishs = this.publishs.filter(publish => publish._id !== deletedPublish._id);
        },
        async retrievePublishs() {
            try {
                this.publishs = await PublishService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrievePublishs();
            this.activeIndex = -1;
        },
        goToAddPublish() {
            this.$router.push({ name: "publish.add" });
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