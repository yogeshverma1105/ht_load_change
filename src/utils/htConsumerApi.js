export const getHtConsumerData = async consumerId => {
  try {
    const response = await fetch(
      `https://services.mpcz.in/serviceportal/api/ht/getHtConsumersMasDataByConsumerId?consumerId=${consumerId}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching HT Consumer Data:', error);
    return null;
  }
};
