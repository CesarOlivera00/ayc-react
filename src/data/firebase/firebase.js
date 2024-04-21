// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getDocs, getDoc, getFirestore, addDoc, doc, Timestamp, query, where } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCZEPGREJf9MZGbX1gT-fiXZaEWySI5960",
    authDomain: "ayc-project-444d2.firebaseapp.com",
    projectId: "ayc-project-444d2",
    storageBucket: "ayc-project-444d2.appspot.com",
    messagingSenderId: "977809183860",
    appId: "1:977809183860:web:00d8bee308e5932e552d21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestoreDB = getFirestore(app);

// Collections
const PERIPHERALS = "peripherals";
const BUY_ORDERS = "buyOrders";

export default firestoreDB;

export async function GetAllPeripherals() {
    const peripheralCollection = collection(firestoreDB, PERIPHERALS);
    const peripheralDocs = await getDocs(peripheralCollection);

    let peripheralArray = peripheralDocs.docs.map(doc => ({id: doc.id, ...doc.data()}));

    return peripheralArray;
}

export async function GetPeripheralById(productId = null) {
    const peripheralCollection = collection(firestoreDB, PERIPHERALS);
    const peripheralRef = doc(peripheralCollection, productId);
    const peripheralDoc = await getDoc(peripheralRef);

    let peripheral = {id: peripheralDoc.id, ...peripheralDoc.data()};

    return peripheral;
}

export async function GetPeripheralsByCategoryId(categoryId = null) {
    const peripheralCollection = collection(firestoreDB, PERIPHERALS);
    
    const queryFB = query(peripheralCollection, where("categoryId", "==", parseInt(categoryId)))
    const peripheralDocs = await getDocs(queryFB);

    let peripheralArray = peripheralDocs.docs.map(doc => ({id: doc.id, ...doc.data()}));
    console.log(peripheralArray);

    return peripheralArray;
}

export async function CreateBuyOrder(orderData) {
    const orderWithDate = { ...orderData, date: Timestamp.now() };
    
    const buyOrderCollection = collection(firestoreDB, BUY_ORDERS);
    const orderDoc = await addDoc(buyOrderCollection, orderWithDate);
}

export async function GetAllOrders() {
    const orderCollection = collection(firestoreDB, BUY_ORDERS);
    const orderDocs = await getDocs(orderCollection);

    let orderArray = orderDocs.docs.map(doc => ({id: doc.id, ...doc.data()}));
    
    for (let i = 0; i < orderArray.length; i++) {
        orderArray[i].date = (orderArray[i].date).toDate();
    }

    orderArray.sort(function (a, b) {
        if (a.date < b.date) {
          return 1;
        }
        if (a.date > b.date) {
          return -1;
        }
        return 0;
      });

    return orderArray;
}

export async function GetOrderById(orderId = null) {
    const orderCollection = collection(firestoreDB, BUY_ORDERS);
    const orderRef = doc(orderCollection, orderId);
    const orderDoc = await getDoc(orderRef);

    let order = {id: orderDoc.id, ...orderDoc.data()};
    order.date = order.date.toDate();

    return order;
}