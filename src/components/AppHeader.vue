<template>
    <nav class="navbar navbar-expand-lg navbar-light fw-semibold" style="background-color: bisque;">
        <div class="container">
            <router-link :to="{ name: 'bookstore' }" class="navbar-brand nav-link">
                Quản lý kho sách
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link :to="{ name: 'userpage' }" class="nav-link">
                            Quản lý người dùng
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link :to="{ name: 'borrowed', params: { id: userId }, }" class="nav-link">
                            Quản lý sách mượn
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link :to="{ name: 'publishpage' }" class="nav-link">
                            Quản lý nhà xuất bản
                        </router-link>
                    </li>

                </ul>

                <div class="d-flex dropdown fw-semibold">
                    <router-link v-if="userName" to="#" class="btn btn-outline-warning text-dark me-2"
                        @click="confirmLogout">
                        {{ userName }}
                    </router-link>
                    <span v-else class="btn btn-outline-warning text-dark dropdown-toggle" type="button" href="#"
                        role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Tài khoản
                    </span>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            userName: ''
        };
    },
    mounted() {
        this.getUserFromLocalStorage();
    },
    methods: {
        getUserFromLocalStorage() {
            const userName = localStorage.getItem('userName');
            if (userName) {
                this.userName = userName;
            }
        },
        confirmLogout() {
            if (confirm("Bạn có chắc muốn đăng xuất không?")) {
                this.logout();
            }
        },
        logout() {
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');

            this.userName = '';
            this.$router.push({ name: 'login' });
        }
    }
};
</script>