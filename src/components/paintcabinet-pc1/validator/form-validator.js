import {validate} from "revalidator";

export const formValidation = formFields => {
    return validate(formFields, {
        properties: {
            primerCabinet1DiWaterCheck: {
                description: 'Primer Cabinet1 Di Water Check',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Primer Cabinet1 Di Water Check cannot be empty.",
                    conform: "Primer Cabinet1 Di Water Check must be greater than 0.",
                    required: "Primer Cabinet1 Di Water Check cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            primerCabinet1BlackPrimerInletTank2: {
                description: 'Primer Cabinet1 Black Primer Inlet Tank2',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Primer Cabinet1 Black Primer Inlet Tank2 cannot be empty.",
                    conform: "Primer Cabinet1 Black Primer Inlet Tank2 must be greater than 0.",
                    required: "Primer Cabinet1 Black Primer Inlet Tank2 cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            primerCabinet1BlackPrimerOutletTank2: {
                description: 'Primer Cabinet1 Black Primer Outlet Tank2',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Primer Cabinet1 Black Primer Outlet Tank2 cannot be empty.",
                    conform: "Primer Cabinet1 Black Primer Outlet Tank2 must be greater than 0.",
                    required: "Primer Cabinet1 Black Primer Outlet Tank2 cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            primerCabinet1PaintTestViscosity: {
                description: 'Primer Cabinet1 Paint Test Viscosity',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Primer Cabinet1 Paint Test Viscosity cannot be empty.",
                    conform: "Primer Cabinet1 Paint Test Viscosity must be greater than 0.",
                    required: "Primer Cabinet1 Paint Test Viscosity cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            primerCabinet1R11Temperature: {
                description: 'Primer Cabinet1 R11 Temperature',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Primer Cabinet1 R11 Temperature cannot be empty.",
                    conform: "Primer Cabinet1 R11 Temperature must be greater than 0.",
                    required: "Primer Cabinet1 R11 Temperature cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            primerCabinet1R11Humidity: {
                description: 'Primer Cabinet1 R11 Humidity',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Primer Cabinet1 R11 Humidity cannot be empty.",
                    conform: "Primer Cabinet1 R11 Humidity must be greater than 0.",
                    required: "Primer Cabinet1 R11 Humidity cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            primerCabinet1HardenerPressureTank3: {
                description: 'Primer Cabinet1 Hardener Pressure Tank3',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Primer Cabinet1 Hardener Pressure Tank3 cannot be empty.",
                    conform: "Primer Cabinet1 Hardener Pressure Tank3 must be greater than 0.",
                    required: "Primer Cabinet1 Hardener Pressure Tank3 cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            primerCabinet1HardenerTank3: {
                description: 'Primer Cabinet1 Hardener Tank3',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Primer Cabinet1 Hardener Tank3 cannot be empty.",
                    conform: "Primer Cabinet1 Hardener Tank3 must be greater than 0.",
                    required: "Primer Cabinet1 Hardener Tank3 cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            primerCabinet1UndonLightInspection: {
                description: 'Primer Cabinet1 Undon Light Inspection',
                type: 'boolean',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Primer Cabinet1 Undon Light Inspection cannot be empty.",
                    conform: "Primer Cabinet1 Undon Light Inspection must be greater than 0.",
                    required: "Primer Cabinet1 Undon Light Inspection cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            primerCabinet1PaintTestTemperature: {
                description: 'Primer Cabinet1 Paint Test Temperature',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Primer Cabinet1 Paint Test Temperature cannot be empty.",
                    conform: "Primer Cabinet1 Paint Test Temperature must be greater than 0.",
                    required: "Primer Cabinet1 Paint Test Temperature cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            primerCabinet1WhitePrimerInletTank1: {
                description: 'Primer Cabinet1 White Primer Inlet Tank1',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Primer Cabinet1 White Primer Inlet Tank1 cannot be empty.",
                    conform: "Primer Cabinet1 White Primer Inlet Tank1 must be greater than 0.",
                    required: "Primer Cabinet1 White Primer Inlet Tank1 cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            primerCabinet1WhitePrimerOutletTank1: {
                description: 'Primer Cabinet1 White Primer Outlet Tank1',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Primer Cabinet1 White Primer Outlet Tank1 cannot be empty.",
                    conform: "Primer Cabinet1 White Primer Outlet Tank1 must be greater than 0.",
                    required: "Primer Cabinet1 White Primer Outlet Tank1 cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
        }
    }, { cast: true});
};
