exports.up = function(knex, Promise) {
	return knex.schema.createTable('strudents', function(table) {
		table.increments();
		table.string('name', 128).notNullable().unique();

		table.integer('cohort_id').references('id').inTable('cohorts').onDelete('CASCADE').onUpdate('CASCADE');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('students');
};
