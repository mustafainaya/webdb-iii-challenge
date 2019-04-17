exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('students').truncate().then(function() {
		// Inserts seed entries
		return knex('students').insert([
			{ cohort_id: 1, name: 'student1' },
			{ cohort_id: 2, name: 'student2' },
			{ cohort_id: 3, name: 'student3' }
		]);
	});
};
