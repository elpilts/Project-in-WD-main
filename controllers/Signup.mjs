const model = await import(`../model/sqlite.mjs`)

export async function insertUserData() {
    try {
        const newData = await model.insertUserData()
        return newData
    } catch(err) {
        console.log(err);
    }
}