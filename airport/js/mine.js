Vue.component('authification',{
	template:`
	<div>
			<main class='container__main-authification' v-if='$parent.page.page_status_now=="login"'>
				<div class="auth__contain">
					<form>
						<input type="text" placeholder="Введите ваш телефон" v-model="$parent.login.phone">
						<input type="password" placeholder="Пароль"  v-model="$parent.login.password">
						<input type="submit" value="Войти" @click="$emit('log')">
					</form>
					<div class="reg"><a href="#" @click="$emit('registration')">Зарегистрироваться</a></div>
				</div>
			</main>
			<main class="container__main-registration" v-if='$parent.page.page_status_now=="registration"'>
				<div class="registration__container">
					<form>
						<input type="text" placeholder='Имя' v-model="$parent.registration.name">
						<input type="text" placeholder='Фамилия' v-model="$parent.registration.surname">
						<input type="text" placeholder='Номер документа' v-model="$parent.registration.doc_number">
						<input type="text" placeholder='Телефон' v-model="$parent.registration.phone">
						<input type="text" placeholder='Пароль' v-model="$parent.registration.password">
						<input type="text" placeholder='Повтор пароля' v-model="$parent.registration.repeat_password">
						<input type="submit" value="Зарегистрироваться" @click="$emit('regin')">
					</form>
					<div><a href="#" @click="$emit('login')">Войти</a></div>
				</div>
			</main>
	</div>
	`
})


var app= new Vue({
	el:'#app',
	data:{
		page:
		{
			page_status:'main',
			page_status_now:localStorage.getItem('page_status_now'),
		},
		user:{
			api_token:null,
		},
		registration:{
			name:null,
			surname:null,
			doc_number:null,
			phone:null,
			password:null,
			repeat_password:null,
		},
		login:{
			phone:null,
			password:null,
		}	
	},
	methods:{
		checkPage()
		{
			if(this.user.api_token==null)
			{
				if(this.page.page_status=='login')
				{
					localStorage.removeItem('page_status_now');
					localStorage.setItem('page_status_now',this.page.page_status);
					this.page.page_status_now=localStorage.getItem('page_status_now');	
				}
				if(this.page.page_status=='main')
				{
					localStorage.removeItem('page_status_now');
					localStorage.setItem('page_status_now',this.page.page_status);
					this.page.page_status_now=localStorage.getItem('page_status_now');	
				}
				if(this.page.page_status=='registration')
				{
					localStorage.removeItem('page_status_now');
					localStorage.setItem('page_status_now',this.page.page_status);
					this.page.page_status_now=localStorage.getItem('page_status_now');	
				}
			}
		},
		Registration()
		{
			requestAsyncRegistration(
				'registration',
				'POST',
				{
					'name':this.registration.name,
					'surname':this.registration.surname,
					'doc_number':this.registration.doc_number,
					'phone':this.registration.phone,
					'password':this.registration.password,
				},
				(err, data) => {
						console.log(err, data);
						if (err !== null) 
						{
							this.error = err
						} 
						else 
						{
							if (typeof data.error === 'undefined')
							{


							} 
							else{
								this.error = data.error
							}
						}
				})			
			},
		Login()
		{
			requestAsyncRegistration(
				'login', 
				'GET',
				{
					"phone":this.login.phone, 
					"password":this.login.password,
				},
				(err, data) => {
					console.log(err, data);
					if (err !== null) {
						this.error = err
					} 
					else {
						if (typeof data.error === 'undefined'){
							
						} 
						else{
							this.error = data.error
						}
					}
				})
		},
	}
})
function requestAsyncRegistration(path, method, data, cb) {
	$.ajax({
		url: 'http://localhost:8000/api/' + path,
		type: method,
		data: data,
		error: err => {
			cb(err, null)
			alert("Ошибка");
		},
		success: data => {
			cb(null, data)
			alert("Успешно");
		}
	})
}