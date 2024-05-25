const model = await import(`../model/sqlite.mjs`)

export async function EditEvent(eventName, eventDescription, eventPicture) {
    try {
        const events = await model.Edit(eventName, eventDescription, eventPicture)

        return true
    } catch(err) {
        console.log(err);
    }
}