import "./App.css";
import { useState } from "react";
import axios from "axios";
import Footer from "./components/footer/footer";
import Base from "./components/base/base";
import SignUp from "./components/signup/signup";
import SignIn from "./components/signin/signin";

function App() {
	const [popUpSignIn, setPopUpSignIn] = useState(false);
	const [popUpSignUp, setPopUpSignUp] = useState(false);
	const [username, setUsername] = useState("");

	const ShowPopUpSignIn = () => {
		setPopUpSignIn(true);
	};
	const ClosePopUpSignIn = (event) => {
		if (event.target.id === "container") setPopUpSignIn(false);
	};
	const ClosePopUpXSignIn = () => {
		setPopUpSignIn(false);
	};
	const ShowPopUpSignUp = () => {
		setPopUpSignUp(true);
	};
	const ClosePopUpSignUp = (event) => {
		if (event.target.id === "container") setPopUpSignUp(false);
	};
	const ClosePopUpXSignUp = () => {
		setPopUpSignUp(false);
	};

	const err = { message: "Account Not Found" };

	let OnLogin = async (inputEmail, inputPassword) => {
		try {
			let response = await axios.get(
				`http://localhost:5000/users?email=${inputEmail}&password=${inputPassword}`
			);
			if (response.data.length === 0) throw err;
			localStorage.setItem("token", `${response.data[0].id}`);
			setUsername(response.data[0].email);
			setTimeout(() => {
				ClosePopUpXSignIn();
			}, 1500);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<Base username={{ username }} />
			<Footer
				username={{ username }}
				popUpSignIn={{ ShowPopUpSignIn }}
				popUpSignUp={{ ShowPopUpSignUp }}
			/>
			<SignIn
				visible={{ popUpSignIn }}
				close={{ ClosePopUpSignIn }}
				x={{ ClosePopUpXSignIn }}
				myFunc={{ OnLogin }}
			/>
			<SignUp visible={{ popUpSignUp }} close={{ ClosePopUpSignUp }} x={{ ClosePopUpXSignUp }} />
		</div>
	);
}

export default App;
