import { memo, useState } from "react"; 

export default function PureComponents() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  return (
    <>
      <label>
        Name{': '}
        <input value={name} onChange={e => setName(e.target.value)} />
      </label><br />
      <label>
        Address{': '}
        <input value={address} onChange={e => setAddress(e.target.value)} />
      </label>
      <Greeting name={name} />
    </>
  );
}

const Greeting = memo(({ name }) => {
  console.log("Greeting was rendered at", new Date().toLocaleTimeString());
  return <h3>Hello{name && ', '}{name}!</h3>;
});

// const Greeting = ({ name }) => {
//   console.log("Greeting was rendered at", new Date().toLocaleTimeString());
//   return <h3>Hello{name && ', '}{name}!</h3>;
// };