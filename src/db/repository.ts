import {db, auth} from "../config/firebase";
import firebase from 'firebase/app';

export class Repository {
    getAllGratitudeByUserAndDate(): Promise<string> {
        return new Promise((resolve, reject) =>
        {
            let entry: string = '';

            const timestamp = firebase.firestore.Timestamp.fromDate(
                new Date('2021-10-02 00:00:00')
            )
            let uid: string = '';
            uid=  auth.currentUser?.uid!;

            let collection = db.collection('users');
            if (uid!==undefined)
                collection.where(firebase.firestore.FieldPath.documentId(), '==', uid)

            collection.where('date_of_entry','==',timestamp)
                .get().then(function (doc){
                    let row: number = 1;
                    doc.docs.forEach(function (childSnapshot: any) {
                        if (row === 1) {
                            entry = childSnapshot.data().text;
                            //console.log(entry);
                            resolve(entry);
                        }
                        row++;
                    });
                }
            );
        })
    }

    getAll() {
        return db.collection('users').get();
    }

    create(gratitude) {
        return db.collection('users').add(gratitude);
    }

    update(docid, value) {
        return db.collection('users').doc(docid).update(value);
    }

    delete(docid) {
        return db.collection('users').doc(docid).delete();
    }


}
