import {useState, useEffect} from "react";
import {firebase} from "../firebase";

import {defaultCategoriesList} from "../lib/defaultData";
import {CategoryClass} from "../lib/interfaces";

export const useCategories = () => {
  const [categoriesList, setCategoriesList] = useState([] as CategoryClass[]);
  const [nextId, setNextId] = useState(2);

  const userId = "Am6rTGvRXoLscCOIAVLe";

  const userRef = useEffect(() => {
    console.log("reading categories!");
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("categories")
      .orderBy("id")
      .get()
      .then((snapshot) => {
        const catListToSend = snapshot.docs.map(
          (category) => category.data() as CategoryClass
        );

        console.log(catListToSend);

        if (catListToSend !== categoriesList) {
          setCategoriesList(catListToSend);
        }

        setNextId();
      })
      .catch((error) => {
        console.error(error);
        setCategoriesList(defaultCategoriesList);
      });
  }, []);

  return {categoriesList, nextId, setCategoriesList};
};
