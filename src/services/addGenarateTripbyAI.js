import api from "../utils/httpRequest";
const addGenarateTripbyAI = async (payload) => {
  try {
    console.log("Payload:", payload);

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token is missing.");
    }

    const res = await api.post("travelplan-service/plans/AI", payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error) {
    if (error.response) {
      console.error("Server Response Error:", error.response.data);
    } else if (error.request) {
      console.error("No Response Error:", error.request);
    } else {
      console.error("Setup Error:", error.message);
    }

    throw error;
  }
};

export default addGenarateTripbyAI;
