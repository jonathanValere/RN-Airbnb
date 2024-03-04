import axios from "axios";

const GetAllRooms = async () => {
  try {
    const { data } = await axios.get(
      "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
    );
    return data;
  } catch (error) {
    return console.log(error);
  }
};

export default GetAllRooms;
