import React from 'react';
import MyContainer from '../components/MyContainer';

const About = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <MyContainer className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Empowering Lifelong Learners Worldwide
              </h1>
              <p className="text-xl mb-8 opacity-90">
                We're on a mission to make high-quality education accessible to everyone, anywhere. 
                Join millions transforming their careers through our interactive courses.
              </p>
              <button className="bg-secondary text-white font-semibold px-8 py-4 rounded-full hover:bg-secondary/90 transition shadow-lg">
                Explore Courses
              </button>
            </div>
            <div className="flex justify-center">
              <img 
                src="/hero-student.png" 
                alt="Diverse students learning online" 
                className="w-full max-w-lg drop-shadow-2xl"
              />
            </div>
          </div>
        </MyContainer>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-base-200">
        <MyContainer>
          <h2 className="text-4xl font-bold text-center mb-12 text-accent">Our Impact in Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '500K+', label: 'Active Learners' },
              { number: '1,200+', label: 'Expert Courses' },
              { number: '150+', label: 'World-Class Instructors' },
              { number: '98%', label: 'Satisfaction Rate' },
            ].map((stat, i) => (
              <div key={i} className="text-center  p-8 rounded-2xl shadow-lg hover:shadow-xl transition hover:scale-105">
                <p className="text-5xl font-bold text-primary mb-2">{stat.number}</p>
                <p className="text-xl text-accent/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </MyContainer>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 ">
        <MyContainer>
          <h2 className="text-4xl font-bold text-center mb-16 text-accent">Our Core Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Mission', desc: 'To democratize education by providing affordable, flexible, and engaging online courses for all.' },
              { title: 'Vision', desc: 'A world where anyone can acquire new skills and advance their career without barriers.' },
              { title: 'Values', desc: 'Excellence, Inclusivity, Innovation, and Community-Driven Learning.' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="bg-primary/10 w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">{item.title[0]}</span>
                </div>
                <h3 className="text-3xl font-semibold mb-4 text-primary">{item.title}</h3>
                <p className="text-lg text-accent/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </MyContainer>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-base-300">
        <MyContainer>
          <h2 className="text-4xl font-bold text-center mb-12 text-accent">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
                { name: "John Doe", role: "Founder & CEO", photo: "/user1.jpg" },
                { name: "Jane Smith", role: "Chief Learning Officer", photo: "/user2.jpg" },
                { name: "Mike Johnson", role: "Head of Technology", photo: "/user3.jpg" },
                { name: "Emily Davis", role: "Marketing Director", photo: "/user4.png" },
            
            ].map((member, i) => (
              <div key={i} className="text-center group">
                <img 
                  src={member.photo} 
                  alt={`Team Member ${member.name}`} 
                  className="w-48 h-48 rounded-full mx-auto mb-6 object-cover shadow-lg group-hover:scale-105 group-hover:shadow-2xl transition border-4 border-primary/20"
                />
                <h4 className="text-2xl font-semibold text-accent">{member.name}</h4>
                <p className="text-accent/70">{member.role}</p>
              </div>
            ))}
          </div>
        </MyContainer>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <MyContainer>
          <h2 className="text-4xl font-bold text-center mb-12 text-accent">What Our Learners Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { quote: 'This platform completely transformed my career trajectory!', name: 'Sarah J.' },
              { quote: 'Outstanding instructors and perfectly paced content.', name: 'Mike T.' },
              { quote: 'High-quality courses at an affordable price — highly recommended.', name: 'Emma L.' },
            ].map((t, i) => (
              <div key={i} className="bg-base-200 p-8 rounded-2xl shadow-xl border-l-4 border-secondary">
                <p className="text-lg italic mb-6 text-accent/80">"{t.quote}"</p>
                <p className="font-semibold text-primary">- {t.name}</p>
              </div>
            ))}
          </div>
        </MyContainer>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <MyContainer>
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
          <button className="bg-secondary text-white font-semibold px-10 py-5 rounded-full text-xl hover:bg-secondary/90 transition shadow-lg">
            Join Us Today
          </button>
        </MyContainer>
      </section>
    </>
  );
};

export default About;