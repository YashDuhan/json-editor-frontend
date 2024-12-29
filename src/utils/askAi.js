export const askAi = async (question, selectedText, jsonData) => {
  try {
    const response = await fetch(
      "http://ec2-13-49-68-118.eu-north-1.compute.amazonaws.com:8000/ask",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_json: JSON.stringify(jsonData),
          selected_json: selectedText,
          question: question,
        }),
      }
    );
    // Print Data
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
};
