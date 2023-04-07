import React from 'react'
import {FaPhone, FaEnvelope} from 'react-icons/fa'

const Resume = ({name, email, phone, summary, skills, projects, education}) => {
  return (
    <div className='resume container mx-auto my-auto mt-10 rounded-lg bg-cyan-700 px-4 py-2 text-white shadow-lg'>
      <header className='header flex flex-wrap items-center justify-between rounded-lg bg-gradient-to-br from-black via-blue-700 to-black p-4  shadow-lg'>
        <h1 className=' my-auto  text-left text-4xl font-bold'>{name}</h1>
        <div className='contact-info my-auto flex  space-x-4 '>
          <a
            href={`mailto:${email}`}
            className='text-whiteduration-300 flex transform items-center text-white transition-colors hover:scale-110 hover:text-white'>
            <FaEnvelope className='h-6 w-6' />
            <span className='ml-2'>{email}</span>
          </a>
          <a
            href={`tel:${phone}`}
            className='text-whiteduration-300 flex transform  items-center text-white transition-colors  hover:scale-110 hover:text-white'>
            <FaPhone className='h-6 w-6' />
            <span className='ml-2'>{phone}</span>
          </a>
        </div>
      </header>
      {/* Summary */}
      <section className='summary mt-4 text-white'>
        <h2 className='text-2xl font-bold'>Summary</h2>
        <p className='text-white'>{summary}</p>
      </section>
      {/* Skills */}
      <section className='skills mt-4'>
        <h2 className='text-2xl font-bold'>Skills</h2>
        <ul className='flex flex-wrap gap-2'>
          {skills.map((skill) => (
            <div
              key={skill}
              className='rounded-lg bg-gradient-to-br from-black via-blue-700 to-black p-2  text-white shadow-lg'>
              {skill}
            </div>
          ))}
        </ul>
      </section>
      <section className='projects mt-4'>
        <h2 className='text-2xl font-semibold'>Projects</h2>
        {projects.map((project) => (
          <article key={project.name} className='project mt-2 rounded border p-4'>
            <strong className='text-xl font-medium'>{project.name}</strong>
            <p>{project.description}</p>
            <p>Skills used: {project.skills.join(', ')}</p>
          </article>
        ))}
      </section>
      <section className='education mt-4'>
        <h2 className='text-2xl font-semibold'>Education</h2>
        {education.map((edu) => (
          <article key={edu.degree + edu.field} className='edu mt-2 rounded border p-4'>
            <strong className='text-xl font-medium'>
              {edu.degree} in {edu.field}
            </strong>
            <p>
              {edu.school}, {edu.location}.
            </p>
            <p>
              {edu.startYear} - {edu.endYear}.
            </p>
          </article>
        ))}
      </section>
    </div>
  )
}

export default function () {
  const resumeData = {
    name: 'Nicober Mani',
    email: 'iamnicober@gmail.com',
    phone: '+91 8001700700',
    summary:
      'I am a senior .NET backend engineer with over 5 years of experience in developing scalable, secure and reliable web applications using Microsoft technologies and Azure ' +
      'cloud services. I have a strong knowledge of C#, ASP.NET Core, Entity Framework Core, SQL Server, Azure DevOps, Azure Functions, Azure App Service, Azure SQL' +
      'Database, Azure Storage and Azure Active Directory. I am proficient in using RESTful APIs, microservices architecture, design patterns, SOLID principles,' +
      'unit testing and code quality tools. I am passionate about learning new technologies and best practices to deliver high-quality software solutions.',
    skills: ['.NET', 'C#', 'ASP.NET MVC', 'Entity Framework', 'SQL Server', 'HTML', 'CSS', 'JavaScript'],
    projects: [
      {
        name: 'Online Shopping System',
        description: 'A web application that allows users to browse, search, and purchase products online.',
        skills: ['.NET', 'C#', 'ASP.NET MVC', 'Entity Framework', 'SQL Server', 'HTML', 'CSS', 'JavaScript'],
      },
      {
        name: 'Blog Platform',
        description:
          'A web application that allows users to create, edit, and publish blog posts with rich text formatting and images.',
        skills: ['.NET', 'C#', 'ASP.NET MVC', 'Entity Framework', 'SQL Server', 'HTML', 'CSS', 'JavaScript'],
      },
    ],
    education: [
      {
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        school: 'ABC University',
        location: 'New York, USA',
        startYear: 2015,
        endYear: 2019,
      },
      {
        degree: 'Master of Science',
        field: 'Software Engineering',
        school: 'XYZ University',
        location: 'London, UK',
        startYear: 2020,
        endYear: 2022,
      },
    ],
  }

  return <Resume {...resumeData} />
}
