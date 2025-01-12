"use client";

import React from "react";
import { AppProgressBar } from "next-nprogress-bar";

export const Nprogress = () => {
  return <AppProgressBar color='#00b278' options={{ showSpinner: false }} />;
};
