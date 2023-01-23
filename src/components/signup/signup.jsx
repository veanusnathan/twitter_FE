import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { SignUpDOB, OnSubmit } from "../../supports/constants/functions";

export default function SignUp(props) {
	const [dob, setDob] = useState({});
	const [errMsg, setErrMsg] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [disable, setDisable] = useState(false);

	useEffect(() => {
		SignUpDOB(setDob);
	}, []);

	return (
		<>
			{props.visible.popUpSignUp ? (
				<div
					id="container"
					onClick={props.close.ClosePopUpSignUp}
					className="fixed inset-0 bg-gray-500 bg-opacity-20 backdrop-blur-sm flex justify-center items-center text-white"
				>
					<div className="bg-black rounded-lg p-2 relative top-0 left-0">
						<button onClick={props.x.ClosePopUpXSignUp} className="text-xl m-2">
							<RxCross2 />
						</button>
						<h1 className="text-3xl font-bold px-10 mb-5">Create your account</h1>
						<form action="" className="px-16 pb-5">
							<input
								type="text"
								placeholder="Email"
								className="w-full rounded-md bg-black h-14 mb-5"
								onChange={(event) => setEmail(event.target.value)}
								value={email}
							/>
							<input
								type="text"
								placeholder="Password"
								className="w-full rounded-md bg-black h-14 mb-2"
								onChange={(event) => setPassword(event.target.value)}
								value={password}
							/>
							<div className="text-white text-sm">{errMsg}</div>
							<div className="flex justify-end">
								<a href="/" className="text-blue-400 mb-5">
									Use phone number instead
								</a>
							</div>
							<div className="mb-4">
								<p className="font-semibold mb-2">Date of birth</p>
								<p className="text-sm text-slate-500 max-w-sm">
									This will not be shown publicly. Confirm your own age, even if this account is for
									a business, a pet, or something else.
								</p>
							</div>
							<div className="flex mb-[200px]">
								<div className="px-4">
									<label className="block mb-2 text-sm font-medium text-white">Month</label>
									<select
										id="countries"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 px-6"
									>
										{dob.month.map((value, index) => {
											return (
												<option value={value} key={index}>
													{value}
												</option>
											);
										})}
									</select>
								</div>
								<div className="px-4">
									<label className="block mb-2 text-sm font-medium text-white">Day</label>
									<select
										id="countries"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 px-6"
									>
										{dob.day.map((value, index) => {
											return (
												<option value={value} key={index}>
													{value}
												</option>
											);
										})}
									</select>
								</div>
								<div className="px-4">
									<label className="block mb-2 text-sm font-medium text-white">Year</label>
									<select
										id="countries"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 px-6"
									>
										{dob.year.map((value, index) => {
											return (
												<option value={value} key={index}>
													{value}
												</option>
											);
										})}
									</select>
								</div>
							</div>

							<button
								disabled={email === "" || password === "" || disable}
								className="border-[1px] border-slate-700 bg-[#77797A] text-black rounded-full px-3 py-3 w-full font-bold"
								onClick={() =>
									OnSubmit(
										email,
										setEmail,
										password,
										setPassword,
										setErrMsg,
										setDisable,
										props.x.ClosePopUpXSignUp
									)
								}
							>
								Register
							</button>
						</form>
					</div>
				</div>
			) : null}
		</>
	);
}
