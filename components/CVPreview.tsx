"use client";

import { CVData } from "@/types/cv";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";

interface CVPreviewProps {
  data: CVData;
  template?: "classic" | "modern" | "minimal";
}

export default function CVPreview({ data, template = "classic" }: CVPreviewProps) {
  if (template === "modern") {
    return <ModernTemplate data={data} />;
  } else if (template === "minimal") {
    return <MinimalTemplate data={data} />;
  }
  return <ClassicTemplate data={data} />;
}

// Classic Template (existing design)
function ClassicTemplate({ data }: { data: CVData }) {
  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg print:shadow-none">
      <CardContent className="p-12 print:break-inside-avoid">
        {/* Header */}
        <div className="mb-8 pb-6 border-b-2 border-gray-300">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            {data.personalInfo.fullName}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              {data.personalInfo.email}
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              {data.personalInfo.phone}
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              {data.personalInfo.location}
            </div>
          </div>
          {(data.personalInfo.linkedin || data.personalInfo.github || data.personalInfo.portfolio) && (
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
              {data.personalInfo.linkedin && (
                <div className="flex items-center">
                  <Linkedin className="w-4 h-4 mr-2" />
                  {data.personalInfo.linkedin}
                </div>
              )}
              {data.personalInfo.github && (
                <div className="flex items-center">
                  <Github className="w-4 h-4 mr-2" />
                  {data.personalInfo.github}
                </div>
              )}
              {data.personalInfo.portfolio && (
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  {data.personalInfo.portfolio}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Summary */}
        {data.summary && (
          <div className="mb-6 print:break-inside-avoid">
            <h2 className="text-xl font-bold mb-3 text-gray-900 uppercase tracking-wide border-b-2 border-gray-300 pb-2">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <div className="mb-6 print:break-inside-avoid">
            <h2 className="text-xl font-bold mb-3 text-gray-900 uppercase tracking-wide border-b-2 border-gray-300 pb-2">
              Professional Experience
            </h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-5 print:break-inside-avoid">
                <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                <p className="text-md font-semibold text-gray-700">{exp.company}</p>
                <p className="text-sm text-gray-600 mb-2">
                  {exp.startDate} - {exp.current ? "Present" : exp.endDate} | {exp.location}
                </p>
                <ul className="list-disc ml-5 space-y-1">
                  {exp.description.map((desc, idx) => (
                    <li key={idx} className="text-sm text-gray-700">
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 text-gray-900 uppercase tracking-wide border-b-2 border-gray-300 pb-2">
              Education
            </h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  {edu.degree} in {edu.field}
                </h3>
                <p className="text-md text-gray-700">{edu.institution}</p>
                <p className="text-sm text-gray-600">
                  {edu.startDate} - {edu.endDate} | {edu.location}
                  {edu.gpa && ` | GPA: ${edu.gpa}`}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 text-gray-900 uppercase tracking-wide border-b-2 border-gray-300 pb-2">
              Skills
            </h2>
            {data.skills.map((skill) => (
              <div key={skill.id} className="mb-3">
                <p className="text-sm">
                  <span className="font-semibold text-gray-900">{skill.category}:</span>{" "}
                  <span className="text-gray-700">{skill.items.join(", ")}</span>
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 text-gray-900 uppercase tracking-wide border-b-2 border-gray-300 pb-2">
              Projects
            </h2>
            {data.projects.map((project) => (
              <div key={project.id} className="mb-4">
                <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                <p className="text-sm text-gray-700 mb-1">{project.description}</p>
                <p className="text-xs text-gray-600 italic">
                  Technologies: {project.technologies.join(", ")}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Certificates */}
        {data.certificates && data.certificates.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 text-gray-900 uppercase tracking-wide border-b-2 border-gray-300 pb-2">
              Certifications
            </h2>
            {data.certificates.map((cert) => (
              <div key={cert.id} className="mb-3">
                <h3 className="text-md font-bold text-gray-900">{cert.name}</h3>
                <p className="text-sm text-gray-700">
                  {cert.issuer} | {cert.date}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Modern Template (two-column with accent color)
function ModernTemplate({ data }: { data: CVData }) {
  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg print:shadow-none overflow-hidden">
      <div className="grid grid-cols-3">
        {/* Sidebar */}
        <div className="col-span-1 bg-gradient-to-b from-purple-600 to-blue-600 text-white p-8">
          <h1 className="text-2xl font-bold mb-2 break-words">{data.personalInfo.fullName}</h1>

          <div className="mt-6 space-y-4">
            <div>
              <h3 className="text-sm font-bold uppercase mb-2 opacity-90">Contact</h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-start">
                  <Mail className="w-3 h-3 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="break-all">{data.personalInfo.email}</span>
                </div>
                <div className="flex items-start">
                  <Phone className="w-3 h-3 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{data.personalInfo.phone}</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-3 h-3 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{data.personalInfo.location}</span>
                </div>
              </div>
            </div>

            {/* Skills in Sidebar */}
            {data.skills && data.skills.length > 0 && (
              <div>
                <h3 className="text-sm font-bold uppercase mb-2 opacity-90">Skills</h3>
                {data.skills.map((skill) => (
                  <div key={skill.id} className="mb-3">
                    <p className="text-xs font-semibold mb-1">{skill.category}</p>
                    <div className="flex flex-wrap gap-1">
                      {skill.items.map((item, idx) => (
                        <span key={idx} className="text-xs bg-white/20 px-2 py-0.5 rounded">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <CardContent className="col-span-2 p-8">
          {/* Summary */}
          {data.summary && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-2 text-gray-900 border-b-2 border-purple-600 pb-1 inline-block">
                Profile
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed mt-2">{data.summary}</p>
            </div>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 text-gray-900 border-b-2 border-purple-600 pb-1 inline-block">
                Experience
              </h2>
              {data.experience.map((exp) => (
                <div key={exp.id} className="mb-4 mt-3">
                  <h3 className="text-md font-bold text-gray-900">{exp.position}</h3>
                  <p className="text-sm font-semibold text-purple-600">{exp.company}</p>
                  <p className="text-xs text-gray-600 mb-2">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate} | {exp.location}
                  </p>
                  <ul className="list-disc ml-5 space-y-1">
                    {exp.description.map((desc, idx) => (
                      <li key={idx} className="text-xs text-gray-700">
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 text-gray-900 border-b-2 border-purple-600 pb-1 inline-block">
                Education
              </h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-3 mt-3">
                  <h3 className="text-md font-bold text-gray-900">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="text-sm text-gray-700">{edu.institution}</p>
                  <p className="text-xs text-gray-600">
                    {edu.startDate} - {edu.endDate} | {edu.location}
                    {edu.gpa && ` | GPA: ${edu.gpa}`}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 text-gray-900 border-b-2 border-purple-600 pb-1 inline-block">
                Projects
              </h2>
              {data.projects.map((project) => (
                <div key={project.id} className="mb-4 mt-3">
                  <h3 className="text-md font-bold text-gray-900">{project.name}</h3>
                  <p className="text-xs text-gray-700 mb-1">{project.description}</p>
                  <p className="text-xs text-gray-600 italic">
                    Technologies: {project.technologies.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Certificates */}
          {data.certificates && data.certificates.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 text-gray-900 border-b-2 border-purple-600 pb-1 inline-block">
                Certifications
              </h2>
              {data.certificates.map((cert) => (
                <div key={cert.id} className="mb-3 mt-3">
                  <h3 className="text-sm font-bold text-gray-900">{cert.name}</h3>
                  <p className="text-xs text-gray-700">
                    {cert.issuer} | {cert.date}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
}

// Minimal Template (clean and simple)
function MinimalTemplate({ data }: { data: CVData }) {
  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg print:shadow-none">
      <CardContent className="p-12">
        {/* Header - Centered */}
        <div className="text-center mb-8 pb-6 border-b border-gray-200">
          <h1 className="text-3xl font-light mb-3 text-gray-900 tracking-wide">
            {data.personalInfo.fullName}
          </h1>
          <div className="flex justify-center flex-wrap gap-3 text-xs text-gray-600">
            <span>{data.personalInfo.email}</span>
            <span>•</span>
            <span>{data.personalInfo.phone}</span>
            <span>•</span>
            <span>{data.personalInfo.location}</span>
          </div>
        </div>

        {/* Summary */}
        {data.summary && (
          <div className="mb-8">
            <p className="text-sm text-gray-700 leading-relaxed text-center italic">
              {data.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold mb-4 text-gray-900 uppercase tracking-widest">
              Experience
            </h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-5">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-md font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-sm text-gray-600">{exp.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </p>
                    <p className="text-xs text-gray-500">{exp.location}</p>
                  </div>
                </div>
                <ul className="space-y-1 mt-2">
                  {exp.description.map((desc, idx) => (
                    <li key={idx} className="text-sm text-gray-700 pl-4 relative before:content-['—'] before:absolute before:left-0">
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold mb-4 text-gray-900 uppercase tracking-widest">
              Education
            </h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-3 flex justify-between items-start">
                <div>
                  <h3 className="text-md font-semibold text-gray-900">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="text-sm text-gray-600">{edu.institution}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">
                    {edu.startDate} - {edu.endDate}
                  </p>
                  {edu.gpa && <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold mb-4 text-gray-900 uppercase tracking-widest">
              Skills
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {data.skills.map((skill) => (
                <div key={skill.id}>
                  <p className="text-sm font-semibold text-gray-900 mb-1">{skill.category}</p>
                  <p className="text-xs text-gray-700">{skill.items.join(" • ")}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold mb-4 text-gray-900 uppercase tracking-widest">
              Projects
            </h2>
            {data.projects.map((project) => (
              <div key={project.id} className="mb-4">
                <h3 className="text-md font-semibold text-gray-900">{project.name}</h3>
                <p className="text-sm text-gray-700 mb-1">{project.description}</p>
                <p className="text-xs text-gray-500">
                  {project.technologies.join(" • ")}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Certificates */}
        {data.certificates && data.certificates.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold mb-4 text-gray-900 uppercase tracking-widest">
              Certifications
            </h2>
            {data.certificates.map((cert) => (
              <div key={cert.id} className="mb-3">
                <h3 className="text-sm font-semibold text-gray-900">{cert.name}</h3>
                <p className="text-xs text-gray-700">
                  {cert.issuer} | {cert.date}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
