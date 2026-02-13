import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";
import BlogClient from "./BlogClient";

export const metadata = {
    title: "Blog | Lorenz Tazan",
    description: "Insights on infrastructure automation, DevOps, and AI.",
};

export default function BlogPage() {
    return (
        <>
            <Header />
            <AnimatedBackground />
            <BlogClient />
        </>
    );
}
