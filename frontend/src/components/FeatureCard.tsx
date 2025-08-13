// import type { FeatureProps } from '../types/FeatureCard';

// const FeatureCard: React.FC<FeatureProps> = ({imageUrl, title, description,altText}) => {
//     return(
//         <>
//         <div>
//             <figure className="bg-gray-200 rounded-md m-4">
//                 <img src={imageUrl} alt={altText ?? title} />
//                 <figcaption>
//                     <h1 className="font-bold">{title}</h1>
//                     <p>{description}</p>
//                 </figcaption>
//             </figure>
//         </div>
//         </>
//     )
// }

// export default FeatureCard;
import React from "react";

export type FeatureProps = {
  imageUrl: string;
  title: string;
  description: string;
  altText?: string;
};

const FeatureCard: React.FC<FeatureProps> = ({
  imageUrl,
  title,
  description,
  altText,
}) => {
  return (
    <div className="bg-[#202040] border border-cyan-400 rounded-xl drop-shadow-[0_0_25px_rgba(0,255,255,0.2)] p-8 flex flex-col items-center transition hover:scale-105 hover:border-cyan-300 w-[300px]">
      <figure className="flex flex-col items-center">
        <img
          src={imageUrl}
          alt={altText ?? title}
          className="w-16 h-16 object-contain rounded-md mb-4 bg-transparent"
        />
        <figcaption className="text-center">
          <h1 className="text-white font-bold text-lg mb-2">{title}</h1>
          <p className="text-gray-200">{description}</p>
        </figcaption>
      </figure>
    </div>
  );
};

export default FeatureCard;
