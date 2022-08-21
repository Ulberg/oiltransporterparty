import { env } from "../env/server.mjs";
const accountSid = env.TWILIO_ACCOUNT_SID;
const authToken = env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = env.TWILIO_PHONE_NUMBER;
import { Twilio } from "twilio";
const client = new Twilio(accountSid, authToken);

export const addInternationalCode = (phone:number) =>'+47'+phone.toString();

export const sendMessage = async (phone:string, body:string) =>{

    const response = await client.messages
    .create({
      body: body,
      to: phone,
      from: twilioPhoneNumber,
    })
    if (response.errorCode || response.errorMessage){
        throw new Error("Failure to send SMS")
    }
    return {sid: response.sid, mssid: response.messagingServiceSid, chunks:response.numSegments,totalPrice: response.price,currency: response.priceUnit}
    
}

