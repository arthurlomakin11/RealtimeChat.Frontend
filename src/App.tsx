import { Sidebar } from '@/components/Sidebar/Sidebar';
import { MainContent } from '@/components/MainContent/MainContent';
import { DetailsPanel } from '@/components/DetailsPanel/DetailsPanel';
import styles from './App.module.css';
import { Provider } from 'inversify-react';
import { container } from './inversify.config';
import { AuthorizedView } from './components/AuthorizedView';
import { ApolloProvider } from '@apollo/client';
import { client } from './apolloClient';

const App = () => {
	return <Provider container={container}>
		<ApolloProvider client={client}>
			<div className={styles.app}>
				<AuthorizedView
					Auth = {
						<>
							<Sidebar />
							<MainContent />
							<DetailsPanel />
						</>
					}

					NotAuth = {<div>Not authorized</div>}
				/>
			</div>
		</ApolloProvider>
	</Provider>;
};

export default App;