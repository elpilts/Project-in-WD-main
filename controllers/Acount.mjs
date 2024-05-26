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

export async function showUserDataByEmail(email){
    try {
        const UserDataByEmail = await model.getUserDataByEmail(email)

        return UserDataByEmail
    } catch(err) {
        console.log(err);
    }
}
