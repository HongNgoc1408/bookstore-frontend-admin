<template>
    <div class="page">
        <p>
            Oops, không thể tìm thấy trang. Trở về
            <router-link v-if="$route.path.match('/admin')" :to="{ name: 'bookstore' }">Trang chủ.</router-link>
            <router-link v-else to="/">Login</router-link>
        </p>
    </div>
</template>