import { useEffect, useState } from 'react';
import './App.css';

function App() {
  return (
    <div className="App container">
      <Counter />
      <LoadComments />
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);
  const handleIncrease = () => setCount(count + 1);
  const handleDecrease = () => count > 0 ? setCount(count - 1) : count;

  return (
    <div className="flex">
      <div className="card">
        <h2>Count: {count}</h2>
        <button onClick={handleIncrease} className="btn-custom btn-blue">Increase</button><br /><br />
        <button onClick={handleDecrease} className="btn-custom btn-red">Decrease</button>
      </div>
    </div>
  );
}

function LoadComments() {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(res => res.json())
      .then(data => setComments(data.slice(0, 100)))
  }, []);

  return (
    <div>
      <h1>Posts Loaded from Typicode API</h1>
      <h4>Number of Posts: {comments.length}</h4>
      <div className="posts">
        {
          comments.map((comment, i) => <ShowComments id={comment.id} title={comment.title} url={comment.url} photo={comment.thumbnailUrl} key={i} />)
        }
      </div>
    </div>
  );
}

function ShowComments(props) {
  const { id, title, url, photo } = props
  return (
    <div>
      <div className="post justify">
        <p>Id: {id}</p>
        <p>{title.slice(0, 55)}</p>
        <a href={url} style={{ color: 'lightgreen', textDecoration: 'none', fontSize: '12px', margin: '5px' }}>{url}</a>
        <div className="flex" style={{ marginTop: '15px' }}>
          <a href={"/"}><img src={photo} alt="React-app" /></a>
        </div>
      </div>
    </div>
  )
}

export default App;
