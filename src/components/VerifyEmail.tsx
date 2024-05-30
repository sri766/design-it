"use client"

import { trpc } from "@/trpc/client"
import { Loader2, Loader2Icon, XCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "./ui/button"

interface verifyEmailProps {
    token: string
}

const VerifyEmail =({token}: verifyEmailProps) =>{

    const {data, isLoading, isError} = trpc.auth.verifyEmail.useQuery({
        token
    })

    if(isError){
      return <div className="flex flex-col items-center gap-2">
        <XCircle className="h-8 w-8 text-red-600" />
        <h3 className="font-semibold text-xl">
            There was a problem
        </h3>
        <p className="text-muted-foreground text-sm">
            This token is not valied or might be expired.
            Please Try Again.
        </p>
      </div>  
    }

    if(data?.success){
        return(
            <div className="flex h-full flex-col items-center justify-center">
                <div className="relative mb-4 h-60 w-60 text-muted-foreground">
                    <Image src='/hippo-email-sent.png' fill alt="email sent"/>
                </div>

                <h3 className="font-semibold text-2xl">
                    You&apos;re all set
                </h3>
                <p className="text-muted-foreground text-center text-lg">
                    Thank you for verifing your email.
                </p>
                <Link className={buttonVariants({
                    className: "mt-4 text-xl",
                })} href='/sign-in'>Sign In</Link>
            </div>
        )
    }

    if(isLoading){
        return(
            <div className="flex flex-col items-center gap-2">
                <Loader2Icon className="animate-spin h-16 w-16 text-zinc-300" />
                <h3 className="font-semibold text-xl">
                    Verifying...
                </h3>
                <p className="text-muted-foreground text-sm">
                    This won&apos;t take long. 
                </p>

            </div>
        )
    }
}

export default VerifyEmail