import React, { useState, useEffect } from 'react';

const CVForm = ({ cvData, setCvData }) => {
  const [errors, setErrors] = useState({});
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('cvData');
    if (savedData) {
      setCvData(JSON.parse(savedData));
    }
  }, [setCvData]);

  const handleChange = (section, field, value) => {
    setCvData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const handleEducationChange = (id, field, value) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const validateField = (field, value) => {
    let error = '';
    if (!value.trim()) error = 'This field is required';
    if (field === 'email' && !emailRegex.test(value)) error = 'Invalid email format';
    return error;
  };

  // Education handler
  const addSection = (section) => {
    setCvData(prev => ({
      ...prev,
      [section]: [...prev[section], { id: Date.now(), ...(section === 'education' ? 
        { degree: '', institution: '', year: '' } : 
        { title: '', company: '', duration: '', responsibilities: '' }) 
      }]
    }));
  };

  const removeSection = (section, id) => {
    setCvData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  };

  // Experience Handlers
  const handleExperienceChange = (id, field, value) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  // Skills Handlers
  const [newSkill, setNewSkill] = useState('');
  
  const addSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim()) {
      setCvData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (index) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    localStorage.setItem('cvData', JSON.stringify(cvData));
    alert('CV saved successfully!');
  };

  const handleReset = () => {
    setCvData({
      personal: { name: '', email: '', phone: '', address: '' },
      education: [],
      experience: [],
      skills: []
    });
    localStorage.removeItem('cvData');
    setErrors({});
  };

  return (
    <div className="form-container">
      {/* Personal Info Section */}
      <section className="form-section">
        <h2>Personal Information</h2>
        {['name', 'email', 'phone', 'address'].map(field => (
          <div key={field}>
            <input
              value={cvData.personal[field]}
              onChange={(e) => {
                handleChange('personal', field, e.target.value);
                setErrors({ ...errors, [field]: validateField(field, e.target.value) });
              }}
              placeholder={`Enter ${field}`}
            />
            {errors[field] && <span className="error">{errors[field]}</span>}
          </div>
        ))}
      </section>

      {/* Education Section */}
      <section className="form-section">
        <h2>Education</h2>
        {cvData.education.map((edu) => (
          <div key={edu.id} className="education-entry">
            <input
              value={edu.degree}
              onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)}
              placeholder="Degree (e.g., Bachelor of Science)"
            />
            <input
              value={edu.institution}
              onChange={(e) => handleEducationChange(edu.id, 'institution', e.target.value)}
              placeholder="Institution (e.g., University of Example)"
            />
            <input
              value={edu.year}
              onChange={(e) => handleEducationChange(edu.id, 'year', e.target.value)}
              placeholder="Year of Completion (e.g., 2020)"
            />
            <button 
              onClick={() => removeSection('education', edu.id)}
              className="delete-btn"
            >
              Delete
            </button>
          </div>
        ))}
        <button onClick={() => addSection('education')}>Add Education</button>
      </section>

      {/* Experience Section */}
      <section className="form-section">
        <h2>Work Experience</h2>
        {cvData.experience.map((exp) => (
          <div key={exp.id} className="experience-entry">
            <input
              value={exp.title}
              onChange={(e) => handleExperienceChange(exp.id, 'title', e.target.value)}
              placeholder="Job Title"
            />
            <input
              value={exp.company}
              onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
              placeholder="Company"
            />
            <input
              value={exp.duration}
              onChange={(e) => handleExperienceChange(exp.id, 'duration', e.target.value)}
              placeholder="Duration (e.g., 2020-2022)"
            />
            <textarea
              value={exp.responsibilities}
              onChange={(e) => handleExperienceChange(exp.id, 'responsibilities', e.target.value)}
              placeholder="Key Responsibilities"
              rows="3"
            />
            <button 
              onClick={() => removeSection('experience', exp.id)}
              className="delete-btn"
            >
              Delete
            </button>
          </div>
        ))}
        <button onClick={() => addSection('experience')}>
          Add Experience
        </button>
      </section>

      {/* Skills Section */}
      <section className="form-section">
        <h2>Skills</h2>
        <form onSubmit={addSkill} className="skill-input">
          <input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill"
          />
          <button type="submit">Add Skill</button>
        </form>
        <div className="skills-list">
          {cvData.skills.map((skill, index) => (
            <div key={index} className="skill-tag">
              {skill}
              <button 
                onClick={() => removeSkill(index)}
                className="delete-btn"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </section>

      <div className="form-actions">
        <button type="button" onClick={handleSave} className="save-btn">
          Save CV
        </button>
        <button type="button" onClick={handleReset} className="reset-btn">
          Reset CV
        </button>
      </div>

    </div>
  );
};

export default CVForm;