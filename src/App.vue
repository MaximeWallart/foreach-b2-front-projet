<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    <router-link to='/showallmovies' tag='button'>{{ $t('link-to-all-movies') }}</router-link>
    <v-spacer/>
    <router-link to='/comparecharacters' tag='button'>Find your favorite character</router-link>
    <v-spacer/>
    <router-link to='/comparemovies' tag='button'>{{ $t('compare-ghiblis') }}</router-link>
        
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
