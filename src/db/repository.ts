import {db, auth} from "../config/firebase";
import firebase from 'firebase/app';

export class Repository {
    getAllGratitudeByUserAndDate(date: string, uid: string): Promise<string> {
        return new Promise((resolve, reject) =>
        {
            let entry: string = '';
            // console.log(date);
            // '2021-10-02
            const timestamp = firebase.firestore.Timestamp.fromDate(
                new Date(date + ' 00:00:00')
            )

            if (uid!==undefined) {
                let collection = db.collection('users').doc(uid);
                collection.collection('entry')
                    .where('date_of_entry', '==', timestamp)
                    .get().then(function (doc) {
                        let row: number = 1;
                        doc.docs.forEach(function (childSnapshot: any) {
                            console.log(childSnapshot.data().text);
                            if (row === 1) {
                                entry = childSnapshot.data().text;
                                //console.log(entry);
                                resolve(entry);
                            }
                            row++;
                        });
                    }
                );
            }
        })
    }

    getAll() {
        return db.collection('users').get();
    }

    create(gratitude) {

            // console.log(date);
            // '2021-10-02
            const timestamp = firebase.firestore.Timestamp.fromDate(
                new Date('2021-10-02 00:00:00')
            )
            let uid: string = '';
            uid=  auth.currentUser?.uid!;
            const userEmail = auth.currentUser?.email;
            console.log(userEmail);

            let collection = db.collection('users');
            if (uid!==undefined)
                collection.where(firebase.firestore.FieldPath.documentId(), '==', uid)

            collection.where('date_of_entry','==',timestamp)
        collection.add({
            'date_of_entry' : timestamp,

        })

    }

    update(docid, value) {
        return db.collection('users').doc(docid).update(value);
    }

    delete(docid) {
        return db.collection('users').doc(docid).delete();
    }


}