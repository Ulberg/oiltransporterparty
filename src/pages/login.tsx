import type { NextPage } from "next";
import Head from "next/head";
import { useRef, useState } from "react";
import { trpc } from "../utils/trpc";
import OtpInputButton from '../features/otp/components/button'


const Home: NextPage = () => {

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otpVisible, setOtpVisible] = useState(false);
  
  const sendOTP = trpc.useMutation("sms.otp", {onSuccess:()=>{}});
  
  

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    // TODO - clean up input validation
    const newPhoneNumber = e.target.value;
    if (newPhoneNumber.length <= 8 && /^[0-9]+$/.test(newPhoneNumber)){
        setPhoneNumber(newPhoneNumber)
    }
  }

  const handleSubmit = async () =>{
    if (phoneNumber.length == 8){
        setOtpVisible(true);
        const transactionalData = await sendOTP.mutateAsync({phoneNumber: Number(phoneNumber)});
    }
    

  }

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4 bg-slate-600">
        <input className="mb-4" value={phoneNumber} onInput={handlePhoneNumberChange} />
        <button className="p-5 border-white bg-blend-color-burn" onClick={handleSubmit} >Request Access</button>
        {otpVisible && <OtpInputButton/> }
      </main>
    </>
  );
};


export default Home;

