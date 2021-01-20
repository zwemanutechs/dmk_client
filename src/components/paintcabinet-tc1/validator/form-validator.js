import {validate} from "revalidator";

export const formValidation = formFields => {
    return validate(formFields, {
        properties: {
            topCabinet1CabinetTemperature: {
                description: 'Top Cabinet1 Cabinet Temperature',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Top Cabinet1 Cabinet Temperature cannot be empty.",
                    conform: "Top Cabinet1 Cabinet Temperature must be greater than 0.",
                    required: "Top Cabinet1 Cabinet Temperature cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            topCabinet1CabinetHumidity: {
                description: 'Top Cabinet1 Cabinet Humidity',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Top Cabinet1 Cabinet Humidity cannot be empty.",
                    conform: "Top Cabinet1 Cabinet Humidity must be greater than 0.",
                    required: "Top Cabinet1 Cabinet Humidity cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            topCabinet1CabinetTestVisocity: {
                description: 'Top Cabinet1 Paint Test Visocity',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Top Cabinet1 Paint Test Visocity cannot be empty.",
                    conform: "Top Cabinet1 Paint Test Visocity must be greater than 0.",
                    required: "Top Cabinet1 Paint Test Visocity cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            topCabinet1CabinetTestTemperature: {
                description: 'Top Cabinet1 Paint Test Visocity',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Top Cabinet1 Paint Test Visocity cannot be empty.",
                    conform: "Top Cabinet1 Paint Test Visocity must be greater than 0.",
                    required: "Top Cabinet1 Paint Test Visocity cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            topCabinet1CabinetDiWaterCheck: {
                description: 'Top Cabinet1 DI Water Check',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Top Cabinet1 DI Water Check cannot be empty.",
                    conform: "Top Cabinet1 DI Water Check must be greater than 0.",
                    required: "Top Cabinet1 DI Water Check cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            topCabinet1CabinetAndonLightInspection: {
                description: 'Top Cabinet1 Andon Light Inspection',
                type: 'boolean',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Top Cabinet1 Andon Light Inspection cannot be empty.",
                    conform: "Top Cabinet1 Andon Light Inspection must be greater than 0.",
                    required: "Top Cabinet1 Andon Light Inspection cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            topCabinet1CabinetP600InletTank1: {
                description: 'Top Cabinet1 P600 Inlet Tank1',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Top Cabinet1 P600 Inlet Tank1 cannot be empty.",
                    conform: "Top Cabinet1 P600 Inlet Tank1 must be greater than 0.",
                    required: "Top Cabinet1 P600 Inlet Tank1 cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            topCabinet1CabinetP600OutletTank1: {
                description: 'Top Cabinet1 P600 Outlet Tank1',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Top Cabinet1 P600 Outlet Tank1 cannot be empty.",
                    conform: "Top Cabinet1 P600 Outlet Tank1 must be greater than 0.",
                    required: "Top Cabinet1 P600 Outlet Tank1 cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            topCabinet1CabinetP190InletTank2: {
                description: 'Top Cabinet1 P190 Inlet Tank2',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Top Cabinet1 P190 Inlet Tank2 cannot be empty.",
                    conform: "Top Cabinet1 P190 Inlet Tank2 must be greater than 0.",
                    required: "Top Cabinet1 P190 Inlet Tank2 cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            topCabinet1CabinetP190OutletTank2: {
                description: 'Top Cabinet1 P190 Outlet Tank2',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Top Cabinet1 P190 Outlet Tank2 cannot be empty.",
                    conform: "Top Cabinet1 P190 Outlet Tank2 must be greater than 0.",
                    required: "Top Cabinet1 P190 Outlet Tank2 cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            topCabinet1CabinetP100InletTank3: {
                description: 'Top Cabinet1 P100 Inlet Tank3',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Top Cabinet1 P100 Inlet Tank3 cannot be empty.",
                    conform: "Top Cabinet1 P100 Inlet Tank3 must be greater than 0.",
                    required: "Top Cabinet1 P100 Inlet Tank3 cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            topCabinet1CabinetP100OutletTank3: {
                description: 'Top Cabinet1 P100 Outlet Tank3',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Top Cabinet1 P100 Outlet Tank3 cannot be empty.",
                    conform: "Top Cabinet1 P100 Outlet Tank3 must be greater than 0.",
                    required: "Top Cabinet1 P100 Outlet Tank3 cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            topCabinet1CabinetP020InletTank4: {
                description: 'Top Cabinet1 P020 Inlet Tank4',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Top Cabinet1 P020 Inlet Tank4 cannot be empty.",
                    conform: "Top Cabinet1 P020 Inlet Tank4 must be greater than 0.",
                    required: "Top Cabinet1 P020 Inlet Tank4 cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            topCabinet1CabinetP020OutletTank2: {
                description: 'Top Cabinet1 P020 Outlet Tank2',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Top Cabinet1 P020 Outlet Tank2 cannot be empty.",
                    conform: "Top Cabinet1 P020 Outlet Tank2 must be greater than 0.",
                    required: "Top Cabinet1 P020 Outlet Tank2 cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
        }
    }, { cast: true});
};
