// @ts-nocheck
import './Create.css';
import { useState } from 'react';

type Props = {
    ref: MutableRefObject<null>
}

const OtpInputButton = (props: Props) => {

    const [otp,setOtp] = useState<string>("")

    if ('OTPCredential' in window) {
        window.addEventListener('DOMContentLoaded', async (e) => {
        try{
            const otpResult = await navigator.credentials.get({otp: { transport:['sms'] }})
            setOtp(otpResult.code)
        }
        catch(e:Error){
            console.error(e)
            alert(e.message)
        }
      })
    }
    return <input ref={props.ref} value={otp}/>
}

export default OtpInputButton;
