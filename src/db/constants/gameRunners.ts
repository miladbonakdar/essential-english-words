import {Card} from "@/db/models/card";
import {Constants} from '@/application/constants'
import keys from '@/db/keys'

const NewCardsGame = {
    sizeSelector: (): number | null => {
        return Constants.DefaultCarsForNewGame;
    },
    wordSelector: (card: Card): boolean => {
        return card.isNew()
    }
}

const ReviewGame = {
    sizeSelector: (): number | null => {
        return null;
    },
    wordSelector: (card: Card): boolean => {
        return card.needReview()
    }
}

export const runners = {
    [keys.review]: ReviewGame,
    [keys.game]: NewCardsGame,
}
