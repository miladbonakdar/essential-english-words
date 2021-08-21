<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>
                    <ion-icon :icon="skullOutline"/>
                    Advanced
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <template v-if="hasGame">
                <Card class="m-10" :card="selectedCard"></Card>
                <ion-grid class="mx-10">
                    <ion-row>
                        <ion-col>
                            <ion-button @click="cancelTheGame" expand="block" fill="outline">
                                <ion-icon :icon="closeCircleOutline"></ion-icon>
                                Cancel
                            </ion-button>
                        </ion-col>
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
                        <ion-button @click="newGame(Keys.hardCards)" expand="block" fill="outline" color="dark">
                            <ion-icon class="mr-10" :icon="barbellOutline"/>
                            Review Hard Cards
                        </ion-button>
                    </ion-col>
                </ion-row>

                <ion-row class="m-10">
                    <ion-col>
                        <ion-button @click="newGame(Keys.cardsIKnow)" expand="block" fill="outline" color="success">
                            <ion-icon class="mr-10" :icon="gameControllerOutline"/>
                            Review Cards I Know
                        </ion-button>
                    </ion-col>
                </ion-row>

                <ion-list v-if="reports">
                    <ion-item>
                        <ion-text color="primary">
                            <H3>Your Path</H3>
                        </ion-text>
                    </ion-item>
                    <ion-item>
                        <ion-text color="medium">
                            <ion-icon class="mr-5" :icon="ribbonOutline"/>
                            Cards You Know:
                            <ion-text color="dark">
                                {{reports.iKnow}}
                            </ion-text>
                        </ion-text>
                    </ion-item>

                    <ion-item>
                        <ion-text color="medium">
                            <ion-icon class="mr-5" :icon="schoolOutline"/>
                            Cards You Learned:
                            <ion-text color="dark">
                                {{reports.learned}}
                            </ion-text>
                        </ion-text>
                    </ion-item>

                    <ion-item>
                        <ion-text color="medium">
                            <ion-icon class="mr-5" :icon="skullOutline"/>
                            Cards You Missed A Lot:
                            <ion-text color="dark">
                                {{reports.hardCards}}
                            </ion-text>
                        </ion-text>
                    </ion-item>

                    <ion-item>
                        <ion-text color="medium">
                            <ion-icon class="mr-5" :icon="eyeOutline"/>
                            Need Review:
                            <ion-text color="dark">
                                {{reports.needReview}}
                            </ion-text>
                        </ion-text>
                    </ion-item>

                    <ion-item lines="none">
                        <ion-text color="medium">
                            <ion-icon class="mr-5" :icon="rocketOutline"/>
                            Cards Pending:
                            <ion-text color="dark">
                                {{reports.pending}}
                            </ion-text>
                        </ion-text>
                    </ion-item>
                </ion-list>
            </template>
        </ion-content>
    </ion-page>
</template>

<script>
    import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, toastController} from '@ionic/vue';
    import {
        skullOutline, closeCircleOutline, barbellOutline, gameControllerOutline,
        schoolOutline, ribbonOutline, eyeOutline, rocketOutline
    } from 'ionicons/icons';
    import Card from '@/components/Card.vue';
    import builder, {findGames} from '@/db/repos/game'
    import wordsRepo from '@/db/repos/wordsRepo'
    import Keys from '@/db/keys'

    let gameRepo = null

    export default {
        name: 'Tab1',
        components: {Card, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonIcon},
        setup() {
            return {
                skullOutline,
                closeCircleOutline, barbellOutline,
                gameControllerOutline, schoolOutline, ribbonOutline,
                eyeOutline, rocketOutline
            }
        },
        created() {
            this.loadPreviousGame()
            this.loadReport()
        },
        data() {
            return {
                game: null,
                selectedCard: null,
                cardsPending: 0,
                Keys,
                reports: null
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
            newGame(gameKey) {
                gameRepo = builder(gameKey)
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
            },
            cancelTheGame() {
                toastController
                    .create({
                        message: 'Review data will be lost. Are you okay with that?',
                        buttons: [
                            {
                                text: 'Yes',
                                handler: () => {
                                    gameRepo.decline().then(res => {
                                        this.loadGame()
                                    })
                                }
                            }
                        ]
                    }).then(toast => toast.present())
            },
            loadReport() {
                wordsRepo.cardsReport().then(res => this.reports = res)
            },
            loadPreviousGame() {
                findGames([Keys.hardCards, Keys.cardsIKnow]).then(res => {
                    if (res) {
                        gameRepo = builder(res)
                        this.loadGame()
                    } else {
                        gameRepo = null
                        this.game = null
                    }
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