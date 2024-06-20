import img1 from "../assets/img1.png";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";

const ExtraSection = () => {
    return (
        <div>
             <div className="text-center mb-8 mt-10">
                <h1 className="text-3xl font-bold">Student News</h1>
                <div className="border-b-2 border-violet-600 w-16 mx-auto mt-2"></div>
            </div>
            <div className="container mx-auto px-4 mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

                <div className="card bordered flex flex-col bg-slate-300">
                    <img src={img1} alt="Conversation" className="object-cover h-64 sm:h-auto" />
                    <div className="card-body flex flex-col justify-between">
                        <div>
                            <h2 className="card-title">FASTWEB WORKS FOR YOU</h2>
                            <p>Four Easy Ways to Make Fastweb Work for You</p>
                        </div>
                        <div className="card-actions justify-end">
                            <span>SEPTEMBER 17, 2022</span>
                        </div>
                    </div>
                </div>

                <div className="card bordered flex flex-col bg-slate-300">
                    <img src={img2} alt="Person Jumping" className="object-cover h-64 sm:h-auto" />
                    <div className="card-body flex flex-col justify-between">
                        <div>
                            <h2 className="card-title">TOP TIPS</h2>
                            <p>Top Tips on How to Win Scholarships</p>
                        </div>
                        <div className="card-actions justify-end">
                            <span>MAY 22, 2023</span>
                        </div>
                    </div>
                </div>

                <div className="card bordered bg-violet-500 text-white flex flex-col">
                    <img src={img3} alt="Person Jumping" className="object-cover h-64 sm:h-auto" />
                    <div className="card-body flex flex-col justify-between">
                        <div>
                            <h2 className="card-title">Higher Education Access</h2>
                            <p>8 Scholarship Tips You Haven't Heard Before</p>
                        </div>
                        <div className="card-actions justify-end">
                            <span>DECEMBER 15, 2023</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        </div>
    );
};

export default ExtraSection;
