// app/page.js (or any other page file)
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

async function fetchFromFirestore(db) {
  const citiesCol = collection(db, "pages");
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map((doc) => doc.data());
  return cityList;
}

export default async function Home() {
  const firestoreData = await fetchFromFirestore(db);

  return (
    <div>
      <h1>Firestore Data</h1>
      <pre>{JSON.stringify(firestoreData, null, 2)}</pre>
    </div>
  );
}

export const config = {
  headers: () => [
    {
      key: "Cache-Control",
      value: "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
    },
    {
      key: "Pragma",
      value: "no-cache",
    },
    {
      key: "Expires",
      value: "0",
    },
  ],
};
