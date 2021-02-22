import {validate} from "revalidator";

export const formValidation = formFields => {
    return validate(formFields, {
        properties: {
            ph: {
                description: 'Ph Meter',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Ph Meter cannot be empty.",
                    conform: "Ph Meter must be greater than 0.",
                    required: "Ph Meter cannot be empty."
                },
                conform: v => {
                    return v > 0;
                }
            },
            waterSupplyFromTank4: {
                description: 'Water Supply From Tank 4',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Tank 4 Water Supply cannot be empty..",
                    conform:"Tank 4 Water Supply cannot be empty..",
                    required: "Tank 4 Water Supply cannot be empty..",
                },
                conform: v => {
                    return v > 0;
                }
            }
        }
    }, { cast: true});
};
