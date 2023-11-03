import React from "react";
import AccountContainer from "./AccountContainer";

function App() {
	const [transactions, setTransactions] = React.useState([]);

	React.useEffect(() => {
		fetchTransactions();
	}, []);

	const fetchTransactions = async () => {
		const res = await fetch("http://localhost:3000/transactions");
			const jsonRes = await res.json();
			setTransactions(jsonRes);
	};
	const handleAddTransaction = (transaction) => {
		setTransactions([...transactions, transaction]);
	};
	const handleDeleteTransaction = (transId) => {
		const filterTransactions = transactions.filter(
			(trans) => trans.id !== transId
		);

		setTransactions(filterTransactions);
	};
	const handleSearch = (searchTerm) => {
		if (searchTerm) {
			const filteredTransactions = transactions.filter((trans) => {
				if (trans.description.toLowerCase().match(searchTerm.toLowerCase())) {
					return true;
				} else {
					return false;
				}
			});
			setTransactions(filteredTransactions);
		} else {
			fetchTransactions();
		}
	};
	return (
		<div className="ui raised segment">
			<div className="ui segment violet inverted">
				<h2>The Royal Bank of Flatiron</h2>
			</div>
			<AccountContainer
				handleAddTransaction={handleAddTransaction}
				transactions={transactions}
				handleSearch={handleSearch}
				handleDeleteTransaction={handleDeleteTransaction}
			/>
		</div>
		// <div>ddd</div>
	);
}

export default App;
