<template>
    <ion-page>
        <ion-tabs>
            <ion-router-outlet></ion-router-outlet>
            <ion-tab-bar slot="bottom">
                <ion-tab-button tab="New Words" href="/tabs/new">
                    <ion-icon :icon="duplicateOutline"/>
                    <ion-label>New</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="Review" href="/tabs/review">
                    <ion-icon :icon="reloadOutline"/>
                    <ion-label>Review</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="Advance" href="/tabs/advance">
                    <ion-icon :icon="skullOutline"/>
                    <ion-label>Advance</ion-label>
                </ion-tab-button>
            </ion-tab-bar>
        </ion-tabs>
    </ion-page>
</template>

<script lang="ts">
    import {IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet} from '@ionic/vue';
    import {skullOutline, reloadOutline, duplicateOutline} from 'ionicons/icons';

    export default {
        name: 'Tabs',
        components: {IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet},
        setup() {
            return {
                duplicateOutline,
                reloadOutline,
                skullOutline,
            }
        }
    }
</script>