// "use client";
// import confetti from "canvas-confetti";
// import { useRef } from "react";
// import { getCentralCoordinates } from "./common";

// export default function useSmallConffeti() {
//   const normalConfetti = useRef<HTMLDivElement>(null);
//   const handleNormalConfetti = () => {
//     // 中心座標を取得
//     const { centerX, centerY } = getCentralCoordinates(normalConfetti);
//     confetti({
//       startVelocity: 30,
//       origin: {
//         x: centerX / window.innerWidth,
//         y: centerY / window.innerHeight,
//       },
//     });
//   };

//   return {
//     normalConfetti,
//     handleNormalConfetti,
//   };
// }
