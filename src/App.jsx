import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BeerList from './components/BeerList';
import BeerDetails from './components/BeerDetails';

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<BeerList />} />
				<Route path='/details/:beerId' element={<BeerDetails />} />
			</Routes>
		</Router>
	);
}

export default App;
