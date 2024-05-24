const model = await import(`../model/sqlite.mjs`)

export async function DeleteEvent(deletename) {
    try {
        const deleteevent = await model.Delete(deletename)

        return true
    } catch(err) {
        console.log(err);
    }
}
