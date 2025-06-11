
import Navbar from "@/components/Navbar";
import Herosection from "@/components/Herosection";
import Skillsgrid from "@/components/Skillsgrid";
import Projectsgrid from "@/components/Projectsgrid";
import Experiencegrid from "@/components/Experiencegrid";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="">
      <main className="bg-black text-white min-h-screen">
          <Navbar/>
            {/* Hero Section */}
          <div className="px-4 lg:px-32 w-full">

              <Herosection/>

              {/* Skills Section */}
              <div className="py-16 mx-auto">
                  <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                      <h2 className="text-white text-4xl lg:text-48px md:text-6xl text-center">Skills</h2>
                  </div>
                  <Skillsgrid/>
              </div>


              {/* Projects section   */}
              <div className="py-16 mx-auto">
                  <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                      <h2 className="text-white text-4xl lg:text-48px md:text-6xl text-center">Projects</h2>
                      <button className="text-white border-b border-b-green pb-2 hover:text-green mt-4 md:mt-0"><a
                          href="#contact">CONTACT
                          ME</a>
                      </button>
                  </div>
                  <Projectsgrid/>
              </div>


              {/* Experience */}
              <div className="py-16 pb-24 mx-auto border-t border-grey">
                  <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                      <h2 className="text-white text-4xl lg:text-88px md:text-6xl">More</h2>
                  </div>
                  <div className="flex justify-center mb-8">
                      <Experiencegrid/>
                  </div>
              </div>
          </div>

          <Footer/>
      </main>

    </div>
  );
}
