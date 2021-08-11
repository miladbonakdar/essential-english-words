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
}