'use client'
import { cn } from "@/utils/cn";
import { BackgroundGradientAnimation } from "./GradientBg";
import {GlobeDemo} from "./GridGlobe";
import Lottie from "react-lottie";
import { useState } from "react";
import animationData from "@/data/confetti.json";
import MagicButton from "../MagicButton";
import { IoCopyOutline } from "react-icons/io5";
import { personalInfo, skills } from "@/data";
import Image from "next/image";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
  id,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  id?: number;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
  };

  
  return (
    <div
      className={cn(
        "row-span-1 relative overflow-hidden rounded-3xl glass-card group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4",
        className
      )}
    >
      <div className={`${id===6 && 'flex justify-center'} h-full`}>
        <div className="w-full h-full absolute">
          {img && (
            <Image
              src={img}
              alt={img}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={cn(imgClassName, "object-cover object-center")}
            />
          )}
          
        </div>
        <div className={`absolute right-0 -bottom-5 ${id===5 && 'w-full opacity-80'} relative`}>
          {spareImg && (
            <Image
              src={spareImg}
              alt={spareImg}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={'object-cover object-center'}
            />
          )}
        </div>
        { id===6 && (
          <BackgroundGradientAnimation>
            {/* <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl"></div> */}
          </BackgroundGradientAnimation>
        )}
        <div className={cn(
          titleClassName, "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10"
        )}>
          <div className="font-sans font-extralight md:max-w-32 md:text-xs lg:text-base text-sm text-[#C1C2D3] z-10">
            {description}
          </div>
          <div className={`font-sans text-lg lg:text-3xl max-w-96 font-bold z-10`}>
            {title}
          </div>
        
        {id===2 && <GlobeDemo/>}
        {id===3 &&(
          <div className="flex gap-1.5 md:gap-3 lg:gap-5 w-fit relative mt-4 md:mt-0 md:absolute md:right-0 lg:-right-2 overflow-hidden max-w-full">
            <div className="flex flex-col gap-2 md:gap-3 lg:gap-6">
              {skills.languagesFrameworks.slice(0, 4).map((item)=>(
                <span key={item} className="py-1.5 lg:py-2 px-2.5 text-xs lg:text-base opacity-70 lg:opacity-100 rounded-lg text-center bg-[#10132E] border border-white/[0.08]">
                  {item}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-2 md:gap-3 lg:gap-6 pt-3 md:pt-0">
              {skills.languagesFrameworks.slice(4, 8).map((item)=>(
                <span key={item} className="py-1.5 lg:py-2 px-2.5 text-xs lg:text-base opacity-70 lg:opacity-100 rounded-lg text-center bg-[#10132E] border border-white/[0.08]">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
        {id===6 && (
          <div className="mt-5 relative">
            <div className={`absolute -bottom-5 right-0`}
            >
              <Lottie options={{
                loop: copied,
                autoplay:copied,
                animationData,
                rendererSettings:{
                  preserveAspectRatio: 'xMidYMid slice'
                }
              }}/>
            </div>
            <MagicButton
              title={copied ? 'Email is Copied' : 'Copy My Email'}
              icon={<IoCopyOutline/>}
              position="left"
              otherClasses="!bg-[#161a31]"
              handleClick={handleCopy}
            />
          </div>
        )}
      </div>
    </div>
    </div>
  );
};
