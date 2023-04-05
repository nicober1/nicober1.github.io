import React from 'react'

const Resume = ({name, email, phone, summary, skills, projects, education}) => {
  return (
    <div className='resume container mx-auto px-4 py-8'>
      <header className='header flex items-center justify-between'>
        <h1 className='text-4xl font-bold'>{name}</h1>
        <div className='contact-info'>
          <p>{email}</p>
          <p>{phone}</p>
        </div>
      </header>
      <section className='summary mt-4'>
        <h2 className='text-2xl font-semibold'>Summary</h2>
        <p>{summary}</p>
      </section>
      <section className='skills mt-4'>
        <h2 className='text-2xl font-semibold'>Skills</h2>
        <ul className='flex flex-wrap gap-2'>
          {skills.map((skill) => (
            <li key={skill} className='rounded bg-indigo-500 px-2 py-1 text-white'>
              {skill}
            </li>
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
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 890',
    summary:
      'A passionate and experienced .NET developer with over 5 years of experience in building web applications using C#, ASP.NET MVC, Entity Framework, and SQL Server.',
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