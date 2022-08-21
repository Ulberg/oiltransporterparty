import { RefObject, useState } from 'react';

type Props = {
    ref:  RefObject<HTMLInputElement>
}

const OtpInputButton = (props: Props) => {

    const [otp,setOtp] = useState<string>("")

    if ('OTPCredential' in window) {
        console.log("OTP active")
        window.addEventListener('DOMContentLoaded', e => {
            alert("adding event listner")
        try{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            navigator.credentials.get({otp: { transport:['sms'] }}).then(otpResult=>{
                alert("OTP having result"+(otpResult as any).code as string)
                setOtp((otpResult as any).code as string)
            })
            
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
