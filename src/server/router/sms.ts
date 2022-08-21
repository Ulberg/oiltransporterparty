import { createRouter } from "./context";
import { z } from "zod";
import { addInternationalCode, sendMessage } from "../../utils/twilio";
import { newOTPFormSchema } from "../../features/otp/formValidation";

export const smsRouter = createRouter()
  .mutation("otp", {
    input: newOTPFormSchema,
    resolve: async ({ input , ctx }) => {
        const norwegianPhoneNumber = addInternationalCode(input.phoneNumber)
        const Otp = Math.floor(100000 + Math.random() * 899999)
        // should do some verification that there has not been made a OTP call for that same number in the last 1 min. 
        const dbEntry = await ctx.prisma.webOTP.create({
            data: {
            phone: norwegianPhoneNumber,
            password: Otp}
        })
        const OTPTemplate = (Otp:number, URL:string) =>{
            const OtpString = Otp.toString()
            return `Your OTP is: ${OtpString}.\n@${URL} #${OtpString}`
        }

        try
        {
            //TODO find better way to use ENV
            const body = OTPTemplate(Otp,process.env.NEXT_PUBLIC_VERCEL_URL as string);
            return await sendMessage(norwegianPhoneNumber,body);
        }
        catch(e){
            await ctx.prisma.webOTP.delete({where:{
                id:dbEntry.id
            }})
            return e;
        }
    },});