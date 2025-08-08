import React, { useState } from 'react';
import Input from '../Input';
import { useNavigate } from 'react-router-dom';
import { getHtConsumerData } from '../../utils/htConsumerApi.js';
import { transformDataKeys } from '../../utils/transFormDataKey.js';

export default function LoadChangeInstruction() {
  const [consumer, setConsumer] = useState('');
  const [error, setError] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage(''); // reset message

    if (!consumer) {
      setError({ Consumer_id: 'Please enter Consumer ID' });
      return;
    }

    setIsDisabled(true);

    try {
      const result = await getHtConsumerData(consumer);
      if (result?.list?.length > 0) {
        const transformedData = transformDataKeys(result.list[0]);
        setError({});
        setMessage('');
        navigate(`/ht-load-change/consumer-registration/${transformedData.consumer_id}`, {
          state: { data: transformedData },
        });
      } else {
        setError({ Consumer_id: 'Consumer ID not matched' });
        setMessage('Consumer ID not matched');
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setMessage('Error fetching data. Please try again.');
    } finally {
      setIsDisabled(false); // re-enable form
    }
  };

  return (
    <>
      <div className="space-y-12 container mx-auto border my-5  rounded-md border-gray shadow-md">
        <div className="border-b border-gray-900/10 pb-12">
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="border-b pb-4 mb-4">
              <h2 class="text-xl font-semibold text-gray-800">
                Important Instructions for filling HT Application
              </h2>
            </div>

            <div class="space-y-6">
              <div>
                <label class="block bg-blue-600 text-white font-medium px-4 py-2 rounded">
                  <div>To apply NSCHT following documents are required</div>
                  <div>(NSCHT लागू करने के लिए निम्नलिखित दस्तावेजों की आवश्यकता है)</div>
                </label>

                <ul class="list-disc list-inside mt-4 space-y-4 text-gray-700">
                  <li>
                    <p>
                      Document Establishing proof of Ownership/Tenancy or Occupation rights for the
                      premises
                      <br />
                      <span class="text-sm">(स्वामित्व प्रमाणित करने हेतु दस्तावेज़)</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      In case of Proprietary firm...certificate of incorporation
                      <br />
                      <span class="text-sm">(...प्रमाण पत्र)</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      Identity Proof is required...PAN is required...
                      <br />
                      <span class="text-sm">...पैन आवश्यक है।</span>
                    </p>
                    <ul class="list-disc ml-6 mt-2">
                      <li>
                        <p class="text-sm">
                          <strong>Note:</strong> As per MP Electricity Supply Code...
                          <a
                            href="{{download_documents.supply_code.url}}"
                            class="text-blue-600 underline"
                            target="_blank"
                          >
                            Download List
                          </a>
                          <br />
                          मध्य प्रदेश विद्युत आपूर्ति संहिता...
                        </p>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <p>
                      If extension work is to be done...contractor consent letter...
                      <br />
                      <span class="text-sm">...सहमति पत्र आवश्यक है...</span>
                    </p>
                  </li>
                </ul>
              </div>

              <div>
                <p class="font-semibold text-gray-800 mt-6">Important Points (महत्वपूर्ण बिन्दु)</p>
                <ul class="list-disc list-inside space-y-4 text-gray-700 mt-2">
                  <li>
                    Above Documents can be uploaded online in the pdf file format only.
                    <br />
                    <span class="text-sm">(पीडीएफ फ़ाइल के रूप में)</span>
                  </li>
                  <li>
                    To comply with various provisions...
                    <br />
                    <span class="text-sm">(वितरण कंपनी...)</span>
                  </li>
                  <li>
                    The supply Voltage for Different Contract Demands shall normally be as follows:
                    <ul class="list-disc ml-6 mt-2 space-y-2">
                      <li>11 KV: 50 kVA to 300 kVA</li>
                      <li>33 KV: 100 kVA to 10000 kVA</li>
                      <li>132 KV: 5000 kVA to 50000 kVA</li>
                      <li>220 KV+: 40000 kVA and above</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div>
                <label class="block bg-blue-600 text-white font-medium px-4 py-2 rounded mt-4">
                  <div>For making payments and document upload please note following details</div>
                  <div>(भुगतान / दस्तावेज़ अपलोड के लिए कृपया ध्यान दें)</div>
                </label>

                <ul class="list-disc list-inside mt-4 space-y-4 text-gray-700">
                  <li>
                    Payment...only through online or VAN
                    <br />
                    <span class="text-sm">(VAN के माध्‍यम से ही प्राप्‍त होगा)</span>
                  </li>
                  <li>
                    Each Challan has a separate and unique VAN...
                    <br />
                    <span class="text-sm">(अद्वितीय VAN...)</span>
                  </li>
                  <li>
                    If the applicant makes payment through Challan...
                    <br />
                    <span class="text-sm">(शुल्क उपभोक्‍ता को वहन करना होगा)</span>
                  </li>
                  <li>
                    Consumer/applicant does not have to make payment in any other bank account...
                    <br />
                    <span class="text-sm">(अन्य खाते में भुगतान नहीं करना है)</span>
                  </li>
                  <li>
                    For HT Application...online payment methods:
                    <ul class="list-disc ml-6 mt-2 space-y-2">
                      <li>
                        If you have Net banking... pay through payment gateway...
                        <br />
                        <span class="text-sm">(नेट बैंकिंग/क्रेडिट कार्ड से भुगतान...)</span>
                      </li>
                      <li>
                        If you don't have online option, go to MPOnline Kiosk...
                        <br />
                        <span class="text-sm">(एमपी ऑनलाइन कियोस्क...)</span>
                      </li>
                    </ul>
                  </li>
                  <li>
                    For documents to be uploaded:
                    <ul class="list-disc ml-6 mt-2 space-y-2">
                      <li>
                        The document should be of type pdf
                        <br />
                        <span class="text-sm">(केवल पीडीएफ फ़ारमैट)</span>
                      </li>
                      <li>
                        File size should be less than 2 MB
                        <br />
                        <span class="text-sm">(2 एमबी से कम)</span>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="bg-gray-100 rounded p-4 mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div className="w-70">
                      <Input
                        LName="Consumer Id"
                        Iname="consumer_id"
                        type="text"
                        value={consumer}
                        placeholder="Please Enter Consumer Id"
                        errorMsg={error.Consumer_id}
                        disabled={isDisabled}
                        onChange={e => setConsumer(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                        disabled={isDisabled}
                      >
                        Process
                      </button>
                      {message && <p className="text-red-600 text-sm">{message}</p>}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
