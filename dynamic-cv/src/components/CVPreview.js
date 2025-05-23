import React from 'react';

const CVPreview = ({ personal, education, experience, skills }) => {
  return (
    <div className="preview-container">
      <div className="header">
        <h1>{personal.name}</h1>
        <p>{personal.email} | {personal.phone} | {personal.address}</p>
      </div>

      <section className="education-section">
        <h2>Education</h2>
        {education.map(edu => (
          <div key={edu.id}>
            <h3>{edu.degree}</h3>
            <p>{edu.institution} ({edu.year})</p>
          </div>
        ))}
      </section>

      {/* Experience Section */}
      <section className="experience-section">
        <h2>Work Experience</h2>
        {experience.map((exp) => (
          <div key={exp.id} className="experience-item">
            <h3>{exp.title || 'Position'}</h3>
            <p className="company-duration">
              {exp.company || 'Company'} • {exp.duration || 'Duration'}
            </p>
            {exp.responsibilities && (
              <ul>
                {exp.responsibilities.split('\n').map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>

      {/* Skills Section */}
      <section className="skills-section">
        <h2>Skills</h2>
        <div className="skills-list">
          {skills.map((skill, index) => (
            <div key={index} className="skill-tag">
              {skill}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CVPreview;