import axios from "axios";

export const getToken = async () => {
  try {
    const res = await axios.get(
      "https://api.blog.redberryinternship.ge/api/token"
    );
    return res.data.token;
  } catch (error) {
    console.error("Error fetching token:", error);
    throw error;
  }
};
