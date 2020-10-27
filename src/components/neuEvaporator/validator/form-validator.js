import {validate} from "revalidator";

export const formValidation = formFields => {
    return validate(formFields, {
        properties: {
            phTank6: {
                description: 'pH Tank6',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "pH Tank6 cannot be empty.",
                    conform: "pH Tank6 must be greater than 0.",
                    required: "pH Tank6 cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            feedRateEvaporatorTank3: {
                description: 'Feed Rate Evaporator Tank3',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Feed Rate Evaporator Tank3 cannot be empty.",
                    conform: "Feed Rate Evaporator Tank3 must be greater than 0.",
                    required: "Feed Rate Evaporator Tank3 cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            phTank3: {
                description: 'pH Tank3',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "pH Tank3 cannot be empty.",
                    conform: "pH Tank3 must be greater than 0.",
                    required: "pH Tank3 cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            phHmiTank3: {
                description: 'pH HMI Tank3',
                type: 'string',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "pH HMI Tank3 cannot be empty.",
                    conform: "pH HMI Tank3 must be greater than 0.",
                    required: "pH HMI Tank3 cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            waterSampleInBottleTank6: {
                description: 'Water Sample In Bottle Tank6',
                type: 'boolean',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Water Sample In Bottle Tank6 cannot be empty.",
                    conform: "Water Sample In Bottle Tank6 cannot be empty.",
                    required: "Water Sample In Bottle Tank6 cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            monthlyCalibrationOfPhMeterTank3: {
                description: 'Monthly Calibration Of Ph Meter Tank3',
                type: 'boolean',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Monthly Calibration Of Ph Meter Tank3 cannot be empty.",
                    conform: "Monthly Calibration Of Ph Meter Tank3 cannot be empty.",
                    required: "Monthly Calibration Of Ph Meter Tank3 cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            conductivity: {
                description: 'Conductivity',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Conductivity cannot be empty.",
                    conform: "Conductivity cannot be empty.",
                    required: "Conductivity cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            waterLevelTank6: {
                description: 'Water Level Tank6',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Water Level Tank6 cannot be empty.",
                    conform: "Water Level Tank6 cannot be empty.",
                    required: "Water Level Tank6 cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            flowRateTank6: {
                description: 'Flow Rate Tank6',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Flow Rate Tank6 cannot be empty.",
                    conform: "Flow Rate Tank6 cannot be empty.",
                    required: "Flow Rate Tank6 cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            waterQualityTank7: {
                description: 'Water Quality Tank7',
                type: 'boolean',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Water Quality Tank7 cannot be empty.",
                    conform: "Water Quality Tank7 cannot be empty.",
                    required: "Water Quality Tank7 cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            waterLevelTank7: {
                description: 'Water Level Tank7',
                type: 'string',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Water Level Tank7 cannot be empty.",
                    conform: "Water Level Tank7 cannot be empty.",
                    required: "Water Level Tank7 cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            waterLevelLitreTank8: {
                description: 'Water Level Litre Tank8',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Water Level Litre Tank8 cannot be empty.",
                    conform: "Water Level Litre Tank8 cannot be empty.",
                    required: "Water Level Litre Tank8 cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            anyAbnormalUsageTank8: {
                description: 'Any Abnormal Usage Tank8',
                type: 'boolean',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Any Abnormal Usage Tank8 cannot be empty.",
                    conform: "Any Abnormal Usage Tank8 cannot be empty.",
                    required: "Any Abnormal Usage Tank8 cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            waterLevelTank9: {
                description: 'Water Level Tank9',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Water Level Tank9 cannot be empty.",
                    conform: "Water Level Tank9 cannot be empty.",
                    required: "Water Level Tank9 cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            anyAbnormalUsageTank9: {
                description: 'Any Abnormal Usage Tank9',
                type: 'boolean',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Any Abnormal Usage Tank9 cannot be empty.",
                    conform: "Any Abnormal Usage Tank9 cannot be empty.",
                    required: "Any Abnormal Usage Tank9 cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            }
        }
    }, { cast: true});
};
