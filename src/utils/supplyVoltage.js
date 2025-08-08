const dropdownOptions = {
  typeOfChanges: [
    { label: 'Load Enhancement', value: 'Load_Enhancement' },
    { label: 'Load Reduction', value: 'Load_Reduction' },
  ],
  supplyVoltage: [
    { label: '11 KV', value: '11 KV' },
    { label: '33 KV', value: '33 KV' },
    { label: '132 KV', value: '132 KV' },
    { label: '220 KV', value: '220 KV' },
  ],
  enhancementOptions: [
    { label: 'Load Enhancement without Voltage Change', value: 'Load_Enhancement_without_Voltage_Change' },
    { label: 'Load Enhancement with Voltage Change', value: 'Load_Enhancement_with_Voltage_Change' },
    { label: 'Only Voltage Upgrade', value: 'Only_Voltage_Upgrade' },
    { label: 'Load Enhancement with Downgrade Voltage Level', value: 'Load_Enhancement_with_Downgrade_Voltage_Level' },
  ],
  reductionOptions: [
    { label: 'Load Reduction without Voltage Change', value: 'Load_Reduction_without_Voltage_Change' },
    { label: 'Load Reduction with Voltage Change', value: 'Load_Reduction_with_Voltage_Change' },
    { label: 'Load Reduction with Upgrade Voltage Level', value: 'Load_Reduction_with_Upgrade_Voltage_Level' },
    { label: 'Only Voltage Downgrade', value: 'Only_Voltage_Downgrade' },
  ],
};
const supplyVoltageOption = [
  { label: '11 KV', value: '11 KV' },
  { label: '33 KV', value: '33 KV' },
  { label: '132 KV', value: '132 KV' },
  { label: '220 KV', value: '220 KV' },
];
 
export { dropdownOptions, supplyVoltageOption };
