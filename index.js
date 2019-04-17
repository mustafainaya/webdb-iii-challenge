const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/api/cohorts', async (req, res) => {
	try {
		const cohorts = await db('cohorts');
		res.status(200).json(cohorts);
	} catch (error) {
		res.status(500).json(error);
	}
});

server.get('/api/cohorts/:id', async (req, res) => {
	try {
		const cohort = await db('cohorts').where({ id: req.params.id }).first();
		if (!cohort) {
			res.status(404).json({ message: 'id not found!' });
		}
		res.status(200).json(cohort);
	} catch (error) {
		res.status(500).json(error);
	}
});

const port = process.env.PORT || 4444;

server.listen(port, () => {
	console.log(`\n API is Up on ${port} \n`);
});
