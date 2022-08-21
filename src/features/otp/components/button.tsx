import './Create.css';
import { RefObject, useState } from 'react';

type Props = {
    ref:  RefObject<HTMLInputElement>
}

const OtpInputButton = (props: Props) => {

    const [otp,setOtp] = useState<string>("")

    if ('OTPCredential' in window) {
        window.addEventListener('DOMContentLoaded', async (e) => {
        try{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const otpResult = await navigator.credentials.get({otp: { transport:['sms'] }})
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setOtp(otpResult.code)
        }
        catch(e:any){
            console.error(e)
            alert(e.message)
        }
      })
    }
    return <input ref={props.ref} value={otp}/>
}

export default OtpInputButton;
