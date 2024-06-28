// app/page.js (or any other page file)
import { db } from "../../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import PageViewer from "@/components/PageViewer";

async function getPageDataFromFirestore(db, id) {
  const database = collection(db, "pages");
  const documents = await getDocs(database);
  const document = documents.docs.find((doc) => doc.id === id);
  const data = document ? document.data() : null;

  if (data) {
    return { data };
  } else {
    return { error: "Page not found" };
  }
}

export default async function Page({ params }) {
  const pageId = params.slug;
  const firestoreData = await getPageDataFromFirestore(db, pageId);

  return (
    <div>
      <PageViewer />
      <h1>Params</h1>
      <pre>{JSON.stringify(params, null, 2)}</pre>
      <h1>Firestore</h1>
      <pre>{JSON.stringify(firestoreData, null, 2)}</pre>
    </div>
  );
}
