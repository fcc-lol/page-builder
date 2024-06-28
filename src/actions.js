"use server";

async function scrape(url) {
  try {
    const response = await fetch(
      `http://localhost:4000/scrape?url=${encodeURIComponent(url)}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();

    return responseData.parentInnerText;
  } catch (error) {
    return {
      error,
    };
  }
}

async function GPT(data) {
  const request = {
    model: "gpt-4o",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "Given the provided text, only ever respond in JSON and use the format specified",
      },

      {
        role: "system",
        content:
          "JSON format: { name: NAME, address: { address_line_1:  ADDRESS_LINE_1, address_line_2:  ADDRESS_LINE_2,  city: CITY, state: STATE, zip_code: ZIP_CODE, country: COUNTRY }, category: CATEGORY, star_rating: STAR_RATING, url: URL } ",
      },
      {
        role: "user",
        content: data,
      },
    ],
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();

    return responseData.choices[0].message.content;
  } catch (error) {
    return {
      error,
    };
  }
}

export async function getGoogleMapData(prevState, formData) {
  const scrapedData = await scrape(formData.get("input"));
  const gptData = await GPT(scrapedData);

  return { response: gptData };
}
