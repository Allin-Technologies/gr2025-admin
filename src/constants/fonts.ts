import localFont from "next/font/local";

export const helvetica = localFont({
  src: [
    {
      path: "../fonts/HelveticaNeue-Bold.woff2",
      weight: "bold",
      style: "normal",
    },
    {
      path: "../fonts/HelveticaNeue-Heavy.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/HelveticaNeue-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/HelveticaNeue-Roman.woff2",
      weight: "normal",
      style: "normal",
    },
    {
      path: "../fonts/HelveticaNeue-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/HelveticaNeue-UltraLight.woff2",
      weight: "100",
      style: "normal",
    },
  ],
});
