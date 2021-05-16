/*
Copyright 2018-2021 Justso GmbH, Frankfurt, Germany

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('QRounds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    })
      .then(() => queryInterface.addColumn('QRounds', 'QuestionnaireId', {type: Sequelize.INTEGER, references: {model: 'Questionnaires', key: 'id'}}))
      .then(() => queryInterface.addColumn('Assessments', 'QRoundId', {type: Sequelize.INTEGER, references: {model: 'QRounds', key: 'id'}}))
      .then(() => queryInterface.sequelize.query('SELECT count(*) from Questionnaires'))
  },
  down: queryInterface => {
    return queryInterface.removeColumn('Assessments', 'QRoundId')
      .then(() => queryInterface.dropTable('QRounds'))
  }
}
