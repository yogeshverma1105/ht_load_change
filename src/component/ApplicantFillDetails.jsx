import { Link } from "react-router-dom";
import { MEDIA_FILE_BASE } from '../api/api.js'


const ApplicantFillDetails = ({ htConsumers }) => {
    console.log(htConsumers)
    function Input({ LName, Iname, type, placeholder, value, }) {
        return (
            <>
                <div className="sm:col-span-2">
                    <label htmlFor={LName} className="block text-sm/6 font-medium text-gray-900">
                        {LName}
                    </label>
                    <div className="mt-2">
                        <input
                            name={Iname}
                            type={type}
                            value={value}

                            placeholder={placeholder}
                            readOnly // ✅ Use this instead of disabled
                            autoComplete="given-name"
                            className="uppercase block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                    {/* {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>} */}
                </div>
            </>
        );
    }
    return (

        <>
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
                    Required Details..
                </h2>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <Input
                        LName="Type of Change"
                        Iname="type_of_change"
                        type="text"
                        value={htConsumers.type_of_change}
                        placeholder="Enter Type of Change"

                    />

                    <Input
                        LName="Types of Change"
                        Iname="lc_type"
                        type="text"
                        value={htConsumers.lc_type}
                        placeholder="Enter Sub Type of Change"

                    />


                    <Input
                        LName="New Supply Voltage"
                        Iname="new_supply_voltage"
                        type="text"
                        value={htConsumers.new_supply_voltage}
                        placeholder="Enter New Supply Voltage"

                    />
                    <Input
                        LName="Total Required Contract Demand(in KVA)"
                        Iname="new_contact_demand"
                        type="number"
                        value={htConsumers.new_contact_demand}
                        placeholder="Please Enter New Contract Demand"

                    />
                    <Input
                        LName="Change in Contract Demand (in KVA)"
                        Iname="contract_demand_difference"
                        type="text"
                        value={htConsumers.contract_demand_difference}

                        placeholder="please Enter Contract Demand Difference"

                    />
                    <Input
                        LName="Purpose Of Installation Details"
                        Iname="purpose_of_installation_details"
                        type="text"
                        value={htConsumers.purpose_of_installation_details}
                        placeholder="Please Enter Purpose Of Installation Details"

                    />
                </div>
            </div>
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
                    Bank Details..
                </h2>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <Input
                        LName="Account Holder Name"
                        Iname="ac_holder_name"
                        type="text"
                        value={htConsumers.ac_holder_name}
                        placeholder="please Enter Account Holder Name"

                    />
                    <Input
                        LName="Bank Name"
                        Iname="bank_name"
                        type="text"
                        value={htConsumers.bank_name}
                        placeholder="please Enter Bank Name"
                    />
                    <Input
                        LName="Bank IFSC Code"
                        Iname="bank_ifsc_code"
                        type="text"
                        value={htConsumers.bank_ifsc_code}
                        placeholder="please Enter Bank IFSC Code"
                    />
                    <Input
                        LName="Bank Account Number"
                        Iname="bank_ac_no"
                        type="text"
                        value={htConsumers.bank_ac_no}
                        placeholder="please Enter Bank Account Number"
                    />
                    <Link
                        to={htConsumers?.bank_docs}
                        target="_blank"
                        rel="noopener noreferrer" className="rounded-lg  mt-8 px-3 py-2 text-center text-green-100 bg-indigo-500 hover:bg-fuchsia-500 duration-300">
                        {htConsumers?.bank_docs ? 'View Back Details' : 'No File View'}

                    </Link>
                </div>
            </div>
            { (htConsumers?.new_pan_card_no || htConsumers?.pan_card_doc ||htConsumers?.gst_doc ||htConsumers?.uploaded_doc_no ||htConsumers?.uploaded_doc_name ||htConsumers?.upload_file) &&(
                    <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
                    Upload Other Document Details..
                </h2>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {htConsumers?.new_pan_card_no && (
                        <Input
                            LName="Pan No"
                            type="text"
                            value={htConsumers?.new_pan_card_no}
                            readOnly
                        />
                    )}
                    {htConsumers?.pan_card_doc && (
                        <Link
                            to={htConsumers?.bank_docs}
                            target="_blank"
                            rel="noopener noreferrer" className="rounded-lg  mt-8 px-3 py-2 text-center text-green-100 bg-indigo-500 hover:bg-fuchsia-500 duration-300">
                            {htConsumers?.pan_card_doc ? 'View Pan Card ' : 'No File View'}
                        </Link>
                    )}
                    {htConsumers?.gst_doc && (
                        <Link
                            to={htConsumers?.gst_doc}
                            target="_blank"
                            rel="noopener noreferrer" className="rounded-lg  mt-8 px-3 py-2 text-center text-green-100 bg-indigo-500 hover:bg-fuchsia-500 duration-300">
                            {htConsumers?.gst_doc ? 'View GST ' : 'No File View'}
                        </Link>
                    )}




                    {htConsumers?.uploaded_doc_no && (
                        <Input
                            LName="Other Document No "
                            type="text"
                            value={htConsumers?.uploaded_doc_no}
                            readOnly
                        />

                    )}
                    {htConsumers?.uploaded_doc_name && (
                        <Input
                            LName="Other Document Name"
                            type="text"
                            value={htConsumers?.uploaded_doc_name}
                            readOnly
                        />

                    )}
                    {htConsumers?.upload_file && (
                        <Link
                            to={htConsumers?.upload_file}
                            target="_blank"
                            rel="noopener noreferrer" className="rounded-lg  mt-8 px-3 py-2 text-center text-green-100 bg-indigo-500 hover:bg-fuchsia-500 duration-300">
                            {htConsumers?.upload_file ? 'View Other Document ' : 'No File View'}

                        </Link>
                    )}



                </div>
            </div>
                )
            }
            
        </>
    )
}
export default ApplicantFillDetails