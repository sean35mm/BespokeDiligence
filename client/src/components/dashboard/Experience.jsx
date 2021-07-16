import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profile';
import formatDate from '../../utils/formatDate';

const Experience = ({ experience, deleteExperience }) => {
	const experiences = experience.map((exp) => (
		<tr key={exp._id}>
			<td>{exp.company}</td>
			<td className='hide-sm'>{exp.title}</td>
			<td>
				{formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : 'Now'}
			</td>
			<td>
				<button onClick={() => deleteExperience(exp._id)} className='btn btn-danger'>
					Delete
				</button>
			</td>
		</tr>
	));

	return (
		<div className='dashboard__experience'>
			<h2 className='dashboard__title'>Experience Credentials</h2>
			<table className='table'>
				<thead>
					<tr>
						<th>Company</th>
						<th className='hide-sm'>Title</th>
						<th className='hide-sm'>Years</th>
						<th />
					</tr>
				</thead>
				<tbody>{experiences}</tbody>
			</table>
		</div>
	);
};

Experience.propTypes = {
	experience: PropTypes.array.isRequired,
	deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(Experience);
