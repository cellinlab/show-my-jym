<template>
  <div class="jymcircle-pages">
    <div class="canvas-container">
      <canvas id="canvas" width="1600" height="1600"
        style="padding: 0px; margin: 0px; border: 0px; background: transparent; width: 856.008px; height: 856.008px; display: block;"></canvas>
    </div>
    <div class="operation-container">
      <div class="btn-groups">
        <a-button @click="handleReset">Reset</a-button>
        <a-button @click="handleDownload">Download</a-button>
      </div>
      <div class="sponor-tips">
        <p>JYM 由个人开发运维。如果喜欢这个应用的话，欢迎<a href="https://www.cellinlab.xyz/" target="_blank">送杯奶茶☕</a>支持下开发者💗</p>
      </div>
      <div class="custom-options">
        <a-collapse  v-model:activeKey="collapseActiveKey">
          <a-collapse-panel key="1" header="Customise colours">
            背景颜色：<input type="color" :value="bgColor" @change="handleBgColorChange" />
          </a-collapse-panel>
          <a-collapse-panel key="2" header="Who's in my circles?">
            <div class="user-url-list">
              <template v-for="user in userlist" :key="user.user_id">
                <p>
                  <a :href="`https://juejin.cn/user/${user.user_id}`" target="_blank">@{{user.user_name}}</a>
                </p>
              </template>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import html2canvas from 'html2canvas';

import { getUserList } from '../api/user';
import {
  setBackground,
  drawCircleImage,
} from '../utils/canvas';

const userlist = reactive([]);
const collapseActiveKey = ref(['1']);
const bgColor = ref('#1e80ff');
const router = useRouter();

onMounted(async () => {
  const info = {
    "user_id": "1415826708904488",
    "type": "followees"
  };
  const userlist_res = await getUserList(info);
  userlist.push(...userlist_res);
  setTimeout(() => {
    draw();
  }, 1000);
});

watchEffect(
  () => {
    draw();
  },
  {
    flush: 'post',
  }
);

function draw () {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  // 设置背景色
  setBackground(ctx, bgColor.value);
  
  const img = new Image(100, 100);
  img.style = 'border-radius: 50%;';
  img.setAttribute('crossOrigin', 'anonymous');
  img.onload = () => {
    drawCircleImage(ctx, 40, 40, 40, img);
  };
  img.src = 'https://p6-passport.byteacctimg.com/img/mosaic-legacy/3791/5070639578~300x300.image';
}
function handleDownload () {
  const canvas = document.getElementById('canvas');
  html2canvas(canvas).then(canvas => {
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = 'show-my-jym.png';
    a.click();
  });
}
function handleBgColorChange (e) {
  bgColor.value = e.target.value;
}
function handleReset () {
  bgColor.value = '#1e80ff';
}
</script>
<style lang="scss" scoped>
.jymcircle-pages {
  background: #000000;
  display: flex;

  ::-webkit-scrollbar {
    width: 20px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    height: 80px;
    background-color: #d6dee1;
    border-radius: 20px;
    border: 6px solid transparent;
    background-clip: content-box;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #a8bbbf;
  }

  .canvas-container {
    flex: 1;
    background: #181818;
    padding: 20px;
    margin: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .operation-container {
    width: 20%;
    background: #181818;
    padding: 20px;
    margin: 10px;

    div + div {
      margin-top: 20px;
    }
    .btn-groups {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    
    .sponor-tips {
      color: #fff;
      padding: 10px;
      border: 1px solid #fff;
      border-radius: 10px;
      a {
        color: #4495ff;
      }
    }
    .custom-options {
      .user-url-list {
        height: 350px;
        overflow: scroll;
      }
    }
  }
}
</style>