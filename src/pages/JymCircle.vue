<template>
  <div class="jymcircle-pages">
    <div class="canvas-container">
      <canvas id="canvas" width="1600" height="1600"
        style="padding: 0px; margin: 0px; border: 0px; background: transparent; width: 856.008px; height: 856.008px; display: block;"></canvas>
    </div>
    <div class="operation-container">
      <div class="btn-home">
        <a-button type="primary" @click="router.push('/')">Home</a-button>
      </div>
      <div class="btn-groups">
        <a-button type="primary" @click="handleReset">Reset</a-button>
        <a-button type="primary" @click="handleDownload">Download</a-button>
      </div>
      <div class="sponor-tips">
        <p>JYM 由个人开发运维。如果喜欢这个应用的话，欢迎<a href="https://www.cellinlab.xyz/" target="_blank">送杯奶茶☕</a>支持下开发者💗</p>
      </div>
      <div class="custom-options">
        <a-collapse  v-model:activeKey="collapseActiveKey">
          <a-collapse-panel key="1" header="Customise options">
            背景颜色：<input type="color" :value="bgColor" @change="handleBgColorChange" />
            <br />
            类型：
            <a-radio-group v-model:value="user_type">
              <a-radio :value="'followees'">我关注</a-radio>
              <a-radio :value="'followers'">关注我</a-radio>
            </a-radio-group>
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
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import html2canvas from 'html2canvas';
import { message } from 'ant-design-vue';

import { getUserList } from '../api/user';
import {
  setBackground,
  drawCircleImage,
  drawFont,
  loadImage,
} from '../utils/canvas';
import { getCirclePoints } from '../utils/polygon';

const userlist = reactive([]);
const collapseActiveKey = ref(['1']);
const bgColor = ref('#1e80ff');
const user_type = ref('followees');
const router = useRouter();
const route = useRoute();

const userinfo = computed(() => {
  return userlist.find(user => user.user_id === route.query.user_id);
});

onMounted(() => {
  loadData();
});

watch(userlist, (newValue, oldValue) => {
  if (newValue.length > 0) {
    draw();
  }
});
watch(user_type, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    loadData();
  }
});


async function loadData() {
  const info = {
    "user_id": "1415826708904488",
    "type": user_type.value,
  };
  const { user_id } = route.query;
  info.user_id = user_id;
  const requestMessage = message.loading('Data loading...', 0);
  const userlist_res = await getUserList(info);
  userlist.push(...userlist_res);
  requestMessage();
}

async function draw () {
  const hideMessage = message.loading('Data rendering...', 0);
  
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const { width, height } = ctx.canvas;

  // 设置背景色
  setBackground(ctx, bgColor.value);

  // 用户在中心
  if (userinfo.value) {
    ctx.save();
    const { width, height } = ctx.canvas;
    // 转换坐标
    ctx.translate(width / 2, height / 2);

    const { avatar_large } = userinfo.value;
    const img = await loadImage(avatar_large);
    drawCircleImage(ctx, 0, 0, 60, img);

    let circle_radius = 120;
    let circle_num = 1;
    let user_count = 8;
    let circlePoints = getCirclePoints({x: 0, y: 0}, circle_radius, circle_num * user_count);
    // 关注列表环绕
    for (let i = 1; i < userlist.length; i++) {
      const { avatar_large } = userlist[i];
      if (avatar_large.includes('passport')) {
        if (circlePoints.length == 0) {
          circle_num++;
          circlePoints = getCirclePoints({x: 0, y: 0}, circle_radius + (circle_num -1) * 100, circle_num * user_count - circle_num);
        }
        const {x, y} = circlePoints.pop();
        const img = await loadImage(avatar_large);
        drawCircleImage(ctx, x, y, 40, img);
      }
    }
    ctx.restore();
  }
  
  drawFont(ctx, 20, height - 20, 'jym.cellinlab.xyz', bgColor.value);
  hideMessage();
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
    .btn-home {
      text-align: center;
      .ant-btn {
        width: 88%;
      }
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