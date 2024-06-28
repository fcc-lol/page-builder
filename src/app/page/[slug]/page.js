// app/page.js (or any other page file)
import { db } from "../../../firebase-config";
import { collection, getDocs } from "firebase/firestore";

async function fetchFromFirestore(db, id) {
  const citiesCol = collection(db, "pages");
  const citySnapshot = await getDocs(citiesCol);
  const cityDoc = citySnapshot.docs.find((doc) => doc.id === id);
  const cityData = cityDoc ? cityDoc.data() : null;
  return cityData;
}

export default async function Home({ params, searchParams }) {
  const firestoreData = await fetchFromFirestore(db, params.slug);

  return (
    <div>
      <h1>Params Data</h1>
      <pre>{JSON.stringify(params, null, 2)}</pre>
      <h1>Search Params Data</h1>
      <pre>{JSON.stringify(searchParams, null, 2)}</pre>
      <h1>Firestore Data</h1>
      <pre>{JSON.stringify(firestoreData, null, 2)}</pre>
    </div>
  );
}
