import { AlignLeftIcon, ArrowBigLeft, ArrowLeftCircleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const VerifySignup = () => {
  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <div className="flex items-center gap-x-4 mb-10">
          <ArrowLeftCircleIcon />
          <p>
            <Link href="/">Back to Main Page</Link>
          </p>
        </div>

        <p className="text-base font-semibold leading-7 text-indigo-600">
          We&apos;re all good to go!
        </p>
        <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Sign-in Success!
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          We&lsquo;ve sent an email to your email address. Please follow the
          instructions and we&apos;ll get you set up
        </p>
      </div>
    </div>
  );
};

export default VerifySignup;
