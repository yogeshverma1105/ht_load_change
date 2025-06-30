import React from 'react'
import Input from './Input'


export default function ApplicantBasicDetails({htConsumers}) {
  return (

    
    <>
    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <Input LName="Consumer Id" Iname="consumer_id" type="text" value={htConsumers?.consumerId ||""}  placeholder="please Enter Consumer Id " />
                <Input LName="Consumer Name" Iname="consumer_name" type="text"  value={htConsumers.consumerName}  placeholder="please Enter Consumer Name " />
                <Input LName="Mobile" Iname="mobile" type="number"  value={htConsumers.mobile}  placeholder="please Enter Consumer Name " />
                <Input LName="Email" Iname="email" type="email"   value={htConsumers.email}  placeholder="please Enter Consumer Name " />
                <Input LName="Address" Iname="address" type="text"  value={htConsumers.address}  placeholder="please Enter Consumer Name " />
                <Input LName="PanCard" Iname="pan_card_no" type="text"   value={htConsumers.panCard}  placeholder="please Enter Consumer Name " />
                <Input LName="Connection Date" Iname="connection_date" type="text"   value={htConsumers.conectionDate}  placeholder="please Enter Consumer Name " />
                <Input LName="Region" Iname="region" type="text"   value={htConsumers.region}  placeholder="please Enter Consumer Name " />
                <Input LName="Circle" Iname="circle" type="text"   value={htConsumers.circle}  placeholder="please Enter Consumer Name " />
                <Input LName="Division" Iname="division" type="text"   value={htConsumers.division}  placeholder="please Enter Consumer Name " />
                <Input LName="Substation Name" Iname="substation_name" type="text"  value={htConsumers.substationName}  placeholder="please Enter Consumer Name " />
                <Input LName="Feeder Name" Iname="feeder_name" type="text"   value={htConsumers.feederName}  placeholder="please Enter Consumer Name " />
              </div>
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">Connection Details..</h2>
                {/* <p className="mt-1 text-sm/6 text-gray-600">
                  This information will be displayed publicly so be careful what you share.
                </p> */}

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <Input LName="Connection Type" Iname="connection_type" type="text"  value={htConsumers.connectionType}  placeholder="please Enter Consumer Id " />
                  <Input LName="Connection Category" Iname="connectionCategory" type="text"   value={htConsumers.tariff}  placeholder="please Enter Consumer Id " />
                  <Input LName="Connection Sub Category" Iname="connectionSubCategory" type="text"   value={htConsumers.tariffDes}  placeholder="please Enter Consumer Id " />
                  <Input LName="Connection Purpose" Iname="connectionPurpose" type="text"   value={htConsumers.purposeInstal}  placeholder="please Enter Consumer Id " />
                  <Input LName="Supply Voltage" Iname="supplyVoltage" type="text"   value={htConsumers.vos}  placeholder="please Enter Consumer Id " />
                  {htConsumers?.connectionType === "Permanent" && (
                    <Input LName="Sanction Load " Iname="sanction_load" type="text"   value={htConsumers.sanctionLoad}  placeholder="please Enter Consumer Id " />
                  )}
                  {htConsumers?.connectionType === "Temporary" && (
                    <Input LName="Temporary Load " Iname="temporaryLoad" type="text"   value={htConsumers.tempCd}  placeholder="please Enter Consumer Id " />
                  )}

                </div>
              </div>
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">METER Details..</h2>
                {/* <p className="mt-1 text-sm/6 text-gray-600">
                  This information will be displayed publicly so be careful what you share.
                </p> */}

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <Input LName="ME Serial" Iname="meSerialNo" type="text"  value={htConsumers.meSerial}  placeholder="please Enter Consumer Id " />
                  <Input LName="ME Make" Iname="me_make" type="text"  value={htConsumers.meMake}  placeholder="please Enter Consumer Id " />
                  <Input LName="ME Ct Ratio" Iname="me_ct_ratio" type="text"   value={htConsumers.meCtRatio}  placeholder="please Enter Consumer Id " />
                  <Input LName="ME Pt Ratio" Iname="me_pt_ratio" type="text"  value={htConsumers.mePtRatio}  placeholder="please Enter Consumer Id " />
                  <Input LName="Meter No" Iname="meter_no" type="text"  value={htConsumers.meterNo}  placeholder="please Enter Consumer Id " />
                  <Input LName="Meter Type" Iname="metertype" type="text"   value={htConsumers.meterType}  placeholder="please Enter Consumer Id " />
                  <Input LName="Meter Make" Iname="meter_make" type="text"   value={htConsumers.meterMake}  placeholder="please Enter Consumer Id " />
                  <Input LName="Meter Ct Ratio" Iname="meter_ct_ratio" type="text"   value={htConsumers.meterCtRatio}  placeholder="please Enter Consumer Id " />
                  <Input LName="Meter Pt Ratio" Iname="meter_pt_ratio" type="text" value={htConsumers.meterPtRatio}  placeholder="please Enter Consumer Id " />
                  <Input LName="Meter Accuracy Class" Iname="meteraccuracy" type="text"   value={htConsumers.meterAccuracyClass}  placeholder="please Enter Consumer Id " />
                  <Input LName="Dial Factor" Iname="dial_factor" type="text"   value={htConsumers.dialFactor}  placeholder="please Enter Consumer Id " />
                  <Input LName="MF(Multiply )" Iname="mf" type="text"   value={htConsumers.overallMf}  placeholder="please Enter Consumer Id " />

                </div>
              </div>
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">Bill Details..</h2>
                 {/* <p className="mt-1 text-sm/6 text-gray-600">
                  This information will be displayed publicly so be careful what you share.
                </p> */}

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <Input LName="Previous Bill Id" Iname="previous_bill_id" type="text"   value={htConsumers.previousBillId} placeholder="please Enter Consumer Id " />
                  <Input LName="Previous Bill Month" Iname="previous_bill_month" type="text"   value={htConsumers.previousBillMonth} placeholder="please Enter Consumer Id " />
                  <Input LName="Previous Bill Units" Iname="previous_billed_units" type="text"   value={htConsumers.previousBilledUnits} placeholder="please Enter Consumer Id " />
                  <Input LName="Previous Net Bill" Iname="previous_net_bill" type="text"   value={htConsumers.previousNetBill} placeholder="please Enter Consumer Id " />
                  <Input LName="Current Bill Id" Iname="bill_id" type="text"   value={htConsumers.billId} placeholder="please Enter Consumer Id " />
                  <Input LName="Current bill Month" Iname="bill_month" type="text"   value={htConsumers.billMonth} placeholder="please Enter Consumer Id " />
                  <Input LName="Current Bill Units" Iname="billed_units" type="text"   value={htConsumers.billedUnits} placeholder="please Enter Consumer Id " />
                  <Input LName="Current Net Bill" Iname="net_bill" type="text"  value={htConsumers.netBill} placeholder="please Enter Consumer Id " />

                </div>
              </div>
    </>
  )
}
