const model = await import(`../model/sqlite.mjs`)

export async function InsertEvent(eventdata) {
    try {
        const events = await model.Insert(eventdata);

        return events
    } catch(err) {
        console.log(err);
    }
}
