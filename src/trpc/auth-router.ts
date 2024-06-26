import { AuthCredentialsValidator } from '../lib/validator/account-credentials-validator'
import { publicProcedure, router } from './trpc'
import { getPayloadClient } from '../get-payload'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const authRouter = router({
    createPayloadUser: publicProcedure.input(AuthCredentialsValidator)
        .mutation(async ({ input }) => {AuthCredentialsValidator
            const { email, password } = input

            const payload = await getPayloadClient()

            const { docs: users } = await payload.find({
                collection: 'users',
                limit: 1,
                where: {
                    email: {
                        equals: email
                    },
                },
            })

            if (users.length !== 0)
                throw new TRPCError({ code: 'CONFLICT' })

            await payload.create({
                collection: 'users',
                data: {
                    email,
                    password,
                    role: 'user'
                },
            });

            return { success: true, sentToEmail: email }
        }),

    verifyEmail: publicProcedure.input(z.object({ token: z.string() })).query(async ({ input }) => {
        const { token } = input

        const payload = await getPayloadClient()

        const isVerified = await payload.verifyEmail({
            collection: 'users', // Ensure collection name is consistent
            token,
        })

        if (!isVerified) throw new TRPCError({ code: 'UNAUTHORIZED' })

        return { success: true }
    }),

    signIn: publicProcedure.input(AuthCredentialsValidator).mutation(async ({input, ctx})=>{
        const {email, password} = input
        const { res } = ctx
        const payload = await getPayloadClient();
    
        try {
            const loginResponse = await payload.login({
                collection: 'users',
                data:{
                    email,
                    password
                },
            });
    
            const token = loginResponse.token;

            res.setHeader('Set-Cookie', `payload-token=${token}; Path=/; HttpOnly; Secure; SameSite=Lax`);
    
            return { success: true };
        } catch (err) {
            throw new TRPCError({code: "UNAUTHORIZED"});
        }
    })
    
})
