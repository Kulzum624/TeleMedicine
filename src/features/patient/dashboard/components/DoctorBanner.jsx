import { memo } from 'react';
import doctorImg from '../../../../assets/doc1.png';

const DoctorBanner = () => {
    return (
        <section className="mb-10">
            <div className="relative flex flex-col items-center lg:flex-row w-full min-h-[15rem] gap-6 sm:gap-8 lg:gap-10 overflow-hidden rounded-2xl px-6 py-0
                            bg-[linear-gradient(135deg,_#E3F2FD_0%,_#E0F4FF_100%)] font-sans">
                
                <div className="md:w-1/6 flex justify-end items-end self-end relative mt-3">
                    <img
                        src={doctorImg}
                        alt="Family Doctor"
                        className="h-[250px] md:h-[300px] object-contain object-bottom"
                    />
                    
                    
                </div>

                
                <div className="flex-1">
                    <h1 className="text-xl md:text-2xl font-semibold leading-tight mb-2 text-[#1a1a1a]">
                        Stay Connected with Your Family Doctor
                    </h1>
                    <p className="text-base leading-5 text-gray-800 w-[80%]">
                        Easily connect with your family doctor, invite them to the app, and share daily health logs for personalized, up-to-date care.
                    </p>
                    <button className="mt-4 h-11 px-6 rounded-xl bg-[#c62828] hover:bg-[#b71c1c] text-white font-medium transition-all duration-300">
                        Invite Doctor
                    </button>
                </div>

                
                
                
            </div>
        </section>
    );
};

export default memo(DoctorBanner);

