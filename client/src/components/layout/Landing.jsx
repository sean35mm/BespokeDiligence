import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import bgVideo from '../../img/bgvid2.mp4';
import '../../styles/Landing.scss';

const Landing = ({ isAuthenticated }) => {
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<section className='landing'>
			<video id='myVideo' src={bgVideo} autoPlay muted loop></video>
			<div className='landing__container'>
				<h1 className='landing__title'>BespokeDiligence</h1>
				<p className='landing__hero'>
					"Modern Investigations. Shaping the Future of Due Diligence Services."
				</p>
				<div className='landing__buttons'>
					<Link to='/register' className='btn'>
						Sign Up
					</Link>
					<Link to='/login' className='btn2'>
						Login
					</Link>
				</div>
			</div>
		</section>
	);
};

Landing.propTypes = {
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
