const model = await import(`../model/sqlite.mjs`)

export async function InsertEvent(name,description,picture) {
    try {
        const events = await model.Insert(name,description,picture)

        return events
    } catch(err) {
        console.log(err);
    }
}
