import { RefObject, useState } from 'react';

type Props = {
    ref:  RefObject<HTMLInputElement>
}

const OtpInputButton = (props: Props) => {
    const [otp,setOtp] = useState<any>();
    if ('OTPCredential' in window) {
        window.addEventListener('DOMContentLoaded', async (e) => {
            //Double type casting because the Native Web APIs has incorrect typing for this use case 😅
        const {code} = await navigator.credentials.get({otp: { transport:['sms'] }} as any) as any
        setOtp(code);
        });
      }
    return <input value={otp} onChange={e => setOtp(e.target.value)} required/>
    
}

export default OtpInputButton;
