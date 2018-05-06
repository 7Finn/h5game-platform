<template>
  <div class="store-content">
    <div class="store-container">'
      <mu-flexbox v-for="(row, rowIndex) in storeGamesFormat" :gutter="15" class="mt20" :key="rowIndex">
        <mu-flexbox-item v-for="(item, itemIndex) in row" :key="itemIndex">
          <template v-if="item">
            <div class="store-item" @click="toItemPage(item)">
              <div class="item-cover" :style="{ backgroundImage: `url(${item.cover})` }"></div>
              <div class="item-info">
                <div class="item-title">{{ item.name }}</div>
                <div class="item-descript">{{ item.description }}</div>
              </div>
            </div>
          </template>
        </mu-flexbox-item>
      </mu-flexbox>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['storeGamesFormat'])
  },
  methods: {
    toItemPage (item) {
      this.$router.push({ path: `/item/${item.gameId}` }) // -> /user/123
    }
  }
}
</script>

<style lang="less" scoped>
.store-content {
  background-image: url(../assets/science.png);
  text-align: left;
  height: 100%;
  padding: 0 20px 0 20px;
  overflow-y: auto;
}

.store-container {
  margin-left: auto;
  margin-right: auto;
  width: 1000px;
  height: 100%;
}

.mt20 {
  margin-bottom: 20px;
}

.store-item {
  cursor: pointer;
  background-color: #fff;
  border-radius: 2px;
  display: inline-block;
  width: 100%;
  height: 220px;
  -webkit-transition: all .6s cubic-bezier(.23,1,.32,1);
  transition: all .6s cubic-bezier(.23,1,.32,1);
}

.store-item:hover {
  box-shadow: 0 3px 10px rgba(0,0,0,.156863), 0 3px 10px rgba(0,0,0,.227451);
}

.item-info {
  height: 70px;
  border-radius: 0 0 2px 2px;
  padding: 10px 20px 10px 20px;
}

.item-cover {
  border-radius: 2px 2px 0 0;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 150px;
}

.item-title {
  font-size: 18px;
}

.item-descript {
  font-size: 14px;
  color: rgba(71, 74, 79, 0.54);
}

</style>
