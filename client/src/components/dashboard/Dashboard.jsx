import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { DashboardActions } from './DashboardActions';

import Experience from './Experience';
import Education from './Education';

import '../../styles/Dashboard.scss';

const Dashboard = ({
	getCurrentProfile,
	deleteAccount,
	auth: { user },
	profile: { profile, loading }
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	return loading && profile === null ? (
		<Spinner />
	) : (
		<section className='dashboard'>
			<h1 className='dashboard__title'>Dashboard</h1>
			<p className='dashboard__title--header'>
				<i className='fas fa-user'></i> Welcome {user && user.name}
			</p>
			{profile !== null ? (
				<div className='dashboard__main'>
					<DashboardActions />
					<Experience experience={profile.experience} />
					<Education education={profile.education} />

					<div className='dashboard__bottom'>
						<button className='dashboard__btn' onClick={() => deleteAccount()}>
							<i className='fas fa-user-minus' /> Delete My Account
						</button>
					</div>
				</div>
			) : (
				<section className='dashboard__main2'>
					<p className='dashboard__main2--text'>
						You have not yet setup a profile, please add some information.
					</p>
					<Link className='dashboard__btn2' to='/create-profile'>
						Create Profile
					</Link>
				</section>
			)}
		</section>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
