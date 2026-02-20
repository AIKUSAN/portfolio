"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, ArrowRight, Calendar, Tag } from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    image_url: string;
    tags: string[];
    published_at: string;
}

export default function BlogClient() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const { data, error } = await supabase
                    .from('blog_posts')
                    .select('id, slug, title, excerpt, image_url, tags, published_at')
                    .eq('published', true)
                    .order('published_at', { ascending: false });

                if (error) throw error;
                setPosts(data || []);
            } catch (_error) {
                console.error('Error fetching posts:', _error);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-bold dark:text-white text-gray-900 mb-6">
                        Consultant <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Blog</span>
                    </h1>
                    <p className="text-xl dark:text-gray-400 text-gray-600 max-w-3xl">
                        Insights on infrastructure automation, DevOps workflows, and the future of AI-driven systems engineering.
                    </p>
                </motion.div>

                {posts.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800"
                    >
                        <p className="text-gray-400">Automated insights coming soon. Stay tuned!</p>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {posts.map((post) => (
                            <motion.article
                                key={post.id}
                                variants={itemVariants}
                                className="group relative bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all"
                            >
                                <div className="aspect-video relative overflow-hidden">
                                    {post.image_url ? (
                                        <Image
                                            src={post.image_url}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                                            <span className="text-slate-600 text-4xl">📝</span>
                                        </div>
                                    )}
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center gap-4 mb-4 text-xs text-slate-500">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(post.published_at).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Tag className="w-3 h-3" />
                                            {post.tags?.[0] || 'Uncategorized'}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-3 group-hover:text-blue-400 transition-colors">
                                        {post.title}
                                    </h3>

                                    <p className="text-slate-400 text-sm mb-6 line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    <button className="flex items-center gap-2 text-blue-400 font-medium text-sm hover:gap-3 transition-all">
                                        Read Post <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
