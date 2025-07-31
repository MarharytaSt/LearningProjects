import apiService from './services/apiService';

async function sendGet() {
    const response = await apiService.getAsync();
    console.log('reponse', response);
}

function App() {
  return (
    <div className="App">
      <button onClick={async () => await sendGet()}>SendGet</button>
    </div>
  );
}

export default App;
