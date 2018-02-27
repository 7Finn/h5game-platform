<template>
  <div>
    <iframe class="left-frame" src="" frameborder="0"></iframe>
    <iframe class="right-frame" src="" frameborder="0"></iframe>
  </div>
</template>

<script>
require('electron').ipcRenderer.on('ping', (event, message) => {
  console.log(message)
})
export default {
}
</script>


<style lang="less">
.left-frame {
  width: 400px;
  height: 400px;
}

.right-frame {
  width: 400px;
  height: 400px;
}
</style>
