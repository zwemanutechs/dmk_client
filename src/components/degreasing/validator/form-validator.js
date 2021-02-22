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
                    return v > 0;
                }
            },
            concentrationTopUp: {
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
            },
            waterSupplyFromTank2: {
                description: 'Water Supply From Tank 2',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Water Supply From Tank 2 cannot be empty.",
                    conform: "Water Supply From Tank 2 must be greater than 0.",
                    required: "Water Supply From Tank 2 cannot be empty."
                },
                conform: v => {
                    return v > 0;
                }
            },
            oilSkimming: {
                description: 'Oil Skimming',
                type: 'boolean',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Oil Skimming cannot be empty.",
                    conform: "Oil Skimming must be greater than 0.",
                    required: "Oil Skimming cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            dyneTest: {
                description: 'Dyne Test',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Dyne Test cannot be empty.",
                    conform: "Dyne Test must be greater than 0.",
                    required: "Dyne Test cannot be empty."
                },
                conform: v => {
                    return v > 0;
                }
            },
        }
    }, { cast: true});
};
