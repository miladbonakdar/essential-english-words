import {Card} from "@/db/models/card";

export class Game {
    created : Date;
    cards : Array<Card>;
    answeredCards : Array<Card>;
    size : number;

    constructor() {
        this.created = new Date()
        this.cards = []
        this.answeredCards = []
        this.size = 10
    }
}