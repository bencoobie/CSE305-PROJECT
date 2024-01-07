import { NavigationMenuDemo } from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import image from "../../public/howtouse.jpeg";

export default function About() {
  return (
    <div>
      <NavigationMenuDemo></NavigationMenuDemo>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2 mt-[-150px]">
                <h1 className="text-4xl font-bold tracking-tighter text-gray-900 dark:text-gray-100 sm:text-5xl xl:text-6xl text-center">
                  USER MANUAL
                </h1>
              </div>

              <div className="w-[1000px]">
                <div className="flex flex-col space-y-2 mt-[30px]">
                  <div className="bg-white dark:bg-gray-700 shadow rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Goal of the Project
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 font-bold ">
                      Our project is to capture the news of traffic accidents in
                      Aydın province and have it interpreted by ChatGPT via
                      LangChain.
                    </p>
                    <ul className="list-disc list-inside mt-4 text-gray-600 dark:text-gray-400">
                      <li>
                        Determining the locations of traffic accidents in Aydın
                        by examining the captured data.
                      </li>
                      <li>
                        Determining the dates on which accidents occur most
                        frequently by examining the dates of the captured data.
                      </li>
                      <li>Display of accident dates in graphics.</li>
                      <li>Filtering accident data by location.</li>
                      <li>
                        Minimization of accidents in Aydın province through the
                        data provided above.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="w-[1000px]">
                <div className="flex flex-col space-y-2 mt-[30px]">
                  <div className="bg-white dark:bg-gray-700 shadow rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Working of the Project
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 font-bold ">
                      Below is how the project works step by step:
                    </p>
                    <ul className="list-disc list-inside mt-4 text-gray-600 dark:text-gray-400">
                      <li>
                        Firstly, accident news is accessed via Google Search
                        API.
                      </li>
                      <li>
                        All data on the news site is transferred to ChatGPT via
                        LangChain.
                      </li>
                      <li>
                        Data is interpreted by ChatGPT via OpenAI API key.
                      </li>
                      <li>
                        Interpreted data is filtered according to certain
                        characteristics.
                      </li>
                      <li>
                        Filtered data is saved to the Database at regular
                        intervals (via an agent).
                      </li>
                      <li>
                        The recorded data is shown on our website and the
                        location of the accident on the map is shown with the
                        "go to location" button on our website.
                      </li>
                      <li>
                        At the same time, the graph of accidents according to
                        dates is shown with the "View Accident Graph" button.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="w-[1000px]">
                <div className="flex flex-col space-y-2 mt-[30px]">
                  <div className="bg-white dark:bg-gray-700 shadow rounded-lg p-6">
                    <Image src={image}></Image>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
