<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  }
});
</script>

<style>
  .text-red {
    color: #e74c3c;
  }

  .text-blue {
    color: #3498db;
  }

  .text-green {
    color: #2ecc71;
  }

  .text-orange {
    color: #e67e22;
  }

  .text-yellow {
    color: #f1c40f;
  }

  .text-muted {
    color: #95a5a6;
  }
</style>