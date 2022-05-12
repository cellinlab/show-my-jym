<template>
  <div class="home-pages">
    <div class="nav-container">
      <p>输入掘金主页地址</p>
      <div class="input-group">
        <a-input v-model:value="url"></a-input>
        <a-button type="primary" @click="handleCreate">Create</a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const url = ref('https://juejin.cn/user/8888888888888888');
const router = useRouter();

const user_id = computed(() => {
  return url.value.split('/').pop();
});

function handleCreate() {
  router.push({
    path: `/circle`,
    query: {
      user_id: user_id.value,
    },
  });
}
</script>

<style lang="scss" scoped>
.home-pages {
  height: 100vh;
  .nav-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p,
    .input-group {
      width: 40%;
    }
    .input-group {
      display: flex;
    }
  }
}
</style>