import React from 'react';
import { Link } from 'react-router-dom';

export const DashboardActions = () => {
	return (
		<div className='dashboard__buttons'>
			<Link to='/edit-profile' className='dashboard__btn'>
				<i className='fas fa-user-circle text-primary'></i> Edit Profile
			</Link>
			<Link to='/add-experience' className='dashboard__btn'>
				<i className='fab fa-black-tie text-primary'></i> Add Experience
			</Link>
			<Link to='/add-education' className='dashboard__btn'>
				<i className='fas fa-graduation-cap text-primary'></i> Add Education
			</Link>
		</div>
	);
};
