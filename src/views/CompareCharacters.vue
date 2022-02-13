<template>
  <v-container class="container">
    <v-card class="background left" :color="color1"></v-card>
    <v-card class="background right" :color="color2"></v-card>
    <h1 class="title">{{ $t('you-are-currently-in-the-round')}} {{round}}</h1>
    <v-row class="row">
      <v-col cols="6" class="col">
        <v-card
          class="card"
          elevation="20"
          max-width="350"
          max-height="350"
          :color="color1"
          @click="saveClickedCharacter(character1.id, character2.id)"
        >
          <h1>{{ character1.name }}</h1>
        </v-card>
      </v-col>
      <v-spacer />
      <v-col cols="6" class="col">
        <v-card
          class="card"
          elevation="20"
          max-width="350"
          max-height="350"
          :color="color2"
          @click="saveClickedCharacter(character2.id, character1.id)"
        >
          <h1>{{ character2.name }}</h1>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { getAllCharacters, getCharacter } from "../apis/movies";

export default {
  data() {
    return {
      characters: [],
      character1: {},
      character2: {},
      winners: [],
      losers: [],
      round: 1,
      error: "",
      color1: "#" + ((Math.random() * 0xffffff) << 0).toString(16),
      color2: "#" + ((Math.random() * 0xffffff) << 0).toString(16),
    };
  },
  async mounted() {
    return this.setUp();
  },
  methods: {
    async newRound() {
      this.characters = [];
      for (const winner of this.winners) {
        let tmp = await getCharacter(winner);
        this.characters.push(tmp);
      }
      this.winners = [];
      this.losers = [];
      if (this.characters.length % 2 != 0) {
        this.winners.push(this.characters[0].id);
      }
      this.getRandomCharacter();
      this.round++;
    },
    async getWinner() {
      let win = await getCharacter(this.winners[0]);
      window.alert(this.$t("your-favorite-ghibli-character-is") + win.name);
    },
    saveClickedCharacter(winner, loser) {
      if (this.winners.length + this.losers.length < this.characters.length) {
        this.winners.push(winner);
        this.losers.push(loser);
        if (this.winners.length + this.losers.length < this.characters.length) {
          this.getRandomCharacter();
        } else {
          if (this.winners.length == 1) {
            this.getWinner();
          } else {
            window.alert(this.$t("start-a-new-round"));
            this.newRound();
          }
        }
      }
    },
    async setUp() {
      try {
        this.characters = await getAllCharacters();
        if (this.characters.length % 2 != 0) {
          this.winners.push(this.characters[0].id);
        }
        this.getRandomCharacter();
      } catch (e) {
        this.error = e
        throw new Error(this.error)
      }
    },
    async getRandomCharacter() {
      try {
        var idx1 = Math.floor(Math.random() * this.characters.length);
        while (
          this.winners.indexOf(this.characters[idx1].id) != -1 ||
          this.losers.indexOf(this.characters[idx1].id) != -1
        ) {
          idx1 = Math.floor(Math.random() * this.characters.length);
        }
        this.character1 = this.characters[idx1];

        var idx2 = Math.floor(Math.random() * this.characters.length);
        while (
          idx2 == idx1 ||
          this.winners.indexOf(this.characters[idx2].id) != -1 ||
          this.losers.indexOf(this.characters[idx2].id) != -1
        ) {
          idx2 = Math.floor(Math.random() * this.characters.length);
        }
        this.character2 = this.characters[idx2];
      } catch (e) {
        this.error = e;
        throw new Error(this.error)
      }
      this.generateColor();
    },
    generateColor() {
      this.color1 = "#" + ((Math.random() * 0xffffff) << 0).toString(16);
      this.color2 = "#" + ((Math.random() * 0xffffff) << 0).toString(16);
    },
  },
};
</script>
<style>
.container {
  height: 100%;
}
.card {
  padding: 25px 50px;
}
.title {
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  position: relative;
  z-index: 2;
  color: black;
}
.left {
  left: 0;
}
.right {
  right: 0;
}
.background {
  top: 0;
  filter: blur(5px) brightness(70%);
  position: absolute;
  width: 51%;
  height: 100%;
}
.row {
  display: flex;
  align-items: center;
  justify-content: center;
}
.col {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 40px 0px 0px 0px;
}
</style>
