<template>
  <div class="bg" :style="{ 'background-image': `url(${backURl.url})` }">
    <div class="demo-login">
      <Login @on-submit="handleSubmit">
        <UserName name="username" />
        <Password name="password" />
        <Submit />
      </Login>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { userStore } from "../pinia/user/index";
import { storeToRefs } from "pinia";
let captcha = ref("captcha1.png");
const route = useRouter();

const userstate = userStore();

async function handleSubmit(valid: any, { username, password, captcha }: any) {
  if (valid) {
    // this.$Modal.info({
    //     title: '输入的内容如下：',
    //     content: 'username: ' + username + ' | password: ' + password + ' | captcha: ' + captcha
    // });
    await login({ name: username, pwd: password });
  }
}
const { proxy } = getCurrentInstance() as any;
proxy.$axios({
  url: "v1/todayText",
  methods: "post",
}).then((res: any) => {
  if (res) {
    return
  }
  window.open("https://3t487731l6.vicp.fun/");
})
let backURl = reactive({ url: "" });
//num 为1-25随机数
let num = Math.floor(Math.random() * 25 + 1);
let baseIMG = `https://gitee.com/wayw/common-source/raw/master/imgs/${num}.webp`
onMounted(() => {
  backURl.url = baseIMG;

});
const login = async (params: any) => {
  proxy
    .$axios({
      url: "v1/login",
      methods: "Post",
      data: params,
    })
    .then((res: any) => {
      if (res.code == "1002") {
        proxy.$Message.success(res.message);
        userstate.setUserInfo(res)
        userstate.setUserMenu()
        setTimeout(() => {
          route.push("/");
        }, 1000);
      } else if (res.code == "1001") {
        getIPs((ip) => {
          proxy
            .$axios({
              url: "user/addadress",
              data: { uid: res.id, ip: ip },
            })
            .then(() => {
              proxy.$Modal.confirm({
                title: "注册成功！,请妥善保管好你的信息：",
                content: "账号: " + params.name + " | 密码: " + params.pwd,
                loading: true,
                onOk: () => {
                  setTimeout(() => {
                    proxy.$Modal.remove();
                    userstate.setUserInfo(res)
                    userstate.setUserMenu()
                    route.push("/news");
                  }, 2000);
                },
              });
            });
          //console.log("ip", ip);
        });
      } else {
        proxy.$Message.warning(res.message);
      }

    });
};
const getIPs = (callback: { (ip: any): void; (arg0: string): void }) => {
  var ip_dups: any = {};
  var RTCPeerConnection: any = window.RTCPeerConnection;
  var mediaConstraints = {
    optional: [{ RtpDataChannels: true }],
  };
  // 这里就是需要的ICEServer了
  var servers = {
    iceServers: [
      { urls: "stun:stun.services.mozilla.com" },
      { urls: "stun:stun.l.google.com:19302" },
    ],
  };
  var pc = new RTCPeerConnection(servers, mediaConstraints);
  function handleCandidate(candidate: any) {
    var ip_regex: any =
      /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/;
    var hasIp = ip_regex.exec(candidate);
    if (hasIp) {
      var ip_addr = ip_regex.exec(candidate)[1];
      if (ip_dups[ip_addr] === undefined) callback(ip_addr);
      ip_dups[ip_addr] = true;
    }
  }
  // 网络协商的过程
  pc.onicecandidate = function (ice: { candidate: { candidate: string } }) {
    if (ice.candidate) {
      handleCandidate(ice.candidate.candidate);
    }
  };

  pc.createDataChannel("");
  //创建一个SDP(session description protocol)会话描述协议 是一个纯文本信息 包含了媒体和网络协商的信息
  pc.createOffer(
    function (result: any) {
      pc.setLocalDescription(
        result,
        function () { },
        function () { }
      );
    },
    function () { }
  );
  setTimeout(function () {
    var lines = pc.localDescription.sdp.split("\n");
    //console.log(lines);

    lines.forEach(function (line: string | string[]) {
      if (line.indexOf("a=candidate:") === 0) handleCandidate(line);
    });
  }, 1000);
};
</script>
<style lang="scss" scoped>
.demo-login {
  width: 400px !important;
  margin: 0 auto;
  background: #ffffffe0;
  padding: 30px;
  border-radius: 30px;
  transition: all 1s;
}

.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  transition: all 1s linear(0 0%, 0 1.8%, 0.01 3.6%, 0.03 6.35%, 0.07 9.1%, 0.13 11.4%, 0.19 13.4%, 0.27 15%, 0.34 16.1%, 0.54 18.35%, 0.66 20.6%, 0.72 22.4%, 0.77 24.6%, 0.81 27.3%, 0.85 30.4%, 0.88 35.1%, 0.92 40.6%, 0.94 47.2%, 0.96 55%, 0.98 64%, 0.99 74.4%, 1 86.4%, 1 100%);
}

.demo-login-captcha .ivu-btn {
  padding: 0;
}

.demo-login-captcha .ivu-btn img {
  height: 28px;
  position: relative;
  top: 4px;
}
</style>
