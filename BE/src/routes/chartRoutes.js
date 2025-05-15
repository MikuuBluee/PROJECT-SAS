const express = require('express');
const router = express.Router();
const chartController = require('../controllers/chartController');

router.get('/:id', chartController.getChartItem);
router.post('/', chartController.addChartitem);
router.delete('/:id', chartController.deleteChartItem);

module.exports = router;