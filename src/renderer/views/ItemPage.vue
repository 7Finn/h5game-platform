<template>
  <div class="item-page-content">
    <mu-card v-if="game">
      <mu-card-title :title="game.name"/>
      <mu-card-media>
        <div class="game-banner" :style="{ backgroundImage: `url(${game.banner})` }"></div>
      </mu-card-media>
      <mu-card-text>
        {{ game.description }}
      </mu-card-text>
      <mu-card-actions>
        <mu-flat-button label="添加到我的收藏" icon="star" @click="addToFavorite" primary :disabled="added"/>
      </mu-card-actions>
    </mu-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      game: null,
      added: false
    }
  },
  sockets: {
    'set_store_game_detail': function (res) {
      this.game = res
    }
  },
  mounted () {
    this.$socket.emit('get_store_game_detail', { gameId: this.$route.params.id })
  },
  methods: {
    addToFavorite () {
      if (this.game) {
        this.$socket.emit('add_to_favorite', { gameId: this.game.game_id })
        this.added = true
      }
    }
  }
}
</script>

<style lang="less">
.item-page-content {
  height: 100%;
  padding: 20px;
}

.game-banner {
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center;
}
</style>

