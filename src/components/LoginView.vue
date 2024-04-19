<template>
	<div class="login-wrap">
		<div class="ms-login">
			<div class="ms-title">后台管理系统</div>
			<el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
				<el-form-item prop="username">
					<el-input v-model="param.username" placeholder="username">

						<!-- <el-button :icon="User"></el-button> -->

					</el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input type="password" placeholder="password" v-model="param.password"
						@keyup.enter="submitForm(param)">

						<el-button :icon="Lock"></el-button>

					</el-input>
				</el-form-item>
				<div class="login-btn">
					<el-button type="primary" @click="submitForm(param)">登录</el-button>
				</div>
				<p class="login-tips">大丘丘病了二丘丘瞧，三丘丘采药健哥退散。</p>
			</el-form>
		</div>
	</div>
</template>

<script>
import axios from "axios";
// import { Router } from "express";
export default {
	data() {
		return {
			param: {
				username: 'admin',
				password: ''
			},
			rules: {
				username: [
					{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}
				],
				password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
			}
		}
	},
	mounted() {
	},
	methods: {
		async submitForm(login){
			console.log(login.password);
			const response = await axios.post('login', login); // 替换成你的后端接口路径
			console.log(response)
			var data={
				admin:response.data.success,
				expiry:new Date().getTime()+86400
			}
			
			localStorage.setItem("pass", JSON.stringify(data));
			this.$router.push('/');
			
		
	}}

}




</script>
<style>
.login-wrap {
	position: relative;
	width: 100%;
	/* height: 100%; */
	background-image: url('../assets/img/login-bg.jpg');
	background-size: 100%;
}

.ms-title {
	width: 100%;
	height: 100%;
	line-height: 50px;
	text-align: center;
	font-size: 20px;
	/* color: #fff; */
	border-bottom: 1px solid #ddd;
}

.ms-login {
	/* position: absolute; */
	left: auto;
	top: auto;
	width: 350px;
	margin:auto;
	border-radius: 5px;
	background: rgba(255, 255, 255, 0.3);
	overflow: hidden;
}

.ms-content {
	padding: 30px 30px;
}

.login-btn {
	text-align: center;
}

.login-btn button {
	width: 100%;
	height: 36px;
	margin-bottom: 10px;
}

.login-tips {
	font-size: 14px;
	line-height: 30px;
	color: orange;
}
</style>
