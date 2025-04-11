// donate-food.js
document.addEventListener('DOMContentLoaded', async function () {
    // Dynamically import Firebase modules (because it's a module inside a regular script)
    const firebaseAppScript = await import('https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js');
    const firebaseFirestoreScript = await import('https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js');

    const { initializeApp } = firebaseAppScript;
    const { getFirestore, collection, addDoc } = firebaseFirestoreScript;

    // Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyCZ4ZBOmHEdH3Mzw2xJqKGFOZiBaiRsBgk",
        authDomain: "donation-e3a5a.firebaseapp.com",
        projectId: "donation-e3a5a",
        storageBucket: "donation-e3a5a.firebasestorage.app",
        messagingSenderId: "125372713766",
        appId: "1:125372713766:web:bd2c253b8062051ecf8fe7",
        measurementId: "G-2YTLJ4ZYGH"
    };

    // Initialize Firebase and Firestore
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // Handle food donation form submission
    const foodForm = document.getElementById('foodDonationForm');

    if (foodForm) {
        foodForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const donorName = foodForm.donorName.value.trim();
            const foodItem = foodForm.foodItem.value.trim();
            const quantity = foodForm.quantity.value.trim();

            if (!donorName || !foodItem || !quantity) {
                alert("Please fill out all fields.");
                return;
            }

            try {
                await addDoc(collection(db, "donate-food"), {
                    donorName,
                    foodItem,
                    quantity,
                    timestamp: new Date()
                });

                alert("Thank you for your food donation!");
                foodForm.reset();
            } catch (error) {
                console.error("Error adding document: ", error);
                alert("Something went wrong. Please try again.");
            }
        });
    }
});
