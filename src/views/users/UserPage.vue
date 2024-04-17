<template>
    <div class="container">
        <div class="row">
            <div class="col-6">
                <InputSearch v-model="searchText" />
            </div>
            <div class="col-5">
                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                    
                    <button type="button" class="btn btn-primary" @click="refreshList()">
                        <i class="fas fa-redo"></i> Làm mới
                    </button>
                    <button type="button" class="btn btn-danger" @click="removeAllUsers">
                        <i class="fas fa-trash"></i> Xóa tất cả
                    </button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="mt-3 col-6">
                <h4>
                    <i class="fa fa-user" aria-hidden="true"></i>
                    Người dùng
                </h4>

                <UserList v-if="filteredUsersCount > 0" :users="filteredUsers" v-model:activeIndex="activeIndex" />
                <p v-else>Không có người dùng nào.</p>
            </div>
            <div class="mt-3 col-6 gif-container">
                <div v-if="activeUser">
                    <h4>
                        <i class="fas fa-address-card"></i>
                        Chi tiết Người dùng

                    </h4>
                    <UserCard :user="activeUser" />
                    <router-link :to="{
                        name: 'user.edit',
                        params: { id: activeUser._id },
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
import UserCard from "@/components/users/UserCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import UserList from "@/components/users/UserList.vue";
import UserService from "@/services/user.service";

export default {
    components: {
        UserCard,
        InputSearch,
        UserList,
    },
    data() {
        return {
            users: [],
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
        userStrings() {
            return this.users.map((user) => {
                const { name, email, phone, address } = user;
                return [name, email, phone, address].join("");
            });
        },

        filteredUsers() {
            if (!this.searchText) return this.users;
            return this.users.filter((_user, index) =>
                this.userStrings[index].includes(this.searchText)
            );
        },
        activeUser() {
            if (this.activeIndex < 0) return null;
            return this.filteredUsers[this.activeIndex];
        },
        filteredUsersCount() {
            return this.filteredUsers.length;
        },
    },
    methods: {
        async removeAllUsers() {
            if (confirm("Bạn muốn xóa tất cả người dùng?")) {
                try {
                    await UserService.deleteAll();
                    await this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        async handleDeleteBook(deletedBook) {
            this.books = this.books.filter(book => book._id !== deletedBook._id);
        },
        async retrieveUsers() {
            try {
                this.users = await UserService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveUsers();
            this.activeIndex = -1;
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