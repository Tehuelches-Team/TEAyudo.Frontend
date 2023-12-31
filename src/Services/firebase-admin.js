const { initializeApp } = require("firebase-admin/app");

import serviceAccount from "./chatteayudo-firebase-adminsdk-c91mz-5cfaf357da.json";

// _initializeApp({
//   credential: _credential.cert(serviceAccount),
//   databaseURL: "https://chatteayudo-default-rtdb.firebaseio.com",
// });
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});
const app = initializeApp();
//const app = initializeApp(firebaseConfig);
console.log(app);

// This registration token comes from the client FCM SDKs.
const registrationToken = "YOUR_REGISTRATION_TOKEN";

const message = {
  data: {
    score: "850",
    time: "2:45",
  },
  token: registrationToken,
};

// Send a message to the device corresponding to the provided
// registration token.
getMessaging()
  .send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log("Successfully sent message:", response);
  })
  .catch((error) => {
    console.log("Error sending message:", error);
  });
