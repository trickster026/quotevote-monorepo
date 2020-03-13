import firebase from 'firebase';

console.log('intializing firebase --firebaseConfig.js')
const firebaseConfig = {
	apiKey: "AIzaSyAD1zGnOEwJw16qRWkukBGkebZx7yNpUj0",
	authDomain: "scoreboardinc-e8553.firebaseapp.com",
	databaseURL: "https://scoreboardinc-e8553.firebaseio.com",
	projectId: "scoreboardinc-e8553",
	storageBucket: "scoreboardinc-e8553.appspot.com",
	messagingSenderId: "391951151324",
	appId: "1:391951151324:web:d2a9b51d7ad55e6fc54419",
	measurementId: "G-YJ293Q22Z9"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();