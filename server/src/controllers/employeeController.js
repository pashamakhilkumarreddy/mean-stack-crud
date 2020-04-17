const {
  ObjectId,
} = require('mongoose').Types;

const {
  Employee,
} = require('../models');

module.exports = {
  getEmployees(req, res) {
    Employee.find((err, docs) => {
      if (!err) {
        return res.status(200).send({
          error: false,
          data: docs,
        });
      }
      return res.status(500).send({
        error: true,
        message: 'Internal server error',
      });
    });
  },
  addEmployee(req, res) {
    const {
      name,
      position,
      office,
      salary,
    } = req.body;
    if (name && position && office && salary) {
      const newEmployee = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
      });
      newEmployee.save((err, doc) => {
        if (!err) {
          res.status(200).send({
            error: false,
            message: 'Successfully added a new employee',
            data: doc,
          });
          return;
        }
        res.status(500).send({
          error: true,
          message: 'Internal server error',
        });
      });
    } else {
      res.status(400).send({
        error: true,
        message: 'Please enter name, position, office and salary',
      });
    }
  },
  getEmployee(req, res) {
    const {
      id,
    } = req.params;
    if (!ObjectId.isValid(id)) {
      res.status(400).send({
        error: true,
        message: `No record found with the given id: ${id}`,
      });
      return;
    }
    Employee.findById(id, (err, doc) => {
      if (!err) {
        res.status(200).send({
          error: false,
          data: doc,
        });
      } else {
        res.status(500).send({
          error: true,
          message: 'Internal server error',
        });
      }
    });
  },
  updateEmployee(req, res) {
    const {
      id,
    } = req.params;
    if (!ObjectId.isValid(id)) {
      res.status(400).send({
        error: false,
        message: `No record found with the given id: ${id}`,
      });
      return;
    }
    const {
      name,
      position,
      office,
      salary,
    } = req.body;
    const emp = {
      name,
      position,
      office,
      salary,
    };
    if (name && position && office && salary) {
      Employee.findByIdAndUpdate(id, {
        $set: emp,
      }, {
        new: true,
      }, (err, doc) => {
        if (!err && doc) {
          res.status(200).send({
            error: false,
            message: `Successfully updated the employee ${doc}`,
          });
        } else {
          res.status(500).send({
            error: true,
            message: 'Internal server error',
          });
        }
      });
    }
  },
  deleteEmployee(req, res) {
    const {
      id,
    } = req.params;
    if (!ObjectId.isValid(id)) {
      res.status(400).send({
        error: true,
        message: `No record found with the given ${id}`,
      });
      return;
    }
    Employee.findByIdAndDelete(id, (err, doc) => {
      if (!err && doc) {
        res.status(200).send({
          error: false,
          message: `Successfully deleted the employee ${doc}`,
        });
      } else {
        res.status(500).send({
          error: true,
          message: 'Internal server error',
        });
      }
    });
  },
};
