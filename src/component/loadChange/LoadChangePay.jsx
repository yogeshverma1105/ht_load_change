import React from 'react'
import Input from '../Input'

const LoadChangePay = () => {

    return (
        <>

            <form >
                <div className="space-y-12 container mx-auto border my-5  rounded-md border-gray shadow-md">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div class="block mb-2 border-b-2 p-2 ">
                            <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">HT NSC Load Change Application</h2>
                            <p className="mt-1 text-sm/6 text-gray-600">
                                This information will be displayed publicly so be careful what you share.
                            </p>
                        </div>
                        <div className='body p-4'>
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">Consumer Details</h2>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <Input LName="Application No." Iname="application_no" type="text" placeholder="" />
                                    <Input LName="Consumer No." Iname="Consumer_no" type="text" placeholder="" />
                                    <Input LName="Consumer Name." Iname="Consumer_name" type="text" placeholder="" />
                                    <Input LName="Mobile No." Iname="mobile_no" type="text" placeholder="" />
                                    <Input LName="Email." Iname="email" type="text" placeholder="" />
                                </div>
                            </div>

                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">Required Load Details</h2>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <Input LName="Type of change " Iname="type_of_change" type="text" placeholder="" />
                                    <Input LName="new Supply Voltage" Iname="new_supply_voltage" type="text" placeholder="" />
                                    <Input LName="Total Required Contract Demand(in KVA)" Iname="new_contract_demand" type="text" placeholder="" />

                                </div>
                            </div>
                            <div className="border-b border-gray-900/10 pb-12">
                                <div className="mt-10 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-4">
                                    <button type='button' class="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300">Any Update For Application</button>
                                    <button type='button' class="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300">View Application PDF</button>
                                    <button type='button' class="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300">Pay By Online</button>
                                    <button type='button' class="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300">Pay By Challen</button>
                                    
                                </div>
                            </div>

                            <div className="border-b border-gray-900/10 pb-12 ">
                                <div className="mt-10 flex flex-col justify-center items-center">
                                    <div className="flex space-x-2 space-y-2 flex-wrap justify-center items-baseline">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
        </>
    )
}
export default LoadChangePay