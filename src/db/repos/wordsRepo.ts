import db from '../db'
import {AppError} from "@/application/appError";
import keys from "@/db/keys";
import {Card, wrapWords} from "@/db/models/card";

let words: Array<Card> | null = null

function loadWords(): Promise<Array<Card>> {
    return new Promise((res, rej) => {
        if (words)
            res(words)
        else {
            db.get(keys.essentialWords).then(data => {
                words = wrapWords(data)
                res(words)
            }).catch(e => rej(e))
        }
    })
}

function UpdateWords(): Promise<void> {
    if (words)
        return db.set(keys.essentialWords, words)
    return new Promise((res) => res())
}

const repo = {
    async getAll() {
        return await loadWords()
    },
    async getCardsForGame(size: number | null, cardFilter: (word: Card) => boolean) {
        const words = await loadWords()
        if (size)
            return words.filter(word => cardFilter(word)).slice(0, size)
        return words.filter(word => cardFilter(word))
    },
    async updateCards(cards: Array<Card>) {
        const words = await loadWords()
        for (let i = 0; i < words.length; i++) {
            const newWord = cards.filter(c => c.id === words[i].id)[0]
            if (newWord)
                words[i] = newWord
        }
        await UpdateWords()
    },
    async countCards(selector: (card: Card) => boolean): Promise<number> {
        const words = await loadWords()
        return words.filter(c => selector(c)).length
    },
    async cardsReport(): Promise<any> {
        const words = await loadWords()
        const report = {
            iKnow: 0,
            learned: 0,
            hardCards: 0,
            needReview: 0,
            pending: 0
        }
        for (const word of words) {
            if (word.iKnow())
                report.iKnow++
            if (word.isFinished())
                report.learned++
            if (word.isHard())
                report.hardCards++
            if (word.needReview())
                report.needReview++
        }
        report.pending = words.length - (report.learned + report.iKnow)
        return report
    }
}

export default repo