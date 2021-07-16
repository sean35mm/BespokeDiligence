import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import '../../styles/Register.scss';

// import axios from 'axios';

const Register = ({ setAlert, register, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	});

	const { name, email, password, password2 } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== password2) {
			setAlert('Passwords do not match', 'danger');
		} else {
			register({ name, email, password });
		}
	};

	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<section className='signup'>
			<h1 className='signup__title'>Sign Up</h1>
			<p className='signup__title--header'>
				<i className='fas fa-user'></i> Create Your Account
			</p>
			<form className='form' onSubmit={(e) => onSubmit(e)}>
				<div className='signup__form-group'>
					<input
						type='text'
						placeholder='Name'
						name='name'
						value={name}
						onChange={(e) => onChange(e)}
						// required
					/>
				</div>
				<div className='signup__form-group'>
					<input
						type='email'
						placeholder='Email Address'
						name='email'
						// required
						value={email}
						onChange={(e) => onChange(e)}
					/>
					<small className='form-text'>
						This site uses Gravatar, so if you want a profile image, use a Gravatar email
					</small>
				</div>
				<div className='signup__form-group'>
					<input
						type='password'
						placeholder='Password'
						minLength='6'
						// required
						value={password}
						name='password'
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className='signup__form-group'>
					<input
						type='password'
						placeholder='Confirm Password'
						minLength='6'
						// required
						value={password2}
						name='password2'
						onChange={(e) => onChange(e)}
					/>
				</div>
				<input type='submit' value='Register' className='signup__btn' />
			</form>
			<p className='signup__link'>
				Already have an account? <Link href='/login'>Sign In</Link>
			</p>
		</section>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
