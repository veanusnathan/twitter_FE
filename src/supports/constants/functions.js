import axios from "axios";

const db = "http://localhost:5000/";
export const OnSubmit = async (
	paramEmail,
	paramSetEmail,
	paramPassword,
	paramSetPassword,
	paramSetErrMsg,
	paramSetDisable,
	paramClosePopUpSignUp
) => {
	const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
	try {
		paramSetDisable(true);
		let checkEmail = await axios.get(`${db}users?email=${paramEmail}`);
		let errEmail = { message: "Email already exist" };
		let errPassMin = { message: "Password must have atleast 8 characters" };
		let errPassNaN = { message: "Password must contain atleast a number" };
		let errEmailAt = { message: "Invalid Email" };

		if (checkEmail.data.length !== 0) {
			throw errEmail;
		} else if (!paramEmail.includes("@")) {
			throw errEmailAt;
		} else if (paramPassword.length < 8) {
			throw errPassMin;
		} else if (!regex.test(paramPassword)) {
			throw errPassNaN;
		} else {
			await axios.post("http://localhost:5000/users", {
				paramEmail,
				paramPassword,
			});
			paramSetEmail("");
			paramSetPassword("");
			paramSetErrMsg("");
			paramClosePopUpSignUp()
		}
	} catch (error) {
		paramSetErrMsg(error.message);
	}finally {
		paramSetDisable(false);
	}
};

export const SignUpDOB = async (paramSetDOB) => {
	try {
		let response = await axios.get(`${db}dobInput`);
		paramSetDOB(response.data);
	} catch (error) {}
};
