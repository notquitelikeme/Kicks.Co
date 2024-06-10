import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAYjhxzN5HcaSXcFUyGQZRH_nP-NObZSHk",
    authDomain: "kicksco-94053.firebaseapp.com",
    projectId: "kicksco-94053",
    storageBucket: "kicksco-94053.appspot.com",
    messagingSenderId: "258937231502",
    appId: "1:258937231502:web:3b668229bfe91670f411df",
    measurementId: "G-Z5F5MZF7PH"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Function to create a card element
function createCard(docId, data) {
    return `
        <div class="card">
            <img class="product-image" src="${data.Image1}" alt="${docId}">
            <img class="brand-image" src="${data.ImageBrand}" alt="">
            <div class="card-title">${docId}</div><hr>
            <div class="card-brand">Brand: ${data.Brand}</div>
            <div class="card-size">Size Range: ${data.SizeRange}</div>
            <div class="card-price">Price Range: KES ${data.PriceBottom.toLocaleString()} - ${data.PriceTop.toLocaleString()}</div>
            <div class="card-qty">Quantity: ${data.Quantity}</div>
        </div>
    `;
}

// Fetch and display data from the collection
async function displayCollection(collectionName, containerId) {
    try {
        console.log(`Fetching data from collection: ${collectionName}`);
        const container = document.getElementById(containerId);
        const querySnapshot = await getDocs(collection(db, collectionName));
        if (querySnapshot.empty) {
            container.innerHTML = `<p>No data found in the ${collectionName} collection.</p>`;
        } else {
            querySnapshot.forEach((doc) => {
                console.log(`Document ID: ${doc.id}, Data:`, doc.data()); // Log fetched data
                container.innerHTML += createCard(doc.id, doc.data());
            });
        }
        console.log(`Data from ${collectionName} displayed successfully.`);
    } catch (error) {
        console.error(`Error fetching data from ${collectionName}:`, error);
    }
}

// Display both collections
displayCollection("Air Jordans", "air-jordans");
displayCollection("Converse", "converse");
displayCollection("Air Force", "air-force");
