"use client";

import dynamic from "next/dynamic";

const Inner = dynamic(() => import("./SignalsExperience"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-space" />,
});

export default function Experience() {
  return <Inner />;
}
