const model = await import(`../model/sqlite.mjs`)

export async function insertUserData() {
    try {
        const newData = await model.insertUserData()
        const newDataSQL = newData[0].Email;

        return newDataSQL
    } catch(err) {
        console.log(err);
    }
}