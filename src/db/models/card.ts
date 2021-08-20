import {Constants} from "@/application/constants";

export class Card {
    constructor(card: any) {
        this.front = card.front
        this.back = card.back
        this.example = card.example
        this.synonyms = card.synonyms
        this.type = card.type
        this.id = card.id
        this.checkList = card.checkList
        this.hasBeenLearned = card.hasBeenLearned
    }

    front: string;
    back: string;
    example: string;
    synonyms: Array<string>;
    type: string;

    id: number;
    checkList: Array<boolean>;
    hasBeenLearned: boolean;

    isNew(): boolean {
        if (this.hasBeenLearned)
            return false
        return !this.checkList || this.checkList.length == 0
    }

    needReview(): boolean {
        if (this.hasBeenLearned)
            return false
        if (this.checkList.length === 0)
            return false
        return this.checkList.filter(a => a).length < Constants.MaxTrueChecksForPass
    }

    isHard(): boolean {
        if (this.checkList.length < Constants.MaxTrueChecksForPass)
            return false
        return this.checkList.filter(a => !a).length >= Constants.HardCardFalseChecks
    }

    isFinished(): boolean {
        return !this.isNew() && this.checkList.filter(a => a).length > Constants.MaxTrueChecksForPass
    }

    checkTrue() {
        this.checkList.push(true)
    }

    checkAsKnow() {
        this.hasBeenLearned = true
    }

    checkFalse() {
        this.checkList.push(false)
    }
}

export function wrapWords(words: Array<any>): Array<Card> {
    const newWords: Array<Card> = []
    for (const word of words) {
        newWords.push(new Card(word))
    }
    return newWords
}
