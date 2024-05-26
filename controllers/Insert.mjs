const model = await import(`../model/sqlite.mjs`)

export async function InsertEvent(eventdata) {
    console.log('Received data:', eventdata);
    try {
        const events = await model.Insert(eventdata);

        return events
    } catch(err) {
        console.log(err);
    }
}
