import Providers from "./context/Providers";
import Routes from "./routes/Routes";

const App = () => {
  return (
    <Providers>
      <Routes />
    </Providers>
  );
};

export default App;
