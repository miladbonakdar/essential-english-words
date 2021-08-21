import db from '../db'
import keys from "@/db/keys";
import {AppError} from "@/application/appError";
import {Game} from "@/db/models/game";
import WordsRepo from "@/db/repos/wordsRepo";
import {Card} from "@/db/models/card";
import {runners} from "@/db/constants/gameRunners";

const repo = function (gameKey: string) {
    const runner = runners[gameKey]
    if (!runner)
        console.error("runner cannot be found", gameKey)
    return {
        async newGame(): Promise<AppError | null> {
            let game = await db.get(gameKey)
            if (game)
                return new AppError("you already have a game")
            const cards = await WordsRepo.getCardsForGame(runner.sizeSelector(), runner.wordSelector)
            if (!cards || cards.length === 0)
                return new AppError("there is no card for the game")
            game = new Game()
            game.setCards(cards)
            await this.updateGame(game)
            return null
        },
        async get(): Promise<Game | null> {
            const game = await db.get(gameKey)
            if (game)
                return new Game(JSON.parse(game))
            return null
        },
        async finishGame(): Promise<AppError | null> {
            const game = await this.get()
            if (!game)
                return new AppError("There is no valid active game")
            if (!game.canBeDone())
                return new AppError("There are undone cards")
            await WordsRepo.updateCards(game.answeredCards)
            await db.remove(gameKey);
            return null
        },
        async updateGame(game: Game) {
            await db.set(gameKey, JSON.stringify(game))
        },
        async cardsCount(): Promise<number> {
            return WordsRepo.countCards(runner.wordSelector)
        },
        async decline() {
            await db.remove(gameKey);
        }
    }
}

export default repo

export async function findGames(games: Array<string>): Promise<string | null> {
    for (const game of games) {
        const res = await db.get(game)
        if (res) return game
    }
    return null
}