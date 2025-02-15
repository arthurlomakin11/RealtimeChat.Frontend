import { Sidebar } from '@/components/Sidebar/Sidebar';
import { MainContent } from '@/components/MainContent/MainContent';
import { DetailsPanel } from '@/components/DetailsPanel/DetailsPanel';
import styles from './App.module.css';
import { Provider } from 'inversify-react';
import { container } from './inversify.config';
import { AuthorizedView } from './components/AuthorizedView';

const App = () => {
	return <>
		<Provider container={container}>
			<AuthorizedView />
			<div className={styles.app}>
				<Sidebar />
				<MainContent />
				<DetailsPanel />
			</div>
		</Provider>
	</>;
};

export default App;