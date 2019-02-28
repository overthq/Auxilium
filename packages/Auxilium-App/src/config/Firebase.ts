import firebase from 'firebase';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
	apiKey: 'AIzaSyCtkwp9znQ1mta-kcs_oCC8bb0jL5_KK7A',
	authDomain: 'auxilium-da821.firebaseapp.com',
	databaseURL: 'https://auxilium-da821.firebaseio.com',
	projectId: 'auxilium-da821',
	storageBucket: 'auxilium-da821.appspot.com',
	messagingSenderId: '622162889348'
};

export default class Firebase {
	static auth: firebase.auth.Auth;

	static firestore: firebase.firestore.Firestore;

	static storage: firebase.storage.Storage;

	static init() {
		firebase.initializeApp(config);
		Firebase.auth = firebase.auth();
		Firebase.firestore = firebase.firestore();
		Firebase.storage = firebase.storage();
	}
}
