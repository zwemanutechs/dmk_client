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
                    return v > 0;
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
                    return v > 0;
                }
            },
            topCabinet1PaintTestVisocity: {
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
                    return v > 0;
                }
            },
            topCabinet1PaintTestTemperature: {
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
                    return v > 0;
                }
            },
            topCabinet1DiWaterCheck: {
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
                    return v > 0;
                }
            },
            topCabinet1AndonLightInspection: {
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
            topCabinet1P600InletTank1: {
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
                    return v > 0;
                }
            },
            topCabinet1P600OutletTank1: {
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
                    return v > 0;
                }
            },
            topCabinet1P190InletTank2: {
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
                    return v > 0;
                }
            },
            topCabinet1P190OutletTank2: {
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
                    return v > 0;
                }
            },
            topCabinet1P100InletTank3: {
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
                    return v > 0;
                }
            },
            topCabinet1P100OutletTank3: {
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
                    return v > 0;
                }
            },
            topCabinet1P020InletTank4: {
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
                    return v > 0;
                }
            },
            topCabinet1P020OutletTank2: {
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
                    return v > 0;
                }
            },
            topCabinet2HardenerPressureTankTank3: {
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
                    return v > 0;
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
                    return v > 0;
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
                    return v > 0;
                }
            },
            topCabinet2CabinetTemperature: {
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
                    return v > 0;
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
                    return v > 0;
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
                    return v > 0;
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
                    return v > 0;
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
            },
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
                    return v > 0;
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
                    return v > 0;
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
                    return v > 0;
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
                    return v > 0;
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
                    return v > 0;
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
                    return v > 0;
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
                    return v > 0;
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
                    return v > 0;
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
                    return v > 0;
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
                    return v > 0;
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
                    return v > 0;
                }
            },
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
            primerCabinet2R12Temperature: {
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
