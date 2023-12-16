/*export default function Logo(props) {
  return (
    <svg
      width={400}
      height={100}
      viewBox="0 0 190 100"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M 603 1635 c -268 -273 -489 -499 -490 -503 c -2 -4 220 -230 492 -502 l 495 -495 l 235 235 l 235 235 l -75 75 l -75 75 l -160 -160 l -160 -160 l -350 350 l -350 350 l 350 350 l 350 350 l 130 -130 l 130 -130 l 75 75 l 75 75 l -202 202 c -112 112 -206 203 -210 203 c -3 0 -226 -223 -495 -495 Z"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        fillRule="evenodd"
        fontSize="9pt"
        stroke="#000"
        strokeWidth=".25mm"
        fill="#000"
      />
    </svg>
  );
}*/
import nextbaselogo from "../../../public/assets/nextbaselogo.jpg";
export default function Logo(props) {
  return (
    <img 
      src= {nextbaselogo.src}
      width="100"
      height="80"
      alt="Logo"
    />    
  );
}

