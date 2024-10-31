import { ActiveItemProvider } from './ActiveItemContext';
import Desktop from './components/Desktop';

const Home = () => {
  return (
    <ActiveItemProvider>
      <Desktop />
    </ActiveItemProvider>
  );
};

export default Home;
