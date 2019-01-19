import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import moment from 'moment';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SERNDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  doSignIn = () => {
    return this.auth.signInWithPopup(new app.auth.GoogleAuthProvider());
  }

  getExpenses = () => this.db.ref('transactions');
  addExpense = e => this.db.ref('transactions').push(e);
  updateExpense = async (uuid, e) => {
    try {
      await this.db.ref('transactions').child(uuid).update(e);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  deleteExpense = uuid => this.db.ref('transactions').child(uuid).remove();

  getTags = () => this.db.ref('tags');
  addTag = title => this.db.ref('tags').push({ title, created: moment().format() });
  removeTag = uuid => this.db.ref('tags').child(uuid).remove();

}

export default Firebase;
