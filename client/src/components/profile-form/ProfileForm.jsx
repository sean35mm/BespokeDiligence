import React, { Fragment, useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const initialState = {
	company: '',
	website: '',
	location: '',
	status: '',
	skills: '',
	bio: '',
	twitter: '',
	facebook: '',
	linkedin: '',
	instagram: ''
};

const ProfileForm = ({
	profile: { profile, loading },
	createProfile,
	getCurrentProfile,
	history
}) => {
	const [formData, setFormData] = useState(initialState);

	const creatingProfile = useRouteMatch('/create-profile');

	const [displaySocialInputs, toggleSocialInputs] = useState(false);

	useEffect(() => {
		if (!profile) getCurrentProfile();
		if (!loading && profile) {
			const profileData = { ...initialState };
			for (const key in profile) {
				if (key in profileData) profileData[key] = profile[key];
			}
			for (const key in profile.social) {
				if (key in profileData) profileData[key] = profile.social[key];
			}
			if (Array.isArray(profileData.skills)) profileData.skills = profileData.skills.join(', ');
			setFormData(profileData);
		}
	}, [loading, getCurrentProfile, profile]);

	const {
		company,
		website,
		location,
		status,
		skills,
		bio,
		twitter,
		facebook,
		linkedin,
		instagram
	} = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		createProfile(formData, history, profile ? true : false);
	};

	return (
		<Fragment>
			<h1 className='large text-primary'>
				{creatingProfile ? 'Create Your Profile' : 'Edit Your Profile'}
			</h1>
			<p className='lead'>
				<i className='fas fa-user' />
				{creatingProfile
					? ` Let's get some information to make your`
					: ' Add some changes to your profile'}
			</p>
			<small>* = required field</small>
			<form className='form' onSubmit={onSubmit}>
				<div className='form-group'>
					<select name='status' value={status} onChange={onChange}>
						<option>* Select Professional Status</option>
						<option value='Investigator'>Investigator</option>
						<option value='Corporate Investigator'>Corporate Investigator</option>
						<option value='Surveillance Investigator'>Surveillance Investigator</option>
						<option value='Due Diligence Investigator'>Due Diligence Investigator</option>
						<option value='Insurance Investigations'>Insurance Investigations</option>
						<option value='Background Investigator'>Civil Investigator</option>
						<option value='Fraud Investigator'>Fraud Investigator</option>
						<option value='Other'>Other</option>
					</select>
					<small className='form-text'>Give us an idea of your specification</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Company'
						name='company'
						value={company}
						onChange={onChange}
					/>
					<small className='form-text'>Could be your own company or most recent employment</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Website'
						name='website'
						value={website}
						onChange={onChange}
					/>
					<small className='form-text'>Could be your own or a company website</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Location'
						name='location'
						value={location}
						onChange={onChange}
					/>
					<small className='form-text'>City and state suggested (eg. Boston, MA)</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* Skills'
						name='skills'
						value={skills}
						onChange={onChange}
					/>
					<small className='form-text'>
						Please use comma separated values (eg. Surveillance, Corporate Investigations, Military
						Intelligence)
					</small>
				</div>
				<div className='form-group'>
					<textarea
						placeholder='A short bio of yourself'
						name='bio'
						value={bio}
						onChange={onChange}
					/>
					<small className='form-text'>Tell us a little about yourself</small>
				</div>

				<div className='my-2'>
					<button
						onClick={() => toggleSocialInputs(!displaySocialInputs)}
						type='button'
						className='btn btn-light'
					>
						Add Social Network Links
					</button>
					<span>Optional</span>
				</div>

				{displaySocialInputs && (
					<Fragment>
						<div className='form-group social-input'>
							<i className='fab fa-twitter fa-2x' />
							<input
								type='text'
								placeholder='Twitter URL'
								name='twitter'
								value={twitter}
								onChange={onChange}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-facebook fa-2x' />
							<input
								type='text'
								placeholder='Facebook URL'
								name='facebook'
								value={facebook}
								onChange={onChange}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-linkedin fa-2x' />
							<input
								type='text'
								placeholder='Linkedin URL'
								name='linkedin'
								value={linkedin}
								onChange={onChange}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-instagram fa-2x' />
							<input
								type='text'
								placeholder='Instagram URL'
								name='instagram'
								value={instagram}
								onChange={onChange}
							/>
						</div>
					</Fragment>
				)}

				<input type='submit' className='btn btn-primary my-1' />
				<Link className='btn btn-light my-1' to='/dashboard'>
					Go Back
				</Link>
			</form>
		</Fragment>
	);
};

ProfileForm.propTypes = {
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(ProfileForm);
