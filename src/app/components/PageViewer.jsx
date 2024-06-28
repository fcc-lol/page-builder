"use client";

import React from "react";
import { useFormState } from "react-dom";
import { getGoogleMapData } from "@/app/actions";

const PageViewer = () => {
  const initialState = "https://maps.app.goo.gl/BiDB26FefeeaghFd9";
  const [state, formAction] = useFormState(getGoogleMapData, initialState);

  return (
    <form action={formAction}>
      <input type="text" name="input" defaultValue={initialState} />
      <button type="submit">Send</button>
      <pre>{state?.response}</pre>
    </form>
  );
};

export default PageViewer;
