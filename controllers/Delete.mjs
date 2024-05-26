const model = await import(`../model/sqlite.mjs`)

export async function DeleteEvent(name) {
    try {
        const deleteevent = await model.Delete(name)

        return true
    } catch(err) {
        console.log(err);
    }
}
