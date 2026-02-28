import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import NetworkPage from "./NetworkPage";
import JobsPage from "./JobsPage";
import MessagingPage from "./MessagingPage";
import NotificationsPage from "./NotificationsPage";
import ProfilePage from "./ProfilePage";
import MessagingWidget from "./MessagingWidget";
import { useEffect } from "react";
import { getUserAuth } from "../action";
import { connect } from "react-redux";

function App(props) {
	useEffect(() => {
		props.getUserAuth();
	}, []);

	return (
		<div className="App">
			<Router>
				<Header />
				<Switch>
					<Route exact path="/">
						<Redirect to="/feed" />
					</Route>
					<Route path="/feed">
						<Home />
					</Route>
					<Route path="/mynetwork">
						<NetworkPage />
					</Route>
					<Route path="/jobs">
						<JobsPage />
					</Route>
					<Route path="/messaging">
						<MessagingPage />
					</Route>
					<Route path="/notifications">
						<NotificationsPage />
					</Route>
					<Route path="/profile/:id">
						<ProfilePage />
					</Route>
					<Route path="*">
						<Redirect to="/feed" />
					</Route>
				</Switch>
				<MessagingWidget />
			</Router>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => ({
	getUserAuth: () => dispatch(getUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
