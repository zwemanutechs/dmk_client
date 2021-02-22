import {validate} from "revalidator";

export const formValidation = formFields => {
    return validate(formFields, {
        properties: {
            paintPressureAtEsta2R11: {
                description: 'Paint Pressure At Esta2 R11',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Paint Pressure At Esta2 R11 cannot be empty.",
                    conform: "Paint Pressure At Esta2 R11 must be greater than 0.",
                    required: "Paint Pressure At Esta2 R11 cannot be empty."
                },
                conform: v => {
                    return v > 0;
                }
            },
            paintPressureAtEsta1R12: {
                description: 'Paint Pressure At Esta1 R12',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Paint Pressure At Esta1 R12 cannot be empty.",
                    conform: "Paint Pressure At Esta1 R12 must be greater than 0.",
                    required: "Paint Pressure At Esta1 R12 cannot be empty."
                },
                conform: v => {
                    return v > 0;
                }
            },
            paintPressureAtEsta1R11: {
                description: 'Paint Pressure At Esta1 R11',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Paint Pressure At Esta1 R11 cannot be empty.",
                    conform: "Paint Pressure At Esta1 R11 must be greater than 0.",
                    required: "Paint Pressure At Esta1 R11 cannot be empty."
                },
                conform: v => {
                    return v > 0;
                }
            },
            highTensionEsta2R11: {
                description: 'High Tension Esta2 R11',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "High Tension Esta2 R11 cannot be empty.",
                    conform: "High Tension Esta2 R11 must be greater than 0.",
                    required: "High Tension Esta2 R11 cannot be empty."
                },
                conform: v => {
                    return v > 0;
                }
            },
            highTensionEsta1R12: {
                description: 'High Tension Esta1 R12',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "High Tension Esta1 R12 cannot be empty.",
                    conform: "High Tension Esta1 R12 must be greater than 0.",
                    required: "High Tension Esta1 R12 cannot be empty."
                },
                conform: v => {
                    return v > 0;
                }
            },
            highTensionEsta1R11: {
                description: 'High Tension Esta1 R11',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "High Tension Esta1 R11 cannot be empty.",
                    conform: "High Tension Esta1 R11 must be greater than 0.",
                    required: "High Tension Esta1 R11 cannot be empty."
                },
                conform: v => {
                    return v > 0;
                }
            },
            touchUpRoom1AirFlow: {
                description: 'Touch Up Room1 Air Flow',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Touch Up Room1 Air Flow cannot be empty.",
                    conform: "Touch Up Room1 Air Flow must be greater than 0.",
                    required: "Touch Up Room1 Air Flow cannot be empty."
                },
                conform: v => {
                    return v > 0;
                }
            },
            touchUpRoom2AirFlow: {
                description: 'Touch Up Room2 Air Flow',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Touch Up Room2 Air Flow cannot be empty.",
                    conform: "Touch Up Room2 Air Flow must be greater than 0.",
                    required: "Touch Up Room2 Air Flow cannot be empty."
                },
                conform: v => {
                    return v > 0;
                }
            },
        }
    }, { cast: true});
};
