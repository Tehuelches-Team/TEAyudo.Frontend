// Import the functions you need from the SDKs you need
import {
  getDatabase,
  ref,
  set,
  runTransaction,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import {
  getMessaging,
  getToken,
  onMessage,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging.js";
// Add Firebase products that you want to use
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
//import { enviarToken } from "../Login/login.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-Cz9vVzOXzmu-6Uy5BrzXgXDGanqGcfU",
  authDomain: "chatteayudo.firebaseapp.com",
  databaseURL: "https://chatteayudo-default-rtdb.firebaseio.com",
  projectId: "chatteayudo",
  storageBucket: "chatteayudo.appspot.com",
  messagingSenderId: "738482409566",
  appId: "1:738482409566:web:55c4874af17f03b2da24cf",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
//Inicializar servicio de mensajes de notificacion
export const messaging = getMessaging(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const MensajesRef = collection(db, "Mensajes");
export const botones = document.querySelector("#buttons");
export const NombreUsuario = document.querySelector("#NombreUsuario");
export const Formulario = document.querySelector("#Formulario");
export const Mensaje = document.querySelector("#Mensaje");
export const Contenido = document.querySelector("#ContenidoWeb");

let propuesta = "";
window.onload = async function () {
  const urlParams = new URLSearchParams(window.location.search);
  propuesta = urlParams.get("propuestaId");
};
//Metodo recibir mensajes en primer plano`
onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  // ...
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/icon.png",
  };
  // self.registration.showNotification(notificationTitle, notificationOptions);
  window.alert(payload.notification.body);
});

//Pedir token para recibir notificaciones

getToken(messaging, {
  vapidKey:
    "BCPRBFQphzaDS7QPSoEqXw3Vn62zODm6eXK7i5MkRqsRcYi4G1LphtTK1Zouau9RAI1tYChpvJDvkBbg_IAr8yU",
})
  .then((currentToken) => {
    if (currentToken) {
      localStorage.setItem("token", currentToken);
      console.log(currentToken);
    } else {
      // Show permission request UI
      console.log(
        "No registration token available. Request permission to generate one."
      );
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
  });

onAuthStateChanged(auth, (user) => {
  const nav = document.querySelector("#cabecera");
  if (user) {
    console.log("Usuario logueado");
    nav.innerHTML = `<button class="btn_iniciar" id="LogoutGoogle" onclick="CerrarSesion(this)">Cerrar sesión en Google</button>`;
    ContenidoChat(user);
    CerrarSesion();
  } else {
    console.log("Usuario deslogueado");
    nav.innerHTML = `<button class="btn_iniciar" id="LoginGoogle">Iniciar sesión en Google</button>`;
    Formulario.style.display = "none";
    IniciarSesion();
  }
});
const IniciarSesion = () => {
  const btnLogin = document.querySelector("#LoginGoogle");
  const nav = document.querySelector("#cabecera");
  const avatar = document.querySelector("#avatar");
  const datosUser = document.querySelector("#datosUser");
  btnLogin.addEventListener("click", () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        ContenidoChat(result.user);
        enviarMensaje(result.user);
        nav.innerHTML = `<button class="btn_iniciar" id="LogoutGoogle">Cerrar sesión en Google</button>`;
        avatar.innerHTML = `<img src="${result.user.photoURL}" alt="" class="rounded float-end" width="40px" height="40px">`;
        datosUser.innerHTML = `<p>Usuario: ${result.user.displayName}</p>`;
        Contenido.style.display = "block";
        Formulario.style.display = "block";
        CerrarSesion();
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

const CerrarSesion = () => {
  const nav = document.querySelector("#cabecera");
  const btnLogout = document.querySelector("#LogoutGoogle");
  const avatar = document.querySelector("#avatar");
  const datosUser = document.querySelector("#datosUser");
  btnLogout.addEventListener("click", () => {
    auth.signOut();
    console.log("Usuario deslogueado");
    nav.innerHTML = `<button class="btn_iniciar" id="LoginGoogle">Iniciar sesión en Google</button>`;
    avatar.innerHTML = `TEAyudo`;
    datosUser.innerHTML = ``;
    Contenido.style.display = "none";
    Formulario.style.display = "none";
  });
};

const enviarMensaje = async (user) => {
  Formulario.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!Mensaje.value.trim()) {
      console.log("Mensaje vacio");
      return;
    }
    console.log(Mensaje.value);
    try {
      await addDoc(collection(db, propuesta + "/Mensajes"), {
        uid: user.uid,
        NombreUsuario: user.displayName,
        fecha: new Date(),
        Mensaje: Mensaje.value,
        photoURL: user.photoURL,
        TokenNotificaciones: localStorage.getItem("token"),
      });
      console.log("Mensaje enviado", Mensaje.value);
      Mensaje.value = "";
      const message = {
        notification: {
          title: "Nuevo mensaje de " + user.displayName,
          body: Mensaje.value,
        },
        token: localStorage.getItem("token"),
      };
      // const response = await firebase.messaging.send(message);
      // if (response) {
      //   console.log("Notificacion enviada");
      // } else {
      //   console.log("Notificacion no enviada");
      // }
    } catch (error) {
      console.log(error);
    }
  });
  ContenidoChat(user);
};

const ContenidoChat = (user) => {
  //Traer los mensajes en tiempo real
  const q = query(collection(db, "Mensajes"), orderBy("fecha", "asc"));
  onSnapshot(q, (querySnapshot) => {
    const MensajesActualizados = [];
    Contenido.innerHTML = "";
    querySnapshot.forEach((doc) => {
      if (doc.data().uid === user.uid) {
        Contenido.innerHTML += `<div class="d-flex justify-content-end">
              <img src="${
                user.photoURL
              }" alt="" class="rounded float-end" width="20px" height="20px">
              <span class="badge rounded-pill text-bg-primary"
                >${doc.data().Mensaje}</span
              ></div>`;
      } else {
        Contenido.innerHTML += `<div class="d-flex justify-content-start">
              <img src="${
                doc.data().photoURL
              }" alt="" class="rounded float-end" width="20px" height="20px">
              <span class="badge rounded-pill bg-primary text-white"
                >${doc.data().Mensaje}</span
              ></div>`;
      }
      MensajesActualizados.push({
        id: doc.uid,
        ...doc.data(),
      });
    });
    console.log(MensajesActualizados);
  });
  // Formulario.addEventListener("submit", async (e) => {
  //   e.preventDefault();
  //   if (!Mensaje.value.trim()) {
  //     console.log("Mensaje vacio");
  //     return;
  //   }
  //   console.log(Mensaje.value);
  //   try {
  //     await addDoc(collection(db, "Mensajes"), {
  //       uid: user.uid,
  //       NombreUsuario: user.displayName,
  //       fecha: new Date(),
  //       Mensaje: Mensaje.value,
  //       photoURL: user.photoURL,
  //       TokenNotificaciones: localStorage.getItem("token"),
  //     });
  //     console.log("Mensaje enviado", Mensaje.value);
  //     Mensaje.value = "";
  //     const message = {
  //       notification: {
  //         title: "Nuevo mensaje de " + user.displayName,
  //         body: Mensaje.value,
  //       },
  //       token: localStorage.getItem("token"),
  //     };
  //     // const response = await firebase.messaging.send(message);
  //     // if (response) {
  //     //   console.log("Notificacion enviada");
  //     // } else {
  //     //   console.log("Notificacion no enviada");
  //     // }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });
};
