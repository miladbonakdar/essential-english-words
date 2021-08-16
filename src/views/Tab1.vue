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
            <template v-if="hasGame">
                <template v-if="cardsEnded">

                </template>
                <template v-else>
                    <Card :card="selectedCard">
                    </Card>
                    <ion-grid>
                        <ion-row>
                            <ion-col>
                                <ion-button expand="block" fill="outline">
                                    <ion-icon :icon="starOutline"></ion-icon>
                                </ion-button>
                            </ion-col>
                            <ion-col>
                                <ion-button expand="block" fill="outline" color="danger">No</ion-button>
                            </ion-col>
                            <ion-col>
                                <ion-button expand="block" fill="outline" color="success">Yes</ion-button>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </template>
            </template>
            <template v-else>
                <ion-row>
                    <ion-col>
                        <ion-button @click="newGame" expand="block" fill="outline" color="primary">Start New Game
                        </ion-button>
                    </ion-col>
                </ion-row>
            </template>
        </ion-content>
    </ion-page>
</template>

<script>
    import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon} from '@ionic/vue';
    import {duplicateOutline, starOutline} from 'ionicons/icons';
    import Card from '@/components/Card.vue';
    import builder from '@/db/repos/game'
    import Keys from '@/db/keys'

    const gameRepo = builder(Keys.game)

    export default {
        name: 'Tab1',
        components: {Card, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonIcon},
        setup() {
            return {
                duplicateOutline,
                starOutline,
            }
        },
        created() {
            this.loadGame()
        },
        data() {
            return {
                game: null,
                selectedCard: null
            }
        },
        methods: {
            loadGame() {
                gameRepo.get().then(res => {
                    this.game = res
                    this.setCurrentCard()
                });
            },
            newGame() {
                gameRepo.newGame().then(res => {
                    if (res)
                        return this.handleError(res)
                    this.loadGame()
                })
            },
            handleError(err) {
                console.error(err)
            },
            setCurrentCard() {
                if (!this.game) this.selectedCard = null
                this.selectedCard = this.game.getCandidateCard()
            }
        },
        computed: {
            hasGame() {
                return this.game
            },
            cardsEnded() {
                return this.game && this.game.canBeDone()
            },
        }
    }
</script>