import {validate} from "revalidator";

export const formValidation = formFields => {
    return validate(formFields, {
        properties: {
            primerCabinet2UndonLightInspection: {
                description: 'Primer Cabinet2 Undon Light Inspection',
                type: 'boolean',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Primer Cabinet2 Undon Light Inspection cannot be empty.",
                    conform: "Primer Cabinet2 Undon Light Inspection must be greater than 0.",
                    required: "Primer Cabinet2 Undon Light Inspection cannot be empty."
                },
                conform: v => {
                    return v !== 0;
                }
            },
            primerCabinet2R12Temperture: {
                description: 'Primer Cabinet2 R12 Temperature',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Primer Cabinet2 R12 Temperature cannot be empty.",
                    conform: "Primer Cabinet2 R12 Temperature must be greater than 0.",
                    required: "Primer Cabinet2 R12 Temperature cannot be empty."
                },
                conform: v => {
                    return v > 0;
                }
            },
            primerCabinet2HardenerTank3: {
                description: 'Primer Cabinet2 Hardener Tank3',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Primer Cabinet2 Hardener Tank3 cannot be empty.",
                    conform: "Primer Cabinet2 Hardener Tank3 must be greater than 0.",
                    required: "Primer Cabinet2 Hardener Tank3 cannot be empty."
                },
                conform: v => {
                    return v > 0;
                }
            },
            primerCabinet2PaintTestTemperature: {
                description: 'Primer Cabinet2 Paint Test Temperature',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Primer Cabinet2 Paint Test Temperature cannot be empty.",
                    conform: "Primer Cabinet2 Paint Test Temperature must be greater than 0.",
                    required: "Primer Cabinet2 Paint Test Temperature cannot be empty."
                },
                conform: v => {
                    return v > 0;
                }
            },
            primerCabinet2BlackPrimerInletTank2: {
                description: 'Primer Cabinet2 Black Primer Inlet Tank2',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Primer Cabinet2 Black Primer Inlet Tank2 cannot be empty.",
                    conform: "Primer Cabinet2 Black Primer Inlet Tank2 must be greater than 0.",
                    required: "Primer Cabinet2 Black Primer Inlet Tank2 cannot be empty."
                },
                conform: v => {
                    return v > 0;
                }
            },
            primerCabinet2BlackPrimerOutletTank2: {
                description: 'Primer Cabinet2 Black Primer Outlet Tank2',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Primer Cabinet2 Black Primer Outlet Tank2 cannot be empty.",
                    conform: "Primer Cabinet2 Black Primer Outlet Tank2 must be greater than 0.",
                    required: "Primer Cabinet2 Black Primer Outlet Tank2 cannot be empty."
                },
                conform: v => {
                    return v > 0;
                }
            },
            primerCabinet2PaintTestViscosity: {
                description: 'Primer Cabinet2 Paint Test Viscosity',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Primer Cabinet2 Paint Test Viscosity cannot be empty.",
                    conform: "Primer Cabinet2 Paint Test Viscosity must be greater than 0.",
                    required: "Primer Cabinet2 Paint Test Viscosity cannot be empty."
                },
                conform: v => {
                    return v > 0;
                }
            },
            primerCabinet2WhitePrimerInletTank1: {
                description: 'Primer Cabinet2 White Primer Inlet Tank1',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Primer Cabinet2 White Primer Inlet Tank1 cannot be empty.",
                    conform: "Primer Cabinet2 White Primer Inlet Tank1 must be greater than 0.",
                    required: "Primer Cabinet2 White Primer Inlet Tank1 cannot be empty."
                },
                conform: v => {
                    return v > 0;
                }
            },
            primerCabinet2WhitePrimerOutletTank1: {
                description: 'Primer Cabinet2 White Primer Outlet Tank1',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Primer Cabinet2 White Primer Outlet Tank1 cannot be empty.",
                    conform: "Primer Cabinet2 White Primer Outlet Tank1 must be greater than 0.",
                    required: "Primer Cabinet2 White Primer Outlet Tank1 cannot be empty."
                },
                conform: v => {
                    return v > 0;
                }
            },
            primerCabinet2DiWaterCheck: {
                description: 'Primer Cabinet2 Di Water Check',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Primer Cabinet2 Di Water Check cannot be empty.",
                    conform: "Primer Cabinet2 Di Water Check must be greater than 0.",
                    required: "Primer Cabinet2 Di Water Check cannot be empty."
                },
                conform: v => {
                    return v > 0;
                }
            },
            primerCabinet2HardenerPressureTank3: {
                description: 'Primer Cabinet2 Hardener Pressure Tank3',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Primer Cabinet2 Hardener Pressure Tank3 cannot be empty.",
                    conform: "Primer Cabinet2 Hardener Pressure Tank3 must be greater than 0.",
                    required: "Primer Cabinet2 Hardener Pressure Tank3 cannot be empty."
                },
                conform: v => {
                    return v > 0;
                }
            },
            primerCabinet2R12Humidity: {
                description: 'Primer Cabinet2 R12 Humidity',
                type: 'number',
                required: true,
                allowEmpty: false,
                messages: {
                    allowEmpty: "Primer Cabinet2 R12 Humidity cannot be empty.",
                    conform: "Primer Cabinet2 R12 Humidity must be greater than 0.",
                    required: "Primer Cabinet2 R12 Humidity cannot be empty."
                },
                conform: v => {
                    return v > 0;
                }
            }
        }
    }, { cast: true});
};
