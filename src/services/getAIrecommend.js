// services/apiService.js
import axios from "axios";

const fetchTripPlans = async (payload) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/api/trip-planner",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log("response", response?.data?.data?.trip_plans);
    return response?.data?.data?.trip_plans; // Trả về dữ liệu trip_plans
  } catch (error) {
    console.error("Error fetching trip plans:", error);
    throw error.response.data.detail;
  }
};

export default fetchTripPlans;
