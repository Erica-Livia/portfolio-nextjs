
import Navbar from "@/components/Navbar";
import Herosection from "@/components/Herosection";
import Skillsgrid from "@/components/Skillsgrid";
import Projectsgrid from "@/components/Projectsgrid";
import Experiencegrid from "@/components/Experiencegrid";
import Footer from "@/components/Footer";
import Blogcard from "@/components/Blogcard";
import updatesData from "@/data/updates.json";

export default function Home() {
  return (
    <div className="">
      <main className="bg-gray text-white min-h-screen">
          <Navbar/>

          <div className="px-4 lg:px-32 w-full">
              {/* Hero Section */}
              <Herosection/>

              <div className="flex flex-col">
                  <div className="flex flex-col-reverse md:flex-row pb-28 border-b border-grey">
                      {/* About Me */}
                      <div className="w-full py-16 mx-auto flex flex-col justify-between">
                          <div className="flex flex-col md:flex-row items-center mb-8">
                              <h2 className="text-white text-4xl lg:text-48px md:text-6xl text-center">About Me</h2>
                          </div>
                          <h2 className="text-[18px] text-center md:text-start">
                              I’m a soon-to-be graduate of African Leadership University, where I’ve honed my expertise
                              in Software Engineering with a specialization in Full Stack Development as a Mastercard
                              Scholar. My academic journey has equipped me with robust technical skills and a
                              problem-solving mindset, but what excites me most is applying these tools to build
                              solutions that drive tangible change. Beyond coding, I’m passionate about leveraging
                              technology to bridge gaps—whether through scalable platforms, collaborative innovation, or
                              empowering the next generation of African tech leaders. As I transition into the industry,
                              I’m eager to contribute my skills to projects that merge creativity, functionality, and
                              impact, while continuously growing as an engineer and thought leader.
                          </h2>
                          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                              <button className="text-white text-24px border-b border-b-green pb-2 hover:text-green mt-4 md:mt-0">
                                  <a
                                      href="#contact">CONTACT
                                      ME</a>
                              </button>
                          </div>

                      </div>

                      {/*Blog Overview*/}
                      <div className="flex flex-col justify-center items-center pt-16 md:w-full">
                          <div className="flex md:flex-rows gap-64 mb-8">
                              <h2 className="text-white text-5xl lg:text-[48px] md:text-6xl text-start">News</h2>
                              <button className="text-white text-18px
                               border-b border-b-green pb-2 hover:text-green mt-4 md:mt-0"><a
                                  href="/blog">View More
                                </a>
                              </button>
                          </div>
                          <div className="w-[50%]">
                              {updatesData.slice(0, 1).map((update, index) => (
                                  <Blogcard key={index} {...update} />
                              ))}
                          </div>
                      </div>
                  </div>
              </div>
              {/* Skills Section */}
              <div className="py-16 mx-auto">
                  <h2 className="text-white text-4xl lg:text-48px md:text-6xl text-center">Skills</h2>
                  <div className="flex flex-col md:flex-row justify-between items-center mb-8">

                  </div>
                  <Skillsgrid/>
              </div>

              {/* Projects section   */}
              <div className="py-16 mx-auto">
                  <h2 className="text-white text-4xl lg:text-48px md:text-6xl text-center">Projects</h2>
                  <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                      <button className="text-white border-b border-b-green pb-2 hover:text-green mt-4 md:mt-0"><a
                          href="#contact">CONTACT
                          ME</a>
                      </button>
                  </div>
                  <Projectsgrid/>
              </div>

              {/* Experience */}
              <div className="py-16 pb-24 mx-auto border-t border-grey">
                  <h2 className="text-white text-4xl lg:text-48px md:text-6xl text-center">More</h2>
                  <div className="flex flex-col md:flex-row justify-between items-center mb-8">
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
