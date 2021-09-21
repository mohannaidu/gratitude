import {db} from "../config/firebase";

export class Repository {
    getAllGratitudeByUserAndDate(): Promise<string> {
        return new Promise((resolve, reject) =>
        {
            let entry: string = '';
            db.ref("/users").once('value', function (snapshot) {
                let row: number = 1;
                snapshot.forEach(function (childSnapshot) {
                    //var key = childSnapshot.key;
                    var data = childSnapshot.val();
                    if (row === 1) {
                        entry = data.text;
                        //console.log(entry);
                        resolve(entry);
                    }
                    row++;
                });
            });
        })
    }

    getAll() {
        return db.ref("/dailygratitude").get();
    }

    create(gratitude) {
        return db.ref("/dailygratitude").push(gratitude);
    }

    update(key, value) {
        return db.ref("/dailygratitude").child(key).update(value);
    }

    delete(key) {
        return db.ref("/dailygratitude").child(key).remove();
    }

    deleteAll() {
        return db.ref("/dailygratitude").remove();
    }

}
