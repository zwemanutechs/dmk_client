import {validate} from "revalidator";

export const formValidation = formFields => {
    return validate(formFields, {
        properties: {
            topCabinet2HardenerPressureTank3: {
                description: 'Top Cabinet2 Hardener Pressure Tank3',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Top Cabinet2 Hardener Pressure Tank3 cannot be empty.",
                    conform: "Top Cabinet2 Hardener Pressure Tank3 must be greater than 0.",
                    required: "Top Cabinet2 Hardener Pressure Tank3 cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            topCabinet2HardenerTank3: {
                description: 'Top Cabinet2 Hardener Tank3',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Top Cabinet2 Hardener Tank3 cannot be empty.",
                    conform: "Top Cabinet2 Hardener Tank3 must be greater than 0.",
                    required: "Top Cabinet2 Hardener Tank3 cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            topCabinet2DiWaterCheck: {
                description: 'Top Cabinet2 Di Water Check',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Top Cabinet2 Di Water Check cannot be empty.",
                    conform: "Top Cabinet2 Di Water Check must be greater than 0.",
                    required: "Top Cabinet2 Di Water Check cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            topCabinet2CabinetTemperture: {
                description: 'Top Cabinet2 Cabinet Temperature',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Top Cabinet2 Cabinet Temperature cannot be empty.",
                    conform: "Top Cabinet2 Cabinet Temperature must be greater than 0.",
                    required: "Top Cabinet2 Cabinet Temperature cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            topCabinet2CabinetHumidity: {
                description: 'Top Cabinet2 Cabinet Humidity',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Top Cabinet2 Cabinet Humidity cannot be empty.",
                    conform: "Top Cabinet2 Cabinet Humidity must be greater than 0.",
                    required: "Top Cabinet2 Cabinet Humidity cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            topCabinet2PaintTestVisocity: {
                description: 'Top Cabinet2 Paint Test Visocity',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Top Cabinet2 Paint Test Visocity cannot be empty.",
                    conform: "Top Cabinet2 Paint Test Visocity must be greater than 0.",
                    required: "Top Cabinet2 Paint Test Visocity cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            topCabinet2PaintTestTemperature: {
                description: 'Top Cabinet2 Paint Test Temperature',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Top Cabinet2 Paint Test Temperature cannot be empty.",
                    conform: "Top Cabinet2 Paint Test Temperature must be greater than 0.",
                    required: "Top Cabinet2 Paint Test Temperature cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            topCabinet2AndonLightInspection: {
                description: 'Top Cabinet2 Andon Light Inspection',
                type: 'boolean',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Top Cabinet2 Andon Light Inspection cannot be empty.",
                    conform: "Top Cabinet2 Andon Light Inspection must be greater than 0.",
                    required: "Top Cabinet2 Andon Light Inspection cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            }
        }
    }, { cast: true});
};
