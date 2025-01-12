import Image from "next/image";
import authBg from "@/public/imgs/auth-bg.png";
import Link from "next/link";
import { auth } from "../../../auth";
import { redirect, RedirectType } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session && session.user) {
    redirect("/dashboard", RedirectType.replace);
  }

  return (
    <section className='grid lg:grid-cols-2 h-screen'>
      <div className='hidden lg:block relative overflow-clip'>
        <Image
          alt='Towering multi-level building'
          src={authBg}
          quality={100}
          className='object-cover w-full h-full'
        />
      </div>
      <div className='p-8 flex flex-col justify-between w-full'>
        <div className='flex-1 flex items-center justify-center w-full'>
          {children}
        </div>

        <div className='text-center max-w-xl mx-auto'>
          <p className='text-[#9C9AA5] [&_a]:text-gray-20 text-sm'>
            By using this service, you consent to the{" "}
            <Link href='#'>Terms of Use</Link> and{" "}
            <Link href='#'>Privacy Policy</Link>, and confirm that you have read
            and agree to them.
          </p>
        </div>
      </div>
    </section>
  );
}
