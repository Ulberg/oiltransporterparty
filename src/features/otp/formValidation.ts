import * as z from 'zod';

export type newOTPFormType = z.infer<typeof newOTPFormSchema>;

export const newOTPFormSchema = z.object({phoneNumber: z.number().int().min(10000000).max(99999999)})