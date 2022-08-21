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

        const noAttemptedOTPWithinLastMin = await ctx.prisma.webOTP.count({where:{
            AND:[
                {phone:norwegianPhoneNumber},
                {created:new Date(Date.now() - 1000*60).toISOString()}
            ]
        }}) === 0

        if (!noAttemptedOTPWithinLastMin) throw new Error("You are not allowed to retry OTP more than once per min")

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
            const body = OTPTemplate(Otp,process.env.VERCEL_URL as string);
            const smsTransactionalData = await sendMessage(norwegianPhoneNumber,body);
            return norwegianPhoneNumber;
        }
        catch(e){
            await ctx.prisma.webOTP.delete({where:{
                id:dbEntry.id
            }})
            return e;
        }
    },});