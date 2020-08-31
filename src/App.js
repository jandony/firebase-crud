import React, { useState, useEffect } from "react";
import "./App.css";
import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAoQvD6palv1-FI6xhOhvD3gs6FoDugd4I",
  authDomain: "fir-crud-deed4.firebaseapp.com",
  databaseURL: "https://fir-crud-deed4.firebaseio.com",
  projectId: "fir-crud-deed4",
  storageBucket: "fir-crud-deed4.appspot.com",
  messagingSenderId: "68349858800",
  appId: "1:68349858800:web:42a207073147f9f28f0335",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function App() {
  const [firebaseData, setFirebaseData] = useState([]);
  //   console.log(firebaseData);

  // Access "recipes" collection from Firebase
  useEffect(() => {
    firebase
      .firestore()
      .collection("recipes")
      .onSnapshot((snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFirebaseData(newData);
      });
  }, []);

  // useState for input form
  const [recipeName, setRecipeName] = useState(null);

  // Adds a firebase document to the "recipes" collection
  const onAdd = (e) => {
    e.preventDefault();

    firebase.firestore().collection("recipes").add({
      name: recipeName,
      description: "Another description!",
      category: "lunch",
    });
  };

  // Deletes a firebase document fro mthe "recipes" collection
  const onDelete = () => {
    console.log(firebase.firestore().collection("recipes").doc("French Toast"));
  };

  //   console.log(recipeName);
  return (
    <React.Fragment>
      <h1>Firebase CRUD App</h1>

      <form>
        <input
          type="text"
          id="recipeName"
          value={recipeName}
          onChange={(e) => {
            setRecipeName(e.target.value);
          }}
        />
        <button onClick={onAdd}>Add Recipe</button>
      </form>

      <table style={{ textAlign: "left" }}>
        <tr>
          <th>Recipe Name</th>
          <th>Description</th>
          <th>Category</th>
          <th>Delete?</th>
        </tr>
        {firebaseData.map((recipe) => {
          return (
            <tr key={recipe.id} id={recipe.id}>
              <td>{recipe.name}</td>
              <td>{recipe.description}</td>
              <td>{recipe.category}</td>
              <td style={{ textAlign: "center" }}>
                <button onClick={onDelete}>x</button>
              </td>
            </tr>
          );
        })}
      </table>
    </React.Fragment>
  );
}

export default App;
