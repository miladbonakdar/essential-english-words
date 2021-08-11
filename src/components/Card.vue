<template>
    <ion-card>
        <ion-item>
            <ion-icon :icon="pricetagOutline" slot="start"></ion-icon>
            <ion-label>{{card.front}}</ion-label>
            <ion-button fill="outline" slot="end" @click="showBack = !showBack">{{ showBack ? "Hide" : "Show"}}
            </ion-button>
        </ion-item>

        <ion-card-content v-if="showBack">
            <h2>{{card.back}}</h2>
        </ion-card-content>
        <ion-list>
            <ion-item>
                <ion-text>
                    Synonyms:
                    <ion-chip v-for="chip of card.synonyms" v-bind:key="chip" outline="true" color="tertiary">
                        <ion-label color="tertiary">{{chip}}</ion-label>
                    </ion-chip>
                </ion-text>
            </ion-item>

            <ion-item>
                <ion-text>
                    <h5>Example: {{card.example}}</h5>
                </ion-text>
            </ion-item>

            <ion-item>
                <ion-text>
                    Details:
                    <ion-chip outline="true" color="primary">
                        <ion-label color="primary">Type: {{card.type}}</ion-label>
                    </ion-chip>

                    <ion-chip outline="true" color="primary">
                        <ion-label color="primary">Number: {{card.id}}</ion-label>
                    </ion-chip>
                </ion-text>
            </ion-item>
            <ion-item v-if="card.checkList && card.checkList.length > 0" lines="none">
                History:
                <ion-text>
                    <ion-chip class="mleft" v-for="chip of card.checkList" v-bind:key="chip" :color="chip ? 'success' : 'danger'">
                        {{chip? "Y" : "N"}}
                    </ion-chip>
                </ion-text>
            </ion-item>
        </ion-list>
    </ion-card>
</template>
<script>
    import {
        IonCard,
        IonCardContent,
        IonCardHeader,
        IonCardTitle,
        IonIcon,
        IonItem,
        IonLabel,
        IonChip,
        IonText
    } from '@ionic/vue'
    import {pricetagOutline} from 'ionicons/icons'

    export default {
        components: [IonCardHeader, IonCardContent, IonIcon, IonItem, IonCardTitle, IonLabel, IonCard, IonChip, IonText],
        name: "Card",
        setup() {
            return {
                pricetagOutline
            }
        },
        data: function () {
            return {
                showBack: false
            }
        },
        props: {
            card: Object
        }
    }
</script>

<style scoped>
    .mleft {
        margin-left: 4px;
    }
</style>