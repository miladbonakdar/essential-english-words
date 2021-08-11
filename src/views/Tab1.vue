<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>
                    <ion-icon :icon="duplicateOutline"/>
                    New Words
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <Card :card="testCard">
            </Card>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
    import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon} from '@ionic/vue';
    import {duplicateOutline} from 'ionicons/icons';
    import Card from '@/components/Card.vue';

    export default {
        name: 'Tab1',
        components: {Card, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonIcon},
        setup() {
            return {
                duplicateOutline,
                testCard: {
                    front: "contemporary",
                    back: "belonging to the same period or time as something else",
                    example: "His work was a contemporary account of life in the nineteenth century.",
                    synonyms: ["concurrent", "coexistent", "modern"],
                    type: ".obj",
                    id: 123,
                    checkList: [false, true, true, true, true, true, true, true, true, true],
                    hasBeenLearned: false,
                }
            }
        }
    }
</script>