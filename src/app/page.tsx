import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReels";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";
import Link from "next/link";

export default function Home() {

  const perks = [
    {
      name: 'Instant Delivery',
      icon: ArrowDownToLine,
      description: 'Get your assets instantly delivered at your email.'
    },
    {
      name: 'Guaranteed Quality',
      icon: CheckCircle, 
      description: 'Every product on our platform is verified by our team to ensure the quality standard.Not Satessfied? We offer 30-days refund guarantee.'
    },
    {
      name: 'For the Planet',
      icon: Leaf, 
      description: "We're committed 1% of sales to plant trees and restoration of environment."
    }
  ]
  return (
    <>
    <MaxWidthWrapper>
      <div className='py-20 mx-auto text-center flex flex-col max-w-xl'>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Your Marketplace for High Quality{" "}
        <span className="text-blue-600">Digital Assets</span>
        </h1>
        <p className="mt-6 text-lg max-w-prose text-muted-foreground">
          Welcome to <span className="text-2xl text-bold otext-slate-900">DesignIT</span>. Every Assets you need to create your project were here. We provide high quality digital assets for your projects.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6 flex-wrap justify-center">
          <Link href='/products' className={buttonVariants()}>Browse Trending</Link>
          <Button variant='ghost'>Our Quality Promise &rarr;</Button>
        </div>
      </div>
      <ProductReel query={{
        sort: 'desc',limit: 4
      }} href="/products" title="Brand new" />
    </MaxWidthWrapper>
    <section className="border-t border-gray-200 bg-gray 50">
      <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0 ">
            {perks.map((perk)=>(
              <div key={perk.name} className="text-center md:flex md:item-start md:text-left lg:block lg:text-center">
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                    {perk.icon && <perk.icon className="w-1/3 h-1/3" />}
                  </div>
                </div>
                <div className="mt-16 md:ml-4 md:mt-0 lg:mt-6 lg:ml-0">
                  <h3 className="text-base font-medium text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
      </MaxWidthWrapper>
    </section>
    </>
  );
}
