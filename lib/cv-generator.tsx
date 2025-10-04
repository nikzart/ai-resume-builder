import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import { CVData } from "@/types/cv";

// Helper function to truncate URLs
const truncateUrl = (url: string, maxLength: number = 30): string => {
  const clean = url.replace('https://', '').replace('http://', '').replace('www.', '');
  return clean.length > maxLength ? clean.substring(0, maxLength) + '...' : clean;
};

// Classic Template Styles
const classicStyles = StyleSheet.create({
  page: {
    padding: 35,
    fontSize: 9,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    paddingBottom: 12,
    borderBottom: "1.5 solid #d1d5db",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000000",
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 4,
  },
  contactItem: {
    fontSize: 9,
    color: "#4b5563",
    marginRight: 12,
  },
  linkText: {
    color: "#6366f1",
    textDecoration: "none",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 8,
    paddingBottom: 4,
    borderBottom: "1 solid #d1d5db",
    color: "#000000",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  summary: {
    fontSize: 9,
    color: "#374151",
    lineHeight: 1.4,
  },
  jobTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 2,
    color: "#000000",
  },
  company: {
    fontSize: 9,
    fontWeight: "bold",
    marginBottom: 2,
    color: "#4b5563",
  },
  dateLocation: {
    fontSize: 8,
    color: "#6b7280",
    marginBottom: 6,
  },
  bulletContainer: {
    flexDirection: "row",
    marginBottom: 3,
    alignItems: "flex-start",
  },
  bulletPoint: {
    width: 12,
    fontSize: 8,
    color: "#374151",
    paddingTop: 1,
  },
  bulletText: {
    flex: 1,
    fontSize: 8,
    color: "#374151",
    lineHeight: 1.4,
  },
  subsection: {
    marginBottom: 12,
  },
});

// Modern Template Styles
const modernStyles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    fontSize: 9,
    fontFamily: "Helvetica",
  },
  sidebar: {
    width: '32%',
    backgroundColor: '#7c3aed',
    padding: 25,
    paddingTop: 35,
  },
  mainContent: {
    width: '68%',
    padding: 35,
    paddingTop: 35,
  },
  sidebarName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
    lineHeight: 1.2,
  },
  sidebarSection: {
    marginBottom: 18,
  },
  sidebarTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'uppercase',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  sidebarText: {
    fontSize: 8,
    marginBottom: 5,
    lineHeight: 1.4,
    color: '#ffffff',
  },
  sidebarLink: {
    fontSize: 7,
    marginBottom: 4,
    lineHeight: 1.3,
    color: '#e0e7ff',
    textDecoration: 'none',
  },
  skillCategory: {
    fontSize: 8,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#ffffff',
  },
  skillTag: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    padding: '3 6',
    marginRight: 4,
    marginBottom: 4,
    borderRadius: 2,
    fontSize: 7,
    color: '#ffffff',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  mainSectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingBottom: 4,
    borderBottom: '1.5 solid #7c3aed',
    color: '#000000',
  },
  mainSection: {
    marginBottom: 15,
  },
  jobTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#000000',
  },
  company: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#7c3aed',
  },
  dateLocation: {
    fontSize: 7,
    color: '#6b7280',
    marginBottom: 6,
  },
  bulletContainer: {
    flexDirection: 'row',
    marginBottom: 3,
    alignItems: 'flex-start',
  },
  bulletPoint: {
    width: 10,
    fontSize: 7,
    color: '#374151',
    paddingTop: 1,
  },
  bulletText: {
    flex: 1,
    fontSize: 7,
    color: '#374151',
    lineHeight: 1.4,
  },
  subsection: {
    marginBottom: 12,
  },
});

// Minimal Template Styles
const minimalStyles = StyleSheet.create({
  page: {
    padding: 35,
    paddingTop: 50,
    fontSize: 9,
    fontFamily: "Helvetica",
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
    paddingBottom: 20,
    borderBottom: '1 solid #e5e7eb',
  },
  name: {
    fontSize: 20,
    fontWeight: 'normal',
    marginBottom: 10,
    color: '#000000',
    letterSpacing: 1.5,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  contactItem: {
    fontSize: 8,
    color: '#6b7280',
    marginHorizontal: 6,
  },
  separator: {
    fontSize: 8,
    color: '#d1d5db',
  },
  summary: {
    fontSize: 9,
    color: '#4b5563',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 25,
    lineHeight: 1.5,
    paddingHorizontal: 30,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  section: {
    marginBottom: 20,
  },
  experienceRow: {
    marginBottom: 15,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    alignItems: 'flex-start',
  },
  experienceLeft: {
    maxWidth: '65%',
  },
  experienceRight: {
    maxWidth: '35%',
  },
  jobTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 2,
  },
  company: {
    fontSize: 9,
    color: '#4b5563',
    marginBottom: 2,
  },
  dateLocationRight: {
    fontSize: 7,
    color: '#6b7280',
    textAlign: 'right',
  },
  bulletContainer: {
    flexDirection: 'row',
    marginBottom: 2,
    marginTop: 2,
    alignItems: 'flex-start',
  },
  bulletPoint: {
    width: 12,
    fontSize: 8,
    color: '#6b7280',
    paddingTop: 1,
  },
  bulletText: {
    flex: 1,
    fontSize: 8,
    color: '#374151',
    lineHeight: 1.4,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  skillItem: {
    width: '48%',
    marginBottom: 8,
  },
  skillCategory: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 3,
  },
  skillList: {
    fontSize: 8,
    color: '#374151',
    lineHeight: 1.3,
  },
});

interface CVDocumentProps {
  data: CVData;
  template?: "classic" | "modern" | "minimal";
}

export const CVDocument: React.FC<CVDocumentProps> = ({ data, template = "classic" }) => {
  if (template === "modern") {
    return <ModernPDFDocument data={data} />;
  } else if (template === "minimal") {
    return <MinimalPDFDocument data={data} />;
  }
  return <ClassicPDFDocument data={data} />;
};

// Classic PDF Template
const ClassicPDFDocument: React.FC<{ data: CVData }> = ({ data }) => (
  <Document>
    <Page size="A4" style={classicStyles.page} wrap>
      {/* Header */}
      <View style={classicStyles.header} wrap={false}>
        <Text style={classicStyles.name}>{data.personalInfo.fullName}</Text>

        <View style={classicStyles.contactRow}>
          <Text style={classicStyles.contactItem}>{data.personalInfo.email}</Text>
          <Text style={classicStyles.contactItem}>{data.personalInfo.phone}</Text>
          <Text style={classicStyles.contactItem}>{data.personalInfo.location}</Text>
        </View>

        {(data.personalInfo.linkedin || data.personalInfo.github || data.personalInfo.portfolio) && (
          <View style={classicStyles.contactRow}>
            {data.personalInfo.linkedin && (
              <Link src={data.personalInfo.linkedin} style={[classicStyles.contactItem, classicStyles.linkText]}>
                <Text>{truncateUrl(data.personalInfo.linkedin, 35)}</Text>
              </Link>
            )}
            {data.personalInfo.github && (
              <Link src={data.personalInfo.github} style={[classicStyles.contactItem, classicStyles.linkText]}>
                <Text>{truncateUrl(data.personalInfo.github, 35)}</Text>
              </Link>
            )}
            {data.personalInfo.portfolio && (
              <Link src={data.personalInfo.portfolio} style={[classicStyles.contactItem, classicStyles.linkText]}>
                <Text>{truncateUrl(data.personalInfo.portfolio, 35)}</Text>
              </Link>
            )}
          </View>
        )}
      </View>

      {/* Summary */}
      {data.summary && (
        <View style={classicStyles.section}>
          <Text style={classicStyles.sectionTitle} wrap={false}>Professional Summary</Text>
          <Text style={classicStyles.summary}>{data.summary}</Text>
        </View>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <View style={classicStyles.section}>
          <Text style={classicStyles.sectionTitle} wrap={false}>Professional Experience</Text>
          {data.experience.map((exp) => (
            <View key={exp.id} style={classicStyles.subsection} wrap={false}>
              <Text style={classicStyles.jobTitle}>{exp.position}</Text>
              <Text style={classicStyles.company}>{exp.company}</Text>
              <Text style={classicStyles.dateLocation}>
                {exp.startDate} - {exp.current ? "Present" : exp.endDate} | {exp.location}
              </Text>
              {exp.description.map((desc, idx) => (
                <View key={idx} style={classicStyles.bulletContainer}>
                  <Text style={classicStyles.bulletPoint}>•</Text>
                  <Text style={classicStyles.bulletText}>{desc}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <View style={classicStyles.section}>
          <Text style={classicStyles.sectionTitle} wrap={false}>Education</Text>
          {data.education.map((edu) => (
            <View key={edu.id} style={classicStyles.subsection} wrap={false}>
              <Text style={classicStyles.jobTitle}>
                {edu.degree} in {edu.field}
              </Text>
              <Text style={classicStyles.company}>{edu.institution}</Text>
              <Text style={classicStyles.dateLocation}>
                {edu.startDate} - {edu.endDate} | {edu.location}
                {edu.gpa && ` | GPA: ${edu.gpa}`}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <View style={classicStyles.section}>
          <Text style={classicStyles.sectionTitle} wrap={false}>Skills</Text>
          {data.skills.map((skill) => (
            <View key={skill.id} style={{ marginBottom: 6 }} wrap={false}>
              <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#000000', marginBottom: 2 }}>
                {skill.category}:
              </Text>
              <Text style={{ fontSize: 8, color: '#374151', lineHeight: 1.3 }}>
                {skill.items.join(", ")}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <View style={classicStyles.section}>
          <Text style={classicStyles.sectionTitle} wrap={false}>Projects</Text>
          {data.projects.map((project) => (
            <View key={project.id} style={classicStyles.subsection} wrap={false}>
              <Text style={classicStyles.jobTitle}>{project.name}</Text>
              <Text style={{ fontSize: 8, color: '#374151', marginBottom: 3, lineHeight: 1.4 }}>
                {project.description}
              </Text>
              <Text style={{ fontSize: 7, color: '#6b7280', fontStyle: 'italic' }}>
                Technologies: {project.technologies.join(", ")}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Certificates */}
      {data.certificates && data.certificates.length > 0 && (
        <View style={classicStyles.section}>
          <Text style={classicStyles.sectionTitle} wrap={false}>Certifications</Text>
          {data.certificates.map((cert) => (
            <View key={cert.id} style={{ marginBottom: 6 }} wrap={false}>
              <Text style={classicStyles.jobTitle}>{cert.name}</Text>
              <Text style={classicStyles.company}>
                {cert.issuer} | {cert.date}
              </Text>
            </View>
          ))}
        </View>
      )}
    </Page>
  </Document>
);

// Modern PDF Template with Sidebar
const ModernPDFDocument: React.FC<{ data: CVData }> = ({ data }) => (
  <Document>
    <Page size="A4" style={modernStyles.page} wrap>
      {/* Sidebar */}
      <View style={modernStyles.sidebar}>
        <Text style={modernStyles.sidebarName}>{data.personalInfo.fullName}</Text>

        {/* Contact */}
        <View style={modernStyles.sidebarSection}>
          <Text style={modernStyles.sidebarTitle}>Contact</Text>
          <Text style={modernStyles.sidebarText}>{data.personalInfo.email}</Text>
          <Text style={modernStyles.sidebarText}>{data.personalInfo.phone}</Text>
          <Text style={modernStyles.sidebarText}>{data.personalInfo.location}</Text>

          {data.personalInfo.linkedin && (
            <Link src={data.personalInfo.linkedin} style={modernStyles.sidebarLink}>
              <Text>{truncateUrl(data.personalInfo.linkedin, 22)}</Text>
            </Link>
          )}
          {data.personalInfo.portfolio && (
            <Link src={data.personalInfo.portfolio} style={modernStyles.sidebarLink}>
              <Text>{truncateUrl(data.personalInfo.portfolio, 22)}</Text>
            </Link>
          )}
        </View>

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <View style={modernStyles.sidebarSection}>
            <Text style={modernStyles.sidebarTitle}>Skills</Text>
            {data.skills.map((skill) => (
              <View key={skill.id} style={{ marginBottom: 10 }}>
                <Text style={modernStyles.skillCategory}>
                  {skill.category}
                </Text>
                <View style={modernStyles.skillsContainer}>
                  {skill.items.map((item, idx) => (
                    <Text key={idx} style={modernStyles.skillTag}>
                      {item}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Main Content */}
      <View style={modernStyles.mainContent}>
        {/* Summary */}
        {data.summary && (
          <View style={modernStyles.mainSection}>
            <Text style={modernStyles.mainSectionTitle} wrap={false}>Profile</Text>
            <Text style={{ fontSize: 8, color: '#374151', lineHeight: 1.4 }}>
              {data.summary}
            </Text>
          </View>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <View style={modernStyles.mainSection}>
            <Text style={modernStyles.mainSectionTitle} wrap={false}>Experience</Text>
            {data.experience.map((exp) => (
              <View key={exp.id} style={modernStyles.subsection} wrap={false}>
                <Text style={modernStyles.jobTitle}>{exp.position}</Text>
                <Text style={modernStyles.company}>{exp.company}</Text>
                <Text style={modernStyles.dateLocation}>
                  {exp.startDate} - {exp.current ? "Present" : exp.endDate} | {exp.location}
                </Text>
                {exp.description.map((desc, idx) => (
                  <View key={idx} style={modernStyles.bulletContainer}>
                    <Text style={modernStyles.bulletPoint}>•</Text>
                    <Text style={modernStyles.bulletText}>{desc}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <View style={modernStyles.mainSection}>
            <Text style={modernStyles.mainSectionTitle} wrap={false}>Education</Text>
            {data.education.map((edu) => (
              <View key={edu.id} style={modernStyles.subsection} wrap={false}>
                <Text style={modernStyles.jobTitle}>
                  {edu.degree} in {edu.field}
                </Text>
                <Text style={{ fontSize: 8, color: '#4b5563' }}>{edu.institution}</Text>
                <Text style={modernStyles.dateLocation}>
                  {edu.startDate} - {edu.endDate} | {edu.location}
                  {edu.gpa && ` | GPA: ${edu.gpa}`}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <View style={modernStyles.mainSection}>
            <Text style={modernStyles.mainSectionTitle} wrap={false}>Projects</Text>
            {data.projects.map((project) => (
              <View key={project.id} style={modernStyles.subsection} wrap={false}>
                <Text style={modernStyles.jobTitle}>{project.name}</Text>
                <Text style={{ fontSize: 7, color: '#374151', marginBottom: 2, lineHeight: 1.4 }}>
                  {project.description}
                </Text>
                <Text style={{ fontSize: 6, color: '#6b7280', fontStyle: 'italic' }}>
                  Technologies: {project.technologies.join(", ")}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Certificates */}
        {data.certificates && data.certificates.length > 0 && (
          <View style={modernStyles.mainSection}>
            <Text style={modernStyles.mainSectionTitle} wrap={false}>Certifications</Text>
            {data.certificates.map((cert) => (
              <View key={cert.id} style={{ marginBottom: 6 }} wrap={false}>
                <Text style={modernStyles.jobTitle}>{cert.name}</Text>
                <Text style={{ fontSize: 7, color: '#4b5563' }}>
                  {cert.issuer} | {cert.date}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </Page>
  </Document>
);

// Minimal PDF Template
const MinimalPDFDocument: React.FC<{ data: CVData }> = ({ data }) => (
  <Document>
    <Page size="A4" style={minimalStyles.page} wrap>
      {/* Header */}
      <View style={minimalStyles.header} wrap={false}>
        <Text style={minimalStyles.name}>{data.personalInfo.fullName}</Text>
        <View style={minimalStyles.contactRow}>
          <Text style={minimalStyles.contactItem}>{data.personalInfo.email}</Text>
          <Text style={minimalStyles.separator}>•</Text>
          <Text style={minimalStyles.contactItem}>{data.personalInfo.phone}</Text>
          <Text style={minimalStyles.separator}>•</Text>
          <Text style={minimalStyles.contactItem}>{data.personalInfo.location}</Text>
        </View>
      </View>

      {/* Summary */}
      {data.summary && (
        <Text style={minimalStyles.summary}>{data.summary}</Text>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <View style={minimalStyles.section}>
          <Text style={minimalStyles.sectionTitle} wrap={false}>Experience</Text>
          {data.experience.map((exp) => (
            <View key={exp.id} style={minimalStyles.experienceRow} wrap={false}>
              <View style={minimalStyles.experienceHeader}>
                <View style={minimalStyles.experienceLeft}>
                  <Text style={minimalStyles.jobTitle}>{exp.position}</Text>
                  <Text style={minimalStyles.company}>{exp.company}</Text>
                </View>
                <View style={minimalStyles.experienceRight}>
                  <Text style={minimalStyles.dateLocationRight}>
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </Text>
                  <Text style={minimalStyles.dateLocationRight}>{exp.location}</Text>
                </View>
              </View>
              {exp.description.map((desc, idx) => (
                <View key={idx} style={minimalStyles.bulletContainer}>
                  <Text style={minimalStyles.bulletPoint}>—</Text>
                  <Text style={minimalStyles.bulletText}>{desc}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <View style={minimalStyles.section}>
          <Text style={minimalStyles.sectionTitle} wrap={false}>Education</Text>
          {data.education.map((edu) => (
            <View key={edu.id} style={minimalStyles.experienceRow} wrap={false}>
              <View style={minimalStyles.experienceHeader}>
                <View style={minimalStyles.experienceLeft}>
                  <Text style={minimalStyles.jobTitle}>
                    {edu.degree} in {edu.field}
                  </Text>
                  <Text style={minimalStyles.company}>{edu.institution}</Text>
                </View>
                <View style={minimalStyles.experienceRight}>
                  <Text style={minimalStyles.dateLocationRight}>
                    {edu.startDate} - {edu.endDate}
                  </Text>
                  {edu.gpa && (
                    <Text style={minimalStyles.dateLocationRight}>GPA: {edu.gpa}</Text>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <View style={minimalStyles.section}>
          <Text style={minimalStyles.sectionTitle} wrap={false}>Skills</Text>
          <View style={minimalStyles.skillsGrid}>
            {data.skills.map((skill) => (
              <View key={skill.id} style={minimalStyles.skillItem} wrap={false}>
                <Text style={minimalStyles.skillCategory}>{skill.category}</Text>
                <Text style={minimalStyles.skillList}>{skill.items.join(" • ")}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <View style={minimalStyles.section}>
          <Text style={minimalStyles.sectionTitle} wrap={false}>Projects</Text>
          {data.projects.map((project) => (
            <View key={project.id} style={{ marginBottom: 10 }} wrap={false}>
              <Text style={minimalStyles.jobTitle}>{project.name}</Text>
              <Text style={{ fontSize: 8, color: '#374151', marginBottom: 2, lineHeight: 1.4 }}>
                {project.description}
              </Text>
              <Text style={{ fontSize: 7, color: '#6b7280' }}>
                {project.technologies.join(" • ")}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Certificates */}
      {data.certificates && data.certificates.length > 0 && (
        <View style={minimalStyles.section}>
          <Text style={minimalStyles.sectionTitle} wrap={false}>Certifications</Text>
          {data.certificates.map((cert) => (
            <View key={cert.id} style={{ marginBottom: 6 }} wrap={false}>
              <Text style={minimalStyles.jobTitle}>{cert.name}</Text>
              <Text style={{ fontSize: 8, color: '#4b5563' }}>
                {cert.issuer} | {cert.date}
              </Text>
            </View>
          ))}
        </View>
      )}
    </Page>
  </Document>
);
