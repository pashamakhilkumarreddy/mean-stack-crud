const router = require('express').Router();
const { employeeController } = require('../controllers');

router.get('/:id', employeeController.getEmployee);

router.get('/', employeeController.getEmployees);

router.post('/', employeeController.addEmployee);

router.put('/:id', employeeController.updateEmployee);

router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
