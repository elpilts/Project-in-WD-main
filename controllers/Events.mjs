const model = await import(`../model/sqlite.mjs`)

export async function OurEvents() {
    try {
        const events = await model.Events()

        return events
    } catch(err) {
        console.log(err);
    }
}
