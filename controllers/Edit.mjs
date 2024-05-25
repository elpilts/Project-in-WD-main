const model = await import(`../model/sqlite.mjs`)

export async function EditEvent(req,res) {
    console.log('Received data:', req.params.name, req.params.description, req.params.picture);
    try {
        const events = await model.Edit(req.params.name,req.params.description,req.params.picture)

        return events
    } catch(err) {
        console.log(err);
    }
}
