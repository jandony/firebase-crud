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
  // Declare all useState variables and functions
  const [data, setData] = useState([]); // collects firebase data
  let [recipeName, setRecipeName] = useState(""); // collects main input form
  let [recipeNameRow, setRecipeNameRow] = useState(""); // collects "Recipe Name" table row input form
  let [descriptionRow, setDescriptionRow] = useState(""); // collects "Description" table row input form
  let [categoryRow, setCategoryRow] = useState(""); // collects "Category" table row input form

  // READ - Access "recipes" collection from Firebase
  useEffect(() => {
    firebase
      .firestore()
      .collection("recipes")
      .onSnapshot((snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setData(newData);
      });
  }, []);

  // CREATE - Adds a firebase document to the "recipes" collection
  const onAdd = (e) => {
    e.preventDefault();
    if (recipeName.length > 0) {
      firebase.firestore().collection("recipes").doc().set({
        name: recipeName,
        description: "Another description!",
        category: "lunch",
      });
      // Reset input field to blank
      setRecipeName("");
    } else {
      alert("Text field MUST contain at least 1 character!");
    }
  };

  // UDPATE 1/2 - Edit button functions
  const onEdit = (recipe) => {
    console.log(recipe);
    setRecipeNameRow(recipe.name); // set the selected "Recipe Name" to the "recipeNameRow" variable
    setDescriptionRow(recipe.description); // set the selected "Description" to the "descriptionRow" variable
    setCategoryRow(recipe.category); // set the selected "Category" to the "categoryRow" variable

    document.getElementById(`editBtn-${recipe.id}`).style.display = "none"; // Hide edit button
    document.getElementById(`saveBtn-${recipe.id}`).style.display = "inherit"; // Show save button

    document.getElementById(`RecipeNameLabel-${recipe.id}`).style.display =
      "none"; // Hide "Recipe Name" value
    document.getElementById(`NewRecipeName-${recipe.id}`).style.display =
      "inherit"; // Show "Recipe Name" text field
    document.getElementById(`DescriptionLabel-${recipe.id}`).style.display =
      "none"; // Hide "Description" value
    document.getElementById(`NewDescription-${recipe.id}`).style.display =
      "inherit"; // Show "Description" text field
    document.getElementById(`CategoryLabel-${recipe.id}`).style.display =
      "none"; // Hide "Category" value
    document.getElementById(`NewCategory-${recipe.id}`).style.display =
      "inherit"; // Show "Category" text field
  };

  // UPDATE 2/2 - Save button functions
  const onSave = (recipe) => {
    firebase.firestore().collection("recipes").doc(recipe.id).set({
      name: recipeNameRow,
      description: descriptionRow,
      category: categoryRow,
    });

    document.getElementById(`editBtn-${recipe.id}`).style.display = "inherit"; // Show edit button
    document.getElementById(`saveBtn-${recipe.id}`).style.display = "none"; // Hide save button

    document.getElementById(`RecipeNameLabel-${recipe.id}`).style.display =
      "inherit"; // Show "Recipe Name" value
    document.getElementById(`NewRecipeName-${recipe.id}`).style.display =
      "none"; // Hide "Recipe Name" text field
    document.getElementById(`DescriptionLabel-${recipe.id}`).style.display =
      "inherit"; // Show "Description" value
    document.getElementById(`NewDescription-${recipe.id}`).style.display =
      "none"; // Hide "Description" text field
    document.getElementById(`CategoryLabel-${recipe.id}`).style.display =
      "inherit"; // Show "Category" value
    document.getElementById(`NewCategory-${recipe.id}`).style.display = "none"; // Hide "Category" text field
  };

  // DELETE - Deletes a firebase document fro mthe "recipes" collection
  const onDelete = (i) => {
    firebase.firestore().collection("recipes").doc(`${i}`).delete();
    console.log(i);
  };

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
          <th>ID</th>
          <th>Update</th>
          <th>Delete?</th>
        </tr>
        {data.map((recipe) => {
          return (
            <tr key={recipe.id} id={recipe.id}>
              <td id="rowName">
                <div id={`RecipeNameLabel-${recipe.id}`}>{recipe.name}</div>
                <input
                  type="text"
                  id={`NewRecipeName-${recipe.id}`}
                  className="newTextFields"
                  style={{ width: "90%", display: "none" }}
                  value={recipeNameRow}
                  onChange={(e) => {
                    setRecipeNameRow(e.target.value);
                  }}
                />
              </td>
              <td id="rowDescription">
                <div id={`DescriptionLabel-${recipe.id}`}>
                  {recipe.description}
                </div>
                <input
                  type="text"
                  id={`NewDescription-${recipe.id}`}
                  className="newTextFields"
                  style={{ width: "90%", display: "none" }}
                  value={descriptionRow}
                  onChange={(e) => {
                    setDescriptionRow(e.target.value);
                  }}
                />
              </td>
              <td id="rowCategory">
                <div id={`CategoryLabel-${recipe.id}`}>{recipe.category}</div>
                <input
                  type="text"
                  id={`NewCategory-${recipe.id}`}
                  className="newTextFields"
                  style={{ width: "90%", display: "none" }}
                  value={categoryRow}
                  onChange={(e) => {
                    setCategoryRow(e.target.value);
                  }}
                />
              </td>
              <td>{recipe.id}</td>
              <td style={{ textAlign: "center" }}>
                <button
                  id={`editBtn-${recipe.id}`}
                  onClick={() => onEdit(recipe)}
                >
                  Edit
                </button>
                <button
                  id={`saveBtn-${recipe.id}`}
                  onClick={() => onSave(recipe)}
                  style={{ display: "none" }}
                >
                  Save
                </button>
              </td>
              <td style={{ textAlign: "center" }}>
                <button onClick={() => onDelete(recipe.id)}>x</button>
              </td>
            </tr>
          );
        })}
      </table>
    </React.Fragment>
  );
}

export default App;
