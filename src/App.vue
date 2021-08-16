<template>
    <ion-app>
        <template v-if="dbInitCompleted">
            <ion-router-outlet/>
        </template>
        <ion-text v-else color="danger">
            <h1>Loading . . .</h1>
        </ion-text>
    </ion-app>
</template>

<script>
    import {IonApp, IonRouterOutlet} from '@ionic/vue';
    import {defineComponent} from 'vue';
    import dbInit from '@/db/init';

    export default defineComponent({
        name: 'App',
        components: {
            IonApp,
            IonRouterOutlet
        },
        created() {
            dbInit(false).then(() => {
                this.dbInitCompleted = true
            })
        },
        data() {
            return {
                dbInitCompleted: false
            }
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