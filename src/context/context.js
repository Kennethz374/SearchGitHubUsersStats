import React, { useState, useEffect, useContext } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();
// Provider, Consumer - GithubContext.Provider

const GithubProvider = ({ children }) => {
	const [githubUser, setGithubUser] = useState(mockUser);
	const [repos, setRepos] = useState(mockRepos);
	const [followers, setFollowers] = useState(mockFollowers);
	const [requests, setRequests] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState({ show: false, msg: "" });

	//check rate
	const checkRequests = () => {
		axios(`${rootUrl}/rate_limit`)
			.then(({ data }) => {
				let {
					rate: { remaining },
				} = data;
				setRequests(remaining);
				if (remaining === 0) {
					//throw error
					toggleError(true, "sorry, you have exceeded your hourly limit!!!");
				}
			})
			.catch((error) => console.log(error));
	};
	//error
	const toggleError = (show = false, msg = "") => {
		setError({ show, msg });
	};
	//get user

	const searchUser = async (user) => {
		toggleError();
		setIsLoading(true);
		const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
			console.log(err)
		);
		if (response) {
			setGithubUser(response.data);
			//more logics
		} else {
			toggleError(true, "there is no user with that user name!!!");
		}
		checkRequests();
		setIsLoading(false);
	};

	useEffect(() => {
		checkRequests();
		console.log("hey from context");
	}, []);

	return (
		<GithubContext.Provider
			value={{
				githubUser,
				repos,
				followers,
				requests,
				error,
				searchUser,
				isLoading,
			}}
		>
			{children}
		</GithubContext.Provider>
	);
};

const useGlobalContext = () => {
	return useContext(GithubContext);
};

export { GithubContext, GithubProvider, useGlobalContext };
