export const pushLogsToDB = async (jsonData) => {
  try {
    const jsonString = JSON.stringify(jsonData);

    const response = await fetch(
      "http://ec2-13-49-68-118.eu-north-1.compute.amazonaws.com:8000/push",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ json_data: jsonString }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to save logs.");
    }

    return { success: true };
  } catch (error) {
    console.error("Log saving error:", error.message);
    return { success: false, message: error.message };
  }
};
