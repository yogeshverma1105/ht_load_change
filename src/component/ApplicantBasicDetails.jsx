import React from 'react';
import Input from './Input';

export default function ApplicantBasicDetails({ htConsumers }) {
  return (
    <>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
         {/* <Input
          LName="Application No"
          Iname="application_no"
          type="text"
          value={htConsumers?.application_no}
          placeholder="please Enter Application No"
        /> */}
        <Input
          LName="Consumer Id"
          Iname="consumer_id"
          type="text"
          value={htConsumers?.consumer_id}
          placeholder="please Enter Consumer Id "
        />
        <Input
          LName="Consumer Name"
          Iname="consumer_name"
          type="text"
          value={htConsumers?.consumer_name}
          placeholder="please Enter Consumer Name "
        />
        <Input
          LName="Mobile"
          Iname="mobile"
          type="number"
          value={htConsumers.mobile}
          placeholder="please Enter Consumer Name "
        />
        <Input
          LName="Email"
          Iname="email"
          type="email"
          value={htConsumers.email}
          placeholder="please Enter Consumer Name "
        />
        <Input
          LName="Address"
          Iname="address"
          type="text"
          value={htConsumers.address}
          placeholder="please Enter Consumer Name "
        />
        <Input
          LName="PanCard"
          Iname="pan_card_no"
          type="text"
          value={htConsumers.pan_card_no}
          placeholder="please Enter Consumer Name "
        />
        <Input
          LName="Connection Date"
          Iname="connection_date"
          type="text"
          value={htConsumers.connection_date}
          placeholder="please Enter Consumer Name "
        />
        <Input
          LName="Load Effective Date"
          Iname="existing_load_effective_date"
          type="text"
          value={htConsumers.load_effective_date}
          placeholder="please Enter Load Effective Date "
        />
        <Input
          LName="Last Reduction Date"
          Iname="last_reduction_date" 
          type="text"
          value={htConsumers.last_reduction_date}
          placeholder="please Enter Last Reduction Date "
        />
        <Input
          LName="Region"
          Iname="region"
          type="text"
          value={htConsumers.region}
          placeholder="please Enter Consumer Name "
        />
        <Input
          LName="Circle"
          Iname="circle"
          type="text"
          value={htConsumers.circle}
          placeholder="please Enter Consumer Name "
        />
        <Input
          LName="Division"
          Iname="division"
          type="text"
          value={htConsumers.division}
          placeholder="please Enter Consumer Name "
        />
        <Input
          LName="Substation Name"
          Iname="substation_name"
          type="text"
          value={htConsumers.substation_name}
          placeholder="please Enter Consumer Name "
        />
        <Input
          LName="Feeder Name"
          Iname="feeder_name"
          type="text"
          value={htConsumers.feeder_name}
          placeholder="please Enter Consumer Name "
        />
      </div>
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
          Connection Details..
        </h2>
        {/* <p className="mt-1 text-sm/6 text-gray-600">
                  This information will be displayed publicly so be careful what you share.
                </p> */}

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <Input
            LName="Connection Type"
            Iname="connection_type"
            type="text"
            value={htConsumers.connection_type}
            placeholder="please Enter Consumer Id "
          />
          <Input
            LName="Connection Category"
            Iname="connection_category"
            type="text"
            value={htConsumers.connection_category}
            placeholder="please Enter Consumer Id "
          />
          <Input
            LName="Connection Sub Category"
            Iname="connection_sub_category"
            type="text"
            value={htConsumers.connection_sub_category}
            placeholder="please Enter Consumer Id "
          />
          <Input
            LName="Connection Purpose"
            Iname="connection_purpose"
            type="text"
            value={htConsumers.connection_purpose}
            placeholder="please Enter Consumer Id "
          />
        
          <Input
            LName="Existing Supply Voltage"
            Iname="existing_supply_voltage"
            type="text"
            value={htConsumers.existing_supply_voltage}
            placeholder="please Enter Consumer Id "
          />
          {htConsumers?.connection_type === 'Permanent' && (
            <Input
              LName="Existing Contract Demand"
              Iname="existing_contract_demand"
              type="text"
              value={htConsumers.existing_contract_demand}
              placeholder="please Enter Consumer Id "
            />
          )}
          {htConsumers?.connection_type === 'Temporary' && (
            <Input
              LName=" Existing Temporary Contact Demand "
              Iname="temporaryLoad"
              type="text"
              value={htConsumers.temporaryLoad}
              placeholder="please Enter Consumer Id "
            />
          )}
        </div>
      </div>
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
          METER Details..
        </h2>
        {/* <p className="mt-1 text-sm/6 text-gray-600">
                  This information will be displayed publicly so be careful what you share.
                </p> */}

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <Input
            LName="ME Serial"
            Iname="me_serial_no"
            type="text"
            value={htConsumers.me_serial_no}
            placeholder="please Enter Consumer Id "
          />
          <Input
            LName="ME Make"
            Iname="me_make"
            type="text"
            value={htConsumers.me_make}
            placeholder="please Enter Consumer Id "
          />
          <Input
            LName="ME Ct Ratio"
            Iname="me_ct_ratio"
            type="text"
            value={htConsumers.me_ct_ratio}
            placeholder="please Enter Consumer Id "
          />
          <Input
            LName="ME Pt Ratio"
            Iname="me_pt_ratio"
            type="text"
            value={htConsumers.me_pt_ratio}
            placeholder="please Enter Consumer Id "
          />
          <Input
            LName="Meter Type"
            Iname="meter_type"
            type="text"
            value={htConsumers.meter_type}
            placeholder="please Enter Consumer Id "
          />
          <Input
            LName="Solar Installation Capacity"
            Iname="solar_installation_capacity"
            type="text"
            value={htConsumers.solar_installation_capacity}
            placeholder="please Enter solar Installation Capacity "
          />
          <Input
            LName="Net Meter Install Date"
            Iname="net_meter_install_date"
            type="text"
            value={htConsumers.net_meter_install_date}
            placeholder="please Enter solar Installation Capacity "
          />
          <Input
            LName="Meter No"
            Iname="meter_no"
            type="text"
            value={htConsumers.meter_no}
            placeholder="please Enter Consumer Id "
          />
          <Input
            LName="Meter Make"
            Iname="meter_make"
            type="text"
            value={htConsumers.meter_make}
            placeholder="please Enter Consumer Id "
          />
          <Input
            LName="Meter Ct Ratio"
            Iname="meter_ct_ratio"
            type="text"
            value={htConsumers.meter_ct_ratio}
            placeholder="please Enter Consumer Id "
          />
          <Input
            LName="Meter Pt Ratio"
            Iname="meter_pt_ratio"
            type="text"
            value={htConsumers.meter_pt_ratio}
            placeholder="please Enter Consumer Id "
          />
          <Input
            LName="Meter Accuracy Class"
            Iname="meter_accuracy"
            type="text"
            value={htConsumers.meter_accuracy}
            placeholder="please Enter Consumer Id "
          />
          <Input
            LName="Dial Factor"
            Iname="dial_factor"
            type="text"
            value={htConsumers.dial_factor}
            placeholder="please Enter Consumer Id "
          />
          <Input
            LName="MF(Multiply )"
            Iname="mf"
            type="text"
            value={htConsumers.mf}
            placeholder="please Enter Consumer Id "
          />
        </div>
      </div>
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
          Bill Details..
        </h2>
        {/* <p className="mt-1 text-sm/6 text-gray-600">
                  This information will be displayed publicly so be careful what you share.
                </p> */}

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <Input
            LName="Previous Bill Id"
            Iname="prev_bill_id"
            type="text"
            value={htConsumers.prev_bill_id}
            placeholder="please Enter Consumer Id "
          />
          <Input
            LName="Previous Bill Month"
            Iname="prev_bill_month"
            type="text"
            value={htConsumers.prev_bill_month}
            placeholder="please Enter Consumer Id "
          />
          <Input
            LName="Previous Bill Units"
            Iname="prev_bill_units"
            type="text"
            value={htConsumers.prev_bill_units}
            placeholder="please Enter Consumer Id "
          />
          <Input
            LName="Previous Net Bill"
            Iname="prev_net_bill_amt"
            type="text"
            value={htConsumers.prev_net_bill_amt}
            placeholder="please Enter Consumer Id "
          />
          <Input
            LName="Current Bill Id"
            Iname="current_bill_id"
            type="text"
            value={htConsumers.current_bill_id}
            placeholder="please Enter Consumer Id "
          />
          <Input
            LName="Current bill Month"
            Iname="current_bill_month"
            type="text"
            value={htConsumers.current_bill_month}
            placeholder="please Enter Consumer Id "
          />
          <Input
            LName="Current Bill Units"
            Iname="current_bill_units"
            type="text"
            value={htConsumers.current_bill_units}
            placeholder="please Enter Consumer Id "
          />
          <Input
            LName="Current Net Bill"
            Iname="current_net_bill_amt"
            type="text"
            value={htConsumers.current_net_bill_amt}
            placeholder="please Enter Consumer Id "
          />
          <Input
            LName="Outstanding Amount"
            Iname="outstanding_amt"
            type="text"
            value={htConsumers.Outstanding_amt}
            placeholder="please Enter Outstanding Amount "
          />
          <Input
            LName=""
            Iname="region_code"
            type="hidden"
            value={htConsumers.region_code}
            placeholder=""
          />
          <Input
            LName=""
            Iname="circle_code"
            type="hidden"
            value={htConsumers.circle_code}
            placeholder=""
          />
          <Input
            LName=""
            Iname="division_code"
            type="hidden"
            value={htConsumers.division_code}
            placeholder=""
          />
            <Input
            LName=""
            Iname="connection_purpose_id"
            type="hidden"
            value={htConsumers.connection_purpose_id}
            placeholder=" "
          />
        </div>
      </div>
    </>
  );
}
