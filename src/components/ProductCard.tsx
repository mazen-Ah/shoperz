import React from "react";
import Image, { StaticImageData } from "next/image";
import watch from "../assets/products/watches.png";
type Props = {
  src: StaticImageData;
  alt: string;
  title: string;
  rate: number;
  price: number;
  name: string;
};

const ProductCard = ({ src, alt, title, name, rate }: Props) => {
  return (
    <div className="flex cursor-pointer group p-2 hover:scale-105 transition rounded-lg bg-white items-center w-full">
      <div className="p-4 ">
        <Image src={src} alt={alt} />
      </div>
      <div className="w-full">
        <h5 className="text-Primary-600 font-semibold text-sm py-2 items-center">
          {name}
        </h5>
        <div>5</div>
        <div className="flex items-center justify-between">
          <div>${600.0}</div>
          <button className="p-3 group-hover:bg-Primary-600 transition-all duration-100 bg-slate-200 rounded-full">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.66527 4.66634V4.66637H3.46914C3.12302 4.66637 2.83447 4.93125 2.80491 5.27611L2.06205 13.9428C2.02869 14.332 2.33563 14.6664 2.72629 14.6664H13.2738C13.6644 14.6664 13.9714 14.332 13.938 13.9428L13.1952 5.27611C13.1656 4.93125 12.877 4.66637 12.5309 4.66637H11.3319V4.66634C11.3319 2.82539 9.83955 1.33301 7.9986 1.33301C6.15765 1.33301 4.66527 2.82539 4.66527 4.66634ZM7.99808 2.66641C6.89352 2.66641 5.9981 3.56182 5.99808 4.66637H9.99808C9.99806 3.56182 9.10264 2.66641 7.99808 2.66641ZM7.99687 9.99958C9.81927 9.99958 11.3001 8.53712 11.3298 6.72179C11.3313 6.70351 11.332 6.68502 11.332 6.66636C11.332 6.29817 11.0335 5.99969 10.6654 5.99969C10.2972 5.99969 9.9987 6.29816 9.99869 6.66634H9.99635C9.99634 7.7709 9.10091 8.66631 7.99635 8.66631C6.90982 8.66631 6.02565 7.79988 5.99707 6.72024C5.99849 6.70245 5.99922 6.68445 5.99922 6.66629C5.99922 6.2981 5.70074 5.99963 5.33255 5.99963C4.96436 5.99963 4.66588 6.2981 4.66588 6.66629V6.66634H4.66393V6.61469C4.66367 6.63184 4.66354 6.64903 4.66354 6.66624C4.66354 8.50719 6.15592 9.99958 7.99687 9.99958Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;