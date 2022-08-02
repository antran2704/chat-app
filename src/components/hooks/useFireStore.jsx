import { useState } from "react";
import { useEffect } from "react";
import { db } from "../../firebase/configs";

export const useFireStore = (collection, condition) => {
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    let collectionRef = db.collection(collection).orderBy('createdAt');
    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        // reset documents data
        setDocuments([]);
        return;
      }

      collectionRef = collectionRef.where(
        condition.fieldName,
        condition.operator,
        condition.compareValue
      );
    }

    collectionRef.onSnapshot((snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setDocuments(documents);
    });
  }, [collection, condition]);
  return documents;
};
