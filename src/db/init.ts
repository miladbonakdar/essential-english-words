import store from './db'
import keys from './keys'
import essentialWords from './constants/words.json'

function mapper(words: any): any {
    const newWords = []
    let id = 1
    for (const word of words) {
        word.id = id++
        word.checkList = []
        word.hasBeenLearned = false
        newWords.push(word)
    }
    return newWords
}

export default async function (forceRemove: boolean) {
    await store.create()
    if (forceRemove) {
        await store.remove(keys.essentialWords)
        await store.remove(keys.review)
        await store.remove(keys.game)
    }
    const words = await store.get(keys.essentialWords)
    if (words)
        return
    await store.set(keys.essentialWords, mapper(essentialWords))
}