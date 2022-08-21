import { RefObject, useState } from 'react';

type Props = {
    ref:  RefObject<HTMLInputElement>
}

const OtpInputButton = (props: Props) => {

    const [otp,setOtp] = useState<any>();
    const [tempValue,setTempValue] = useState<any>();
    if ('OTPCredential' in window) {
        window.addEventListener('DOMContentLoaded', async (e) => {
          const ac = new AbortController();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const {type, code} = await navigator.credentials.get({otp: { transport:['sms'] },signal: ac.signal})
        setOtp(code);
        });
      }
    return <input value={otp} onChange={e => setOtp(e.target.value)} required/>
    
}

export default OtpInputButton;
