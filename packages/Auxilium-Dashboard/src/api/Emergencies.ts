export const getEmergencies = async (coordinates: Coordinates) => {
  try {
    const response = await fetch(`${process.env.API_URL}/emergencies/get`);
    const { emergencies } = await response.json();
    return emergencies;
  } catch (error) {
    alert(error.message);
  }
};
