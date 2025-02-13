// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/11.3.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  databaseURL:
    "https://bookmark-app-aab2b-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "bookmark");

// let myBookmarks = [];

const inputEl = document.getElementById("inputEl");
const saveBtn = document.getElementById("saveBtn");
const deleteBtn = document.getElementById("deleteBtn");
const displayItems = document.getElementById("displayItems");
const tabBtn = document.getElementById("tabBtn");

// const bookmarkFromLocalStorage = JSON.parse(
//   localStorage.getItem("myBookmarks")
// );

// if (bookmarkFromLocalStorage) {
//   myBookmarks = bookmarkFromLocalStorage;
//   renderBookmarks(myBookmarks);
// }

function renderBookmarks(bookmarks) {
  let listItem = "";

  for (let i = 0; i < bookmarks.length; i++) {
    let url = bookmarks[i];

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = `https://${url}`;
    }

    listItem += `
    <li class="list_item">
      <a href="${url}" target="_blank">
        ${bookmarks[i]}
      </a>
    </li>
  `;
  }

  displayItems.innerHTML = listItem;
}

onValue(referenceInDB, (snapshot) => {
  const snapshotDoesExist = snapshot.exists();
  if (snapshotDoesExist) {
    const snapshotValues = snapshot.val();
    const bookmarkList = Object.values(snapshotValues);
    renderBookmarks(bookmarkList);
  }
});

tabBtn.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    // myBookmarks.push(tabs[0].url);
    // localStorage.setItem("myBookmarks", JSON.stringify(myBookmarks));
    // renderBookmarks(myBookmarks);
  });
});

saveBtn.addEventListener("click", () => {
  handleInput();
});

deleteBtn.addEventListener("dblclick", () => {
  remove(referenceInDB);
  displayItems.innerHTML = "";
  // localStorage.clear();
  // myBookmarks = [];
  // renderBookmarks(myBookmarks);
});

function handleInput() {
  // myBookmarks.push(inputEl.value);
  push(referenceInDB, inputEl.value);
  inputEl.value = "";
  // localStorage.setItem("myBookmarks", JSON.stringify(myBookmarks));
  // renderBookmarks(myBookmarks);
}

inputEl.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleInput();
  }
});
