export const verifyOtp = async (mobileNo, otp) => {
  try {
    let data = {
      source: 'HT SANYOJAN PORTAL',
      mobileNo: mobileNo,
      otp: otp,
    };

    const response = await fetch(
      `https://resourceutils.mpcz.in:8888/MPCZ_OTP/api/otp/verifyOtpAll`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      console.log('OTP Sccessfully Matched');
      return { success: true };
    } else {
      console.error('connote Matched otp');
      return { success: false, error: 'OTP send failed' };
    }
  } catch (error) {
    console.error('Error sending OTP:', error);
    return { success: false, error };
  }
};

// const handleOtpSend = async (mobile_number, otpSendMsg) => {
//     const result = await sendOtp(mobile_number);
//     let sentOtpNum = mobile_number.slice(-4)
//     if (result.success) {
//       newErrors.otpStatusMsg = `${otpSendMsg}${sentOtpNum}`;
//       setError(newErrors);
//     } else {
//       newErrors.otpStatusMsg = ` ❌ OTP Send Failed on mobile number ******${sentOtpNum}`;
//       setError(newErrors);
//     }
//   };
//   const handleOtpVerify = async () => {
//     const result = await verifyOtp(mobile, otpValue);
//     if (result.success) {
//       setIsDisabled(false);
//       newErrors.otpStatusMsg = `✅ OTP verified successfully!`;
//       setError(newErrors);
//       navigate("/PayDetails")

//     } else {
//       newErrors.otpStatusMsg = `❌ Invalid OTP. Please try again.`;
//       setError(newErrors);
//     }
//   };
