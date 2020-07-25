const annotation_group_schema = require("./annotation_group.json");
const annotation_task_schema = require("./annotation_task.json");
const collector_schema = require("./collector.json");
const condition_schema = require("./condition.json");
const constraint_schema = require("./constraint.json");
const context_schema = require("./context.json");
const exam_question_schema = require("./exam_question.json");
const exam_schema = require("./exam.json");
const id_field_schema = require("./id_field.json");
const tutorial_schame = require("./tutorial.json");

const Validator = require('jsonschema').Validator;

class JsonValidator{
    constructor() {
        this.v = new Validator();
        this.v.addSchema(annotation_group_schema, annotation_group_schema.$id);
        this.v.addSchema(annotation_task_schema, annotation_task_schema.$id);
        this.v.addSchema(collector_schema, collector_schema.$id);
        this.v.addSchema(condition_schema, condition_schema.$id);
        this.v.addSchema(constraint_schema, constraint_schema.$id);
        this.v.addSchema(context_schema, context_schema.$id);
        this.v.addSchema(exam_question_schema, exam_question_schema.$id);
        this.v.addSchema(exam_schema, exam_schema.$id);
        this.v.addSchema(id_field_schema, id_field_schema.$id);
        this.v.addSchema(tutorial_schame, tutorial_schame.$id);

    }

    validate_tutorial(value){
        return this.v.validate(value, tutorial_schame.$id);
    }

    validate_exam(value){
        return this.v.validate(value, exam_schema.$id);
    }

    validate_annotation_task(value){
        return this.v.validate(value, annotation_task_schema.$id);
    }

    validate_name(value){
        return this.v.validate(value, id_field_schema.$id);
    }
}

module.exports = {
    JsonValidator
};