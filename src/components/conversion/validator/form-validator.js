import {validate} from "revalidator";

export const formValidation = formFields => {
    return validate(formFields, {
        properties: {
            waterSupplyFromDiTank: {
                description: 'Water Supply From Di Tank',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Water Supply From Di Tank cannot be empty.",
                    conform: "Water Supply From Di Tank must be greater than 0.",
                    required: "Water Supply From Di Tank cannot be empty."
                },
                conform: v => {
                    return v > 0;
                }
            }
        }
    }, { cast: true});
};
