//ενα controler για κάθε σελίδα


const model = await import(`../model/sqlite.mjs`)


export async function showParkingSiteName() {
    try {
        const parkingSite = await model.getParkingSiteName()
        const parkingSiteName = parkingSite[0].Email;

        return parkingSiteName
    } catch(err) {
        console.log(err);
    }
}
