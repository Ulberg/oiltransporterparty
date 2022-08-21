import { RefObject, useState } from 'react';

type Props = {
    ref:  RefObject<HTMLInputElement>
}

const OtpInputButton = (props: Props) => {

    const [otp,setOtp] = useState<any>("")

    if ('OTPCredential' in window) {
        window.addEventListener('DOMContentLoaded', e => {
          const input = document.querySelector('input[autocomplete="one-time-code"]');
          if (!input) return;
          const ac = new AbortController();
          const form = input.closest('form');
          if (form) {
            form.addEventListener('submit', e => {
              ac.abort();
            });
          }
          navigator.credentials.get({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            otp: { transport:['sms'] },
            signal: ac.signal
          }).then(otp => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            input.value = otp.code;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setOtp(otp.code)
            if (form) form.submit();
          }).catch(err => {
            console.log(err);
          });
        });
      }
    return <>
    <h1> {otp} </h1>
    <form>
  <input autoComplete="one-time-code" required/>
  <input type="submit"/>
</form>
    </>
    
}

export default OtpInputButton;
