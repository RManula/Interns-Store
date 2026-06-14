import type { Metadata } from "next";
import { PostInternshipForm } from "@/components/employers/PostInternshipForm";

export const metadata: Metadata = { title: "Post an Internship" };

export default function PostPage() {
  return (
    <>
      <section className="mesh-dark pb-20 pt-36 text-white"><div className="container-shell"><span className="eyebrow !text-blue-100">For employers</span><h1 className="display-title mt-5 max-w-4xl">Create an internship students understand.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">Share the role, learning outcomes and support you will provide. We will help you publish it clearly.</p></div></section>
      <section className="section-pad mesh-light"><div className="container-shell mx-auto max-w-3xl"><PostInternshipForm /></div></section>
    </>
  );
}
