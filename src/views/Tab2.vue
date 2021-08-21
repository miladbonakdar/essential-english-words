<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>
                    <ion-icon :icon="reloadOutline"/>
                    Review
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <template v-if="hasGame">
                <Card class="m-10" :card="selectedCard"></Card>
                <ion-grid class="mx-10">
                    <ion-row>
                        <ion-col>
                            <ion-button @click="noButtonHandler" expand="block" fill="outline" color="danger">No
                            </ion-button>
                        </ion-col>
                        <ion-col>
                            <ion-button @click="yesButtonHandler" expand="block" fill="outline" color="success">Yes
                            </ion-button>
                        </ion-col>
                    </ion-row>
                </ion-grid>

                <ion-chip outline="true" color="dark" class="m-10">
                    <ion-label>You answered {{game.answeredCards.length}} cards, {{game.cards.length -
                        game.answeredCards.length}} to go
                    </ion-label>
                </ion-chip>
            </template>
            <template v-else>
                <ion-row class="m-10">
                    <ion-col>
                        <ion-button @click="newGame" expand="block" fill="outline" color="danger">
                            <ion-icon class="mr-10" :icon="pizzaOutline"/>
                            Start Review
                        </ion-button>
                    </ion-col>
                </ion-row>

                <ion-row class="m-10">
                    <ion-col>
                        <ion-text>
                            <ion-icon class="mr-5" :icon="telescopeOutline"/>
                            Cards Pending:
                            <ion-chip color="danger">
                                <ion-label color="danger">{{cardsPending}}</ion-label>
                            </ion-chip>
                        </ion-text>
                    </ion-col>
                </ion-row>
            </template>
        </ion-content>
    </ion-page>
</template>

<script>
    import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, toastController} from '@ionic/vue';
    import {reloadOutline, telescopeOutline, pizzaOutline} from 'ionicons/icons';
    import Card from '@/components/Card.vue';
    import builder from '@/db/repos/game'
    import Keys from '@/db/keys'

    const gameRepo = builder(Keys.review)

    export default {
        name: 'Tab1',
        components: {Card, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonIcon},
        setup() {
            return {
                reloadOutline,
                telescopeOutline,
                pizzaOutline
            }
        },
        created() {
            this.loadGame()
        },
        data() {
            return {
                game: null,
                selectedCard: null,
                cardsPending: 0
            }
        },
        methods: {
            loadGame() {
                gameRepo.get().then(res => {
                    this.game = res
                    this.setCurrentCard()
                });
                this.loadPendingCards()
            },
            newGame() {
                gameRepo.newGame().then(res => {
                    if (res)
                        return this.handleError(res)
                    this.loadGame()
                })
            },
            handleError(err) {
                toastController
                    .create({
                        message: err.toString(),
                        duration: 2000
                    }).then(toast => {
                    toast.present()
                })
            },
            setCurrentCard() {
                if (!this.game) {
                    this.game = null
                    this.selectedCard = null
                    return
                }
                this.selectedCard = this.game.getCandidateCard()
            },
            noButtonHandler() {
                this.selectedCard.checkFalse()
                this.updateCard()
            },
            yesButtonHandler() {
                this.selectedCard.checkTrue()
                this.updateCard()
            },
            updateCard() {
                this.game.cardAnswered(this.selectedCard)
                gameRepo.updateGame(this.game).then(res => {
                    console.log("game updated")
                    if (this.game.canBeDone())
                        return this.finishGame()
                    else
                        return this.setCurrentCard()
                })
            },
            finishGame() {
                gameRepo.finishGame().then(res => {
                    this.loadGame()
                })
            },
            loadPendingCards() {
                gameRepo.cardsCount().then(res => {
                    this.cardsPending = res
                })
            }
        },
        computed: {
            hasGame() {
                return this.game
            }
        }
    }
</script>

<style>

</style>