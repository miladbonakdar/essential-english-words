import {Card, wrapWords} from "@/db/models/card";
import {AppError} from "@/application/appError";

export class Game {
    created: Date;
    cards: Array<Card>;
    answeredCards: Array<Card>;

    constructor(game: any = null) {
        this.created = game ? game.created : new Date()
        this.cards = game ? wrapWords(game.cards) : []
        this.answeredCards = game ? wrapWords(game.answeredCards) : []
    }

    setCards(cards: Array<Card>) {
        this.cards = cards
    }

    canBeDone(): boolean {
        return this.cards.length === this.answeredCards.length
    }

    cardAnswered(card: Card): AppError | null {
        if (this.answeredCards.filter(c => c.id === card.id)[0])
            return new AppError("This card is already in the answered list")
        this.answeredCards.push(card)
        return null
    }

    getCandidateCard(): Card | null {
        if (this.canBeDone())
            return null
        return this.cards.filter(c => this.answeredCards.findIndex(a => a.id === c.id) < 0)[0]
    }
}