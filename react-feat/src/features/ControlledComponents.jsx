import React, { useState } from "react";

export default function ControlledComponents() {
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState('male');
    const [skill, setSkill] = useState([]);
    const [role, setRole] = useState('Student');
    const handleCheckboxChange = (e) => {
      const { value, checked } = e.target;
      if (checked) {
        setSkill([...skill, value]);
      } else {
        setSkill(skill.filter((item) => item !== value));
      }
    };
    return(
    <>
        <h1>Controlled Components</h1>
        <label htmlFor="name">Name:</label><br />
        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}/><br /><br />
        <label htmlFor="age">Age:</label><br />
        <input id="age" type="number" value={age} onChange={(e) => setAge(e.target.value)}/><br /><br />
        
        <label htmlFor="gender">Gender:</label><br />
        <input type="radio" name="gender" value="male" id="gender" onChange={(e) => setGender(e.target.value)} checked={gender === 'male'}/><label htmlFor="gender">Male</label><br />
        <input type="radio" name="gender" value="female" id="gender" onChange={(e) => setGender(e.target.value)} checked={gender === 'female'}/><label htmlFor="gender">Female</label><br />
        <br /><br />

        <label htmlFor="skill">Skill:</label><br />
        <input type="checkbox" name="skill" value="Java" id="skill_java" onChange={handleCheckboxChange} checked={skill.includes('Java')}/>
        <label htmlFor="skill_java">Java</label><br />
        <input type="checkbox" name="skill" value="Python" id="skill_python" onChange={handleCheckboxChange} checked={skill.includes('Python')}/>
        <label htmlFor="skill_python">Python</label><br />
        <input type="checkbox" name="skill" value="React" id="skill_react" onChange={handleCheckboxChange} checked={skill.includes('React')}/>
        <label htmlFor="skill_react">React</label><br />
        <br /><br />

        <label htmlFor="role">Role:</label><br />
        <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Student">Student</option>
            <option value="Developer">Developer</option>
        </select><br /><br />

        <hr /> 

        <p>Name : {name}</p>
        <p>Age : {age}</p>
        <p>Gender : {gender}</p>
        {skill.length > 0 && <p>Skill : {skill.length > 0 && skill.join(', ')}</p>}
        <p>Role : {role}</p>

        <button>Submit</button>
        <button onClick={() => {setName(''); setAge(0); setGender('male'); setSkill([]); setRole('Student')}}>Reset</button>
    </>
  );
}
