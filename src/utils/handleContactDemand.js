export const validateVoltageRange = (voltage, value) => {
  const ranges = {
    '11 KV': { min: 50, max: 300, message: 'The value should be 50 to 300 KVA' },
    '33 KV': { min: 100, max: 10000, message: 'The value should be 100 to 10000 KVA' },
    '132 KV': { min: 4001, max: 49999, message: 'The value should be between 4001 and 49999 KVA' },
    '220 KV': { min: 40000, max: 100000, message: 'The value should be equal and above 40000 KVA' },
  };

  const range = ranges[voltage];
  if (range && (value < range.min || value > range.max)) {
    return range.message;
  }

  return '';
};


export const validateDemandLogic = (type, value, current, typesOfChangeValue,htConsumers,totalYearConnectionDate,totalYearLastReductionDate) => {
  if (type === 'Load_Enhancement') {
    if(value < current){

    }



    // if (value < current && typesOfChangeValue !== 'Load_Enhancement_with_Downgrade_Voltage_Level') {
    //   return `Contract demand cannot be less than current demand (${current} KVA)`;
    // } else {
    //   return ``;
    // }
  }else if (type === 'Load_Reduction') {
    if (value < current) {
      const contractDemand = Math.floor(current / 2);

      if (
        totalYearConnectionDate < 2 &&
        !htConsumers?.last_reduction_date &&
        contractDemand > value
      ) {
        return `The connection has not completed two years yet ${current} KVA)`;
      }
    } else {
      return `Contract demand cannot be greater than current demand (${current} KVA)`;
    }
  }
return '';
}
