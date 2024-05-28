import { Icons } from "@/components/Icons"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const Page = () =>{
    return (
        <>
            <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
                <div className="mx-auto flex lg:w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col items-center space-y-2 text-center">
                        <Icons.logo className="h-20 w-20" />
                        <h1 className="text-xl font-bold">  
                            Create an Account
                        </h1>
                        <Link className={buttonVariants({
                            variant: "link",
                            className: "gap-1.5"
                        })} href="/sign-in">Already have an account? Sign-In
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <div className="grid gap-6">
                        <form>
                            <div className="grid gap-2">
                                <div className="grid gap-1 py-2">
                                    <Label htmlFor="email">Email:</Label>
                                    <Input type="email" id="email" placeholder="Email Address" />
                                </div>
                            </div>
                        </form>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default Page