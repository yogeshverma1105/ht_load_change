export const sendOtp = async mobile => {
  try {
    const data = {
      source: 'HT SANYOJAN PORTAL',
      mobileNo: mobile,
    };

    const response = await fetch(
      `https://resourceutils.mpcz.in:8888/MPCZ_OTP/api/otp/getOtp`,

      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      console.log('OTP sent successfully');
      return { success: true };
    } else {
      console.error('Failed to send OTP');
      return { success: false, error: 'OTP send failed' };
    }
  } catch (error) {
    console.error('Error sending OTP:', error);
    return { success: false, error };
  }
};
