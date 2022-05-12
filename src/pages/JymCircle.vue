<template>
  <div @click="click">
    JymCircle
  </div>
</template>

<script setup>
import { getUserList } from '../api/user';

function click () {
  const info = {
    "user_id": "1415826708904488",
    "type": "followers"
  };
  
  getUserList(info).then(res => {
    console.log(res);
  });
}
</script>