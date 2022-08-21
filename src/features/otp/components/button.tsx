import { RefObject, useState } from 'react';

type Props = {
    ref:  RefObject<HTMLInputElement>
}

const OtpInputButton = (props: Props) => {

    const [otp,setOtp] = useState<any>();
    const [tempValue,setTempValue] = useState<any>();
    if ('OTPCredential' in window) {
        window.addEventListener('DOMContentLoaded', e => {
          const ac = new AbortController();

          navigator.credentials.get({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            otp: { transport:['sms'] },
            signal: ac.signal
          }).then(otp => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setOtp(otp.code)
          }).catch(err => {
            console.log(err);
          });
        });
      }
    return <>
    <h1> OTP: {otp} </h1>
    <h1> Input.value: {tempValue} </h1>
    <form>
  <input value={otp} onChange={e => setOtp(e.target.value)} required/>
  <input type="submit"/>
</form>
    </>
    
}

export default OtpInputButton;
