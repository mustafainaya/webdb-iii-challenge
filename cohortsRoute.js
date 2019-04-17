// const express = require('express');
// const helmet = require('helmet');
const router = require('express').Router();
const knex = require('knex');
const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

// const server = express();

// server.use(helmet());
// server.use(express.json());

router.get('/api/cohorts', async (req, res) => {
	try {
		const cohorts = await db('cohorts');
		res.status(200).json(cohorts);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.get('/api/cohorts/:id', async (req, res) => {
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

router.get('/api/cohorts/:id/students', async (req, res) => {
	try {
		const cohort = await db('cohorts')
			.select('students.id', 'students.name', 'cohorts.id as cohort')
			.from('cohorts')
			.innerJoin('students', 'cohorts.id', 'students.cohort_id')
			.where({ cohort_id: req.params.id });
		res.status(200).json(cohort);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post('/api/cohorts', async (req, res) => {
	try {
		const cohort = req.body;
		const [ id ] = await db('cohorts').insert(cohort);
		const newCohort = await db('cohorts').where({ id }).first();
		res.status(201).json(newCohort);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.put('/api/cohorts/:id', async (req, res) => {
	try {
		const cohort = req.body;
		const updateCohort = await db('cohorts').where({ id: req.params.id }).first().update(cohort);
		if (!updateCohort) {
			res.status(404).json({ message: ' not found!' });
		}
		res.status(200).json(updateCohort);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.delete('/api/cohorts/:id', async (req, res) => {
	try {
		const cohort = await db('cohorts').where({ id: req.params.id }).del();
		if (cohort > 0) {
			res.status(204).end();
		} else {
			res.status(404).json({ message: ' not found' });
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
