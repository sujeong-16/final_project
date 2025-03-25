import React from 'react';
import Home from './pages/Home';
import { BrowserRouter } from 'react-router-dom';

function App() {
	return (
		<BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
			{/* 라우트 설정 */}
			<Home />
		</BrowserRouter>
	);
}

export default App;
