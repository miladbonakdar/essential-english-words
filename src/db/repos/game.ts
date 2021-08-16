import db from '../db'
import keys from "@/db/keys";
import {AppError} from "@/application/appError";
import {Game} from "@/db/models/game";
import WordsRepo from "@/db/repos/wordsRepo";

const repo = function (gameKey: string) {
    return {
        async newGame(): Promise<AppError | null> {
            const game = await db.get(gameKey)
            if (game)
                return new AppError("you already have a game")
            await db.set(gameKey, new Game())
            return await this.addNewCards()

        },
        async get(): Promise<Game | null> {
            const game = await db.get(gameKey)
            if (game)
                return new Game(game)
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
        async addNewCards(): Promise<AppError | null> {
            const game = await this.get()
            if (!game)
                return new AppError("There is no valid active game")
            const cards = await WordsRepo.getCardsForGame(game.size)
            game.addCards(cards)
            await this.updateGame(game)
            return null
        },
        async updateGame(game: Game) {
            await db.set(gameKey, game)
        }
    }
}

export default repo