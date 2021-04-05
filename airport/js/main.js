const URL = 'http://booking/api'

const vue=new Vue({
	el:"#app",
	data:{
		page:'home'
		token: null,
		error: null,
		signupForm: {
			first_name: 'ivan',
			last_name: 'ivanov',
			phone: '89001234561',
			document_number: '7567999222',
			password: 'password'
		},
		signinForm: {
			phone: '89001234561',
			password: 'password'
		}
	},
	methods:{
		signup(){
			console.log(this.signupForm);
			send(
				'reg', 
				'POST', 
				this.signupForm, 
				data => {

				this.page = 'signin'
			})
		},

		signin(){
			console.log(this.signinForm);
			send(
				'login', 
				'POST', 
				this.signinForm, 
				data => {

				this.token = data.data.token
				localStorage.setItem('token', data.data.token)
				// localStorage.getItem('token')
				this.page = 'home'
			})
		}
	}
})






function send(url, method, data, cb) {
	$.ajax({
		url: URL + '/' + url,
		data: data,
		type: method,
		error: err => {
			vue.error = err.responseJSON.error
		},
		success: data => {
			if (data?.error) {
				vue.data.error = data.error.responseJSON.error
			} else {
				cb(data)
			}
		}
	})
}