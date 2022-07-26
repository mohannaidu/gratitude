import {db, auth} from "../config/firebase";
import firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

export class Repository {
    getAllGratitudeByUserAndDate(date: string, uid: string): Promise<string> {
        return new Promise(async (resolve) => {
            let entry: string = '';
            // console.log(date);
            // '2021-10-02
            const timestamp = firebase.firestore.Timestamp.fromDate(
                new Date(date + ' 00:00:00')
            )

            if (uid !== undefined) {
                let collection = db.collection('users').doc(uid);
                const snapshot = await collection.collection('entry')
                    .where('date_of_entry', '==', timestamp)
                    .get();
                if (snapshot.empty) {
                    resolve('');
                } else {
                    let row: number = 1;
                    snapshot.docs.forEach(function (childSnapshot: any) {
                        if (row === 1) {
                            entry = childSnapshot.data().text;
                            resolve(entry);
                        } else {
                            resolve('');
                        }
                        row++;
                    });
                }

            }
        })
    }

    getGratitudeDateByUser(uid: string): Promise<Timestamp[]> {
        return new Promise(async (resolve) => {
            const dateEntries:Timestamp[] = [];
            if (uid !== undefined) {
                let collection = db.collection('users').doc(uid);
                const snapshot = await collection
                                        .collection('entry')
                                        .orderBy('date_of_entry',"desc")
                                        .limit(10)
                                        .get();
                if (snapshot.empty) {
                    resolve(dateEntries);
                } else {
                    const dateEntries:Timestamp[] = [];
                    snapshot.docs.forEach(function (childSnapshot: any) {
                        dateEntries.push(childSnapshot.data().date_of_entry);
                    });
                    resolve(dateEntries);
                }

            }
        })
    }

    getAll() {
        return db.collection('users').get();
    }

    create(gratitude, date): Promise<string>  {
        return new Promise(async (resolve, reject) => {
            // console.log(date);
            // '2021-10-02
            const timestamp = firebase.firestore.Timestamp.fromDate(
                new Date(date + ' 00:00:00')
            )
            let uid: string;
            uid = auth.currentUser?.uid!;
            //const userEmail = auth.currentUser?.email;
            //console.log(userEmail);

            let collection = db.collection('users');
            if (uid !== undefined) {
                const snapshot = await collection.doc(uid)
                    .collection('entry')
                    .where('date_of_entry', '==', timestamp)
                    .get();
                if (snapshot.empty) {// this is for adding new record
                    collection.doc(uid).collection('entry').add({
                        'date_of_entry': timestamp,
                        'text': gratitude
                    }).then((docRef) => {
                        return resolve(docRef.id);
                    }).catch((e) => {
                        return reject(e);
                    });
                } else {
                    collection.doc(uid)
                        .collection('entry')
                        .doc(snapshot.docs[0].id)
                        .update({
                            'date_of_entry': timestamp,
                            'text': gratitude
                        }).then(() => {
                        return resolve(snapshot.docs[0].id);
                    }).catch((e) => {
                        return reject(e);
                    });
                }
            }
        })
    }

    update(docid, value) {
        return db.collection('users').doc(docid).update(value);
    }

    delete(docid) {
        return db.collection('users').doc(docid).delete();
    }


}
