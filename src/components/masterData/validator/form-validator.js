import {validate} from "revalidator";

export const formValidation = formFields => {
    return validate(formFields, {
        properties: {
            number: {
                description: 'number',
                type: 'string',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Number cannot be empty.",
                    conform: "Number cannot be empty.",
                    required: "Number cannot be empty."
                },
                conform: v => {
                    return v !== '';
                }
            },            
            description: {
                description: 'description',
                type: 'string',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Description cannot be empty.",
                    conform: "Description cannot be empty.",
                    required: "Description cannot be empty."
                },
                conform: v => {
                    return v !== '';
                }
            },
            type: {
                description: 'type',
                type: 'string',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Type cannot be empty.",
                    conform: "Type cannot be empty.",
                    required: "Type cannot be empty."
                },
                conform: v => {
                    return v !== '';
                }
            },     
        }
    }, { cast: true});
};
