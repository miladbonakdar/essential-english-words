import db from '../db'
import keys from "@/db/keys";
import {AppError} from "@/application/appError";
import {Game} from "@/db/models/game";

const repo = {
    newGame: async function (): Promise<AppError | null> {
        const game = await db.get(keys.game)
        if (game)
            return new AppError("you already have a game")
        await db.set(keys.game, new Game())
        return null
    },

    get : async function (){
        return await db.get(keys.game)
    }
}

export default repo