const initialUserState = {
	data: {
		id: "",
		username: "",
		email: "",
		password: "",
		confirm_password: "",
		first_name: "",
		last_name: "",
		gender: "",
		age: "",
		country: "",
		avatar: "",
		role: "user",
		email_verification: "0",
		banned: "0",
		about: "",
		social_accounts: {
			facebook: "",
			twitter: "",
			instagram: "",
			youtube: "",
		},
	},
	errors: {},
};

export default initialUserState;
