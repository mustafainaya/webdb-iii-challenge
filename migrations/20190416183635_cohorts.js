//what changes are to be applied to DB
exports.up = function(knex, Promise) {
	return knex.schema.createTable('cohorts', function(table) {
		table.increments();
		table.string('name', 128).notNullable().unique();
		table.timestamps(true, true);
	});
};

//how can I undo the changes
exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('cohorts');
};
