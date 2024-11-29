import googleButton from './assets/google-button.png'
const googleButtonSrc = String(googleButton);

function navigate(url) {
  window.location.href = url
}

async function auth() {
  const response = await fetch('http://127.0.0.1:3000/request', {
    method: 'POST',
  });
  const data = await response.json();
  navigate(data.url);
}

function App() {
  return (
    <div className="App">
      <h1>Welcome to website</h1>
      <h3>Google OAuth!</h3>
      <button type="button" onClick={() => auth()}>
        <img src={googleButtonSrc} alt="google sign in"/>
      </button>
    </div>
  );
}

export default App;
