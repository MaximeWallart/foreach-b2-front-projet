<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    <router-link to='/showallmovies' tag='button'>Link to all movies</router-link>
    <v-spacer/>
    <router-link to='/comparemovies' tag='button'>Compare ghiblis</router-link>
        
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
