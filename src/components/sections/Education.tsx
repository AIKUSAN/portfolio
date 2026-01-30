"use client";

import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';

const education = [
  {
    degree: "Master of Science in Computer Science",
    school: "Stanford University",
    location: "Stanford, CA",
    period: "2019 - 2021",
    description: "Specialized in Distributed Systems and Network Security. Thesis on Zero-Trust Architecture Implementation.",
    gpa: "3.9/4.0"
  },
  {
    degree: "Bachelor of Science in Network Engineering",
    school: "University of California, Berkeley",
    location: "Berkeley, CA",
    period: "2015 - 2019",
    description: "Focus on Computer Networks, Operating Systems, and Cybersecurity. Dean's List all semesters.",
    gpa: "3.8/4.0"
  }
];

export default function Education() {
  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Education</h2>
          <p className="text-gray-400 text-lg">Academic foundation and qualifications.</p>
        </motion.div>

        <div className="space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="flex items-start gap-4 mb-4 md:mb-0">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">{edu.degree}</h3>
                      <p className="text-blue-400 font-medium text-lg">{edu.school}</p>
                      <p className="text-gray-400 text-sm">{edu.location}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span className="font-mono text-sm">{edu.period}</span>
                    </div>
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-semibold">
                      GPA: {edu.gpa}
                    </span>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">{edu.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
