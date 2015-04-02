'use strict';

//todo - add scaffolds of each here (once have decided on format for each)

(function (window, document, _, undefined) {
  'use strict';

  //initial checks

  if (typeof _ == 'undefined') {
    console.error('must include lodash');
    return;
  }

  var op  = window.omniprotocol,
      ops = op.operations || (op.operations = {});

  if (window.omniprotocol.operations.transfer) {
    console.warn('already set up omniprotocol operations');
  } else {
    _.extend(ops, {
      //pipetting
      "transfer"  : {
        operation    : "transfer",
        "description": "Transfer contents from one container to another, either 1-to-n or n-to-n",
        "name"       : "Transfer",
        "scaffold"   : {
          "operation"   : "transfer",
          "requirements": {},
          "transforms"  : [
            {
              "wells": "to"
            },
            {
              "wells": "from"
            }
          ],
          "fields"      : [
            {
              "name": "volume",
              "type": "volume"
            },
            {
              "name"           : "to",
              "type"           : "aliquot+",
              "singleContainer": false
            },
            {
              "name"           : "from",
              "type"           : "aliquot+",
              "singleContainer": false
            },
            {
              "name"    : "dispense_speed",
              "type"    : "flowrate",
              "optional": true,
              "default" : "100:microliter/second"
            },
            {
              "name"    : "aspirate_speed",
              "type"    : "flowrate",
              "optional": true,
              "default" : "100:microliter/second"
            },
            {
              "name"    : "mix_before",
              "type"    : "mixwrap",
              "optional": true,
              "default" : {
                "volume"     : "10.0:microliter",
                "repetitions": 5,
                "speed"      : "100:microliter/second"
              }
            },
            {
              "name"    : "mix_after",
              "type"    : "mixwrap",
              "optional": true,
              "default" : {
                "volume"     : "10.0:microliter",
                "repetitions": 5,
                "speed"      : "100:microliter/second"
              }
            }
          ]
        }

      },
      "distribute": {
        "operation"  : "distribute",
        "description": "Distribute liquid from source well(s) to destination wells(s), either 1-to-n, n-to-1, or n-to-n",
        "name"       : "Distribute",
        "scaffold"   : {
          "operation"   : "distribute",
          "requirements": {},
          "transforms"  : [
            {
              "wells": "to"
            },
            {
              "wells": "from"
            }
          ],
          "fields"      : [
            {
              "name": "volume",
              "type": "volume"
            },
            {
              "name"           : "to",
              "type"           : "aliquot+",
              "singleContainer": false
            },
            {
              "name": "from",
              "type": "aliquot"
            },
            {
              "name"    : "dispense_speed",
              "type"    : "flowrate",
              "optional": true,
              "default" : "100:microliter/second"
            },
            {
              "name"    : "aspirate_speed",
              "type"    : "flowrate",
              "optional": true,
              "default" : "100:microliter/second"
            },
            {
              "name"    : "mix_before",
              "type"    : "mixwrap",
              "optional": true,
              "default" : {
                "volume"     : "10.0:microliter",
                "repetitions": 5,
                "speed"      : "100:microliter/second"
              }
            }
          ]
        }
      },

      "consolidate": {
        "operation"  : "consolidate",
        "description": "Consolidate contents from multiple wells into one single well.",
        "name"       : "Consolidate",
        "scaffold"   : {
          "operation"   : "consolidate",
          "requirements": {},
          "transforms"  : [
            {
              "wells": "to"
            },
            {
              "wells": "from"
            }
          ],
          "fields"      : [
            {
              "name"   : "volume",
              "type"   : "volume",
              "default": "10.0:microliter"
            },
            {
              "name": "to",
              "type": "aliquot"
            },
            {
              "name"           : "from",
              "type"           : "aliquot+",
              "singleContainer": false
            },
            {
              "name"    : "aspirate_speed",
              "type"    : "flowrate",
              "optional": true,
              "default" : "100:microliter/second"
            },
            {
              "name"    : "dispense_speed",
              "type"    : "flowrate",
              "optional": true,
              "default" : "100:microliter/second"
            },
            {
              "name"    : "mix_after",
              "type"    : "mixwrap",
              "optional": true,
              "default" : {
                "volume"     : "10.0:microliter",
                "repetitions": 5,
                "speed"      : "100:microliter/second"
              }
            }
          ]
        }
      },

      "mix"     : {
        "operation"  : "mix",
        "description": "Mix specified well using a new pipette tip",
        "name"       : "Mix",
        "scaffold"   : {
          "operation"   : "mix",
          "requirements": {},
          "transforms"  : [
            {
              "wells": "wells"
            }
          ],
          "fields"      : [
            {
              "name"           : "wells",
              "type"           : "aliquot+",
              "singleContainer": false
            },
            {
              "name"    : "volume",
              "type"    : "volume",
              "optional": true,
              "default" : "50:microliter"
            },
            {
              "name"    : "speed",
              "type"    : "flowrate",
              "optional": true,
              "default" : "100:microliter/second"
            },
            {
              "name"    : "repetitions",
              "type"    : "integer",
              "optional": true,
              "default" : 10
            }
          ]
        }
      },
      "dispense": {
        "operation"  : "dispense",
        "description": "Dispense a reagent into columns of a container",
        "name"       : "Dispense",
        "scaffold"   : {
          "operation"   : "dispense",
          "requirements": {},
          "transforms"  : [
            {
              "container": "container"
            }
          ],
          "fields"      : [
            {
              "name"   : "reagent",
              "type"   : "option",
              "options": [
                "autoclaved-water",
                "water",
                "bleach-10p",
                "ethanol-70p",
                "lb-broth-100ug-ml-amp",
                "lb-broth-50ug-ml-kan",
                "lb-broth-30ug-ml-kan",
                "lb-broth-25ug-ml-cm",
                "lb-broth-100ug-ml-specto",
                "lb-broth-50ug-ml-kan-25ug-ml-cm",
                "lb-broth-15ug-ml-tet",
                "lb-broth-noAB",
                "pbs",
                "sob",
                "soc",
                "tb-broth-100ug-ml-amp",
                "tb-broth-50ug-ml-kan",
                "te-ph7.5"
              ],
              "value"  : "lb-broth-noAB"
            },
            {
              "name"           : "columns",
              "type"           : "columnVolumes",
              "singleContainer": true
            }
          ]
        }
      },


      //heating


      "thermocycle": {
        "operation"  : "thermocycle",
        "description": "Thermocycle a container, putting through several temperature cycles, e.g. to run a PCR",
        "name"       : "Thermocycle",
        "scaffold"   : {
          "operation"   : "thermocycle",
          "requirements": {},
          "transforms"  : [
            {
              "container": "container"
            }
          ],
          "fields"      : [
            {
              "name"    : "dataref",
              "type"    : "string",
              "optional": true,
              "value"   : "thermocycle_${index}"
            },
            {
              "name": "object",
              "type": "conatiner"
            },
            {
              "name"   : "volume",
              "type"   : "volume",
              "default": "10:microliter"
            },
            {
              "name": "steps",
              "type": "thermocycleGroup"
            },
            {
              "name"    : "dyes",
              "type"    : "thermocycleDyes",
              "optional": true
            },
            {
              "name"    : "melting",
              "type"    : "thermocycleMelting",
              "optional": true
            }
          ]
        }
      },

      "incubate": {
        "operation"  : "incubate",
        "description": "",
        "name"       : "Incubate",
        "scaffold"   : {
          "operation"   : "incubate",
          "requirements": {},
          "transforms"  : [
            {
              "container": "object"
            }
          ],
          "fields"      : [
            {
              "name": "object",
              "type": "container"
            },
            {
              "name"   : "where",
              "type"   : "option",
              "options": [
                "ambient",
                "warm_37",
                "cold_4",
                "cold_20",
                "cold_80"
              ],
              "default": "ambient"
            },
            {
              "name"   : "duration",
              "type"   : "duration",
              "default": "60:minute"
            },
            {
              "name"   : "shaking",
              "type"   : "boolean",
              "default": false
            }
          ]
        }
      },


      //cover / seal


      "seal": {
        "operation"  : "seal",
        "description": "Seal a container",
        "name"       : "Seal",
        "scaffold"   : {
          "operation"   : "seal",
          "requirements": {},
          "transforms"  : [
            {
              "container": "object"
            }
          ],
          "fields"      : [
            {
              "name": "object",
              "type": "container"
            }
          ]
        }
      },

      "unseal": {
        "operation"  : "unseal",
        "description": "Unseal a container",
        "name"       : "Unseal",
        "scaffold"   : {
          "operation"   : "unseal",
          "requirements": {},
          "transforms"  : [
            {
              "container": "object"
            }
          ],
          "fields"      : [
            {
              "name": "object",
              "type": "container"
            }
          ]
        }
      },

      "cover": {
        "operation"  : "cover",
        "description": "Cover a plate with a specified lid",
        "name"       : "Cover",
        "scaffold"   : {

          "operation"   : "cover",
          "requirements": {},
          "transforms"  : [
            {
              "container": "object"
            }
          ],
          "fields"      : [
            {
              "name": "object",
              "type": "container"
            },
            {
              "name"    : "lid",
              "type"    : "option",
              "options" : [
                "standard",
                "universal",
                "low_evaporation"
              ],
              "optional": true,
              "default" : "standard"
            }
          ]
        }
      },

      "uncover": {
        "operation"  : "uncover",
        "description": "Uncover a container",
        "name"       : "Uncover",
        "scaffold"   : {
          "operation"   : "uncover",
          "requirements": {},
          "transforms"  : [
            {
              "container": "object"
            }
          ],
          "fields"      : [
            {
              "name": "object",
              "type": "container"
            }
          ]
        }
      },

      "spin": {
        "operation"  : "spin",
        "description": "Centrifuge a plate",
        "name"       : "Spin",
        "scaffold"   : {
          "operation"   : "spin",
          "requirements": {},
          "transforms"  : [
            {
              "container": "object"
            }
          ],
          "fields"      : [
            {
              "name": "object",
              "type": "container"
            },
            {
              "name"   : "acceleration",
              "type"   : "acceleration",
              "default": "100:meter/second^2"
            },
            {
              "name": "duration",
              "type": "duration"
            }
          ]
        }
      },


      //spectrometry


      "absorbance": {
        "operation"  : "absorbance",
        "description": "Measure absorbance of a specified wavelength (between 300 nm - 1000 nm)",
        "name"       : "Absorbance",
        "scaffold"   : {
          "operation"      : "absorbance",
          "requirements"   : {},
          "transformations": [
            {
              "wells": "wells"
            }
          ],
          "fields"         : [
            {
              "name"   : "dataref",
              "type"   : "string",
              "default": "absorbance_${index}"
            },
            {
              "name"           : "wells",
              "type"           : "aliquot+",
              "singleContainer": false
            },
            {
              "name"      : "wavelength",
              "type"      : "length",
              "default"   : "600:nanometer",
              "inputAttrs": {
                "min": 300,
                "max": 1000
              }
            },
            {
              "name"    : "num_flashes",
              "type"    : "integer",
              "optional": true,
              "default" : 25
            }
          ]
        }
      },

      "fluorescence": {
        "operation"  : "fluorescence",
        "description": "Measure fluorescence given an excitation wavelength (300 nm - 1000 nm) and emission (250 nm - 900 nm)",
        "name"       : "Fluorescence",
        "scaffold"   : {
          "operation"      : "fluorescence",
          "requirements"   : {},
          "transformations": [
            {
              "wells": "wells"
            }
          ],
          "fields"         : [
            {
              "name"   : "dataref",
              "type"   : "string",
              "default": "fluorescence_${index}"
            },
            {
              "name"           : "wells",
              "type"           : "aliquot+",
              "singleContainer": false
            },
            {
              "name"      : "excitation",
              "type"      : "length",
              "default"   : "600:nanometer",
              "inputAttrs": {
                "min": 300,
                "max": 1000
              }
            },
            {
              "name"      : "emission",
              "type"      : "length",
              "default"   : "500:nanometer",
              "inputAttrs": {
                "min": 250,
                "max": 900
              }
            },
            {
              "name"    : "num_flashes",
              "type"    : "integer",
              "optional": true,
              "default" : 25
            }
          ]
        }
      },

      "luminescence": {
        "operation"  : "luminescence",
        "description": "Measure luminescence in wells of a plate between 380nm - 600 nm",
        "name"       : "Luminescence",
        "scaffold"   : {
          "operation"      : "luminescence",
          "requirements"   : {},
          "transformations": [
            {
              "wells": "wells"
            }
          ],
          "fields"         : [
            {
              "name"   : "dataref",
              "type"   : "string",
              "default": "luminescence_${index}"
            },
            {
              "name"           : "wells",
              "type"           : "aliquot+",
              "singleContainer": true
            }
          ]
        }
      },


      //DNA stuff

      /*
       "sangerseq"   : {
       "operation": "sangerseq"
       },

       */
      "gel_separate": {
        "operation"  : "gel_separate",
        "description": "Perform a dry gel electrophoresis",
        "name"       : "Gel Separate",
        "scaffold"   : {
          "operation"   : "gel_separate",
          "requirements": {},
          "transforms"  : [
            {
              "wells": "wells"
            }
          ],
          "fields"      : [
            {
              "name"   : "dataref",
              "type"   : "string",
              "default": "gelSeparate_${index}"
            },
            {
              "name"           : "objects",
              "type"           : "aliquot+",
              "singleContainer": false
            },
            {
              "name"   : "matrix",
              "type"   : "option",
              "options": [
                "agarose(96,2.0%)",
                "agarose(48,4.0%)",
                "agarose(48,2.0%)",
                "agarose(12,1.2%)",
                "agarose(8,0.8%)"
              ]
            },
            {
              "name"   : "ladder",
              "type"   : "option",
              "options": [
                "ladder1",
                "ladder2"
              ],
              "default": "ladder1"
            },
            {
              "name"   : "duration",
              "type"   : "string",
              "default": "60:minute"
            }
          ]
        }
      },


      //containers


      "store": {
        "operation"  : "store",
        "description": "Deliver a plate to a storage location specified by the where parameter.",
        "name"       : "Store",
        "scaffold"   : {
          "operation"   : "store",
          "requirements": {},
          "transforms"  : [
            {
              "container": "container"
            }
          ],
          "fields"      : [
            {
              "name": "object",
              "type": "container"
            },
            {
              "name"   : "where",
              "type"   : "option",
              "options": [
                "ambient",
                "cold_4",
                "cold_20",
                "cold_80"
              ],
              "default": "ambient"
            }
          ]
        }
      },

      "discard": {
        "operation"  : "discard",
        "description": "Discard a container. The container will be removed from your inventory and no longer accessible.",
        "name"       : "Discard",
        "scaffold"   : {
          "operation"   : "discard",
          "requirements": {},
          "transforms"  : [
            {
              "container": "container"
            }
          ],
          "fields"      : [
            {
              "name": "object",
              "type": "container"
            }
          ]
        }
      }
    });
  }
})(window, document, _);
