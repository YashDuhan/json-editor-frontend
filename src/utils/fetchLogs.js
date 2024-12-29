export const fetchLogs = async () => {
  try {
    const response = await fetch(
      "http://ec2-13-49-68-118.eu-north-1.compute.amazonaws.com:8000/fetch"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch logs");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching logs:", error);
    return { success: false, message: error.message };
  }
};
