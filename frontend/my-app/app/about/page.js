import { NavigationMenuDemo } from "@/components/Navbar";
import Link from "next/link";

export default function About() {
  return (
    <div>
      <NavigationMenuDemo></NavigationMenuDemo>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter text-gray-900 dark:text-gray-100 sm:text-5xl xl:text-6xl">
                  Welcome to Our Innovative Platform
                </h1>
                <p className="max-w-[600px] text-gray-600 dark:text-gray-400 md:text-xl">
                  Experience the best of technology and innovation with our
                  top-notch services. Join us today and be a part of the future.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <div className="flex flex-col space-y-2">
                  <div className="bg-white dark:bg-gray-700 shadow rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Why Join Us?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      We offer a platform that integrates the latest
                      technologies to provide you with the best experience.
                      Here's what you get when you join us:
                    </p>
                    <ul className="list-disc list-inside mt-4 text-gray-600 dark:text-gray-400">
                      <li>Access to cutting-edge technologies</li>
                      <li>Collaboration with experts in the field</li>
                      <li>Opportunities for growth and learning</li>
                    </ul>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Learn more about our
                    <Link className="underline underline-offset-2" href="#">
                      Terms & Conditions
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
