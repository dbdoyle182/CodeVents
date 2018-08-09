import firebase from 'firebase';
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDHOao_DzjWhtbhNxVQpidVL9kHv8WTuNw",
    authDomain: "codevents-212615.firebaseapp.com",
    databaseURL: "https://codevents-212615.firebaseio.com",
    projectId: "codevents-212615",
    storageBucket: "codevents-212615.appspot.com",
    messagingSenderId: "497062315975"
}

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {
    timestampsInSnapshots: true
}

firestore.settings(settings);

export default firebase;