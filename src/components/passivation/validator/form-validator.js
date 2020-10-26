import {validate} from "revalidator";

export const formValidation = formFields => {
    return validate(formFields, {
        properties: {
            concentration: {
                description: 'Concentration',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Concentration cannot be empty.",
                    conform: "Concentration must be greater than 0.",
                    required: "Concentration cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            concentrationBelowTopUp: {
                description: 'Concentration Below 0.5% Top-up Chemical',
                type: 'boolean',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Concentration Below 0.5% Top-up Chemical cannot be empty..",
                    conform:"Concentration Below 0.5% Top-up Chemical cannot be empty..",
                    required: "Concentration Below 0.5% Top-up Chemical cannot be empty..",
                },
                conform: v => {
                    return v !== 0;
                }
            }
        }
    }, { cast: true});
};
