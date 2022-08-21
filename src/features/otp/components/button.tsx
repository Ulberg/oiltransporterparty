import { RefObject, useState } from 'react';

type Props = {
    ref:  RefObject<HTMLInputElement>
}

const OtpInputButton = (props: Props) => {

    const [otp,setOtp] = useState<string>("")

    if ('OTPCredential' in window) {
        console.log("OTP active")
        window.addEventListener('DOMContentLoaded', e => {
        try{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            navigator.credentials.get({otp: { transport:['sms'] }}).then(otpResult=>{
                setOtp((otpResult as any).code as string)
            })
            
        }
        catch(e:any){
            console.error(e)
            alert(e.message)
        }
      })
    }
    return <input ref={props.ref} value={otp} autoComplete="one-time-code"/>
}

export default OtpInputButton;
