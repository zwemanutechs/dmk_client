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
            waterOverflowToWasteWaterTank1: {
                description: 'Water Overflow To WasteWater Tank1',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Waste Water cannot be empty.",
                    conform: "Waste Water must be greater than 0.",
                    required: "Waste Water cannot be empty."
                },
                conform: v => {
                    return v > 0;
                }
            },
            waterSupplyFromTank3: {
                description: 'Water supply from Tank 3 ',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Tank 3 Water Supply cannot be empty.",
                    conform: "Tank 3 Water Supply must be greater than 0.",
                    required: "Tank 3 Water Supply cannot be empty."
                },
                conform: v => {
                    return v > 0;
                }
            },
            waterSupplyFromTank6: {
                description: 'Water supply from Tank 6 ',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Tank 6 Water Supply cannot be empty.",
                    conform: "Tank 6 Water Supply must be greater than 0.",
                    required: "Tank 6 Water Supply cannot be empty."
                },
                conform: v => {
                    return v > 0;
                }
            },
        }
    }, { cast: true});
};
