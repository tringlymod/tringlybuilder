import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';
import Blockly from 'blockly/core'

const categoryPrefix = 'blocks_';
const categoryColor = '#FF6680';

function register() {
    //block
    registerBlock(`${categoryPrefix}create`, {
        message0: 'create block %1 id: %2 %3 text: %4 %5 type: %6 %7 block shape: %8 %9 allow Drop Anywhere: %10 %11 disable monitor: %12 %13 hide from palette: %14 inputs: %15 %16 function: %17 %18',
        args0: [
            {
                "type": "input_dummy"
            },
            {
                "type": "field_input",
                "name": "ID",
                "text": "id",
                "spellcheck": false
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_input",
                "name": "TEXT",
                "text": "text",
                "spellcheck": false
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_dropdown",
                "name": "TYPE",
                "options": [
                    ["block", "COMMAND" ],
                    ["reporter", "REPORTER" ],
                    ["boolean", "BOOLEAN" ],
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_dropdown",
                "name": "BLOCKSHAPE",
                "options": [
                    ["0 | default", "DEFAULT"],
                    ["1 | round/reporter", "ROUND"],
                    ["2 | hexagonal/boolean", "HEXAGONAL"],
                    ["3 | square", "SQUARE"],
                    ["4 | leaf", "LEAF"],
                    ["5 | plus", "PLUS"],
                    ["6 | octagonal", "OCTAGONAL"],
                    ["7 | bumped", "BUMPED"],
                    ["8 | indented", "INDENTED"],
                    ["9 | scrapped", "SCRAPPED"],
                    ["10 | arrow", "ARROW"],
                    ["11 | ticket", "TICKET"],
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_checkbox",
                "name": "ADAW",
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_checkbox",
                "name": "DISABLEMONITOR",
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "HIDEFROMPALETTE",
                "check": "Boolean"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "INPUTS",
                "check": "BlockInput"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "FUNC"
            }
        ],
        nextStatement: null,
        inputsInline: false,
        colour: categoryColor,
    }, (block) => {
        const ID = block.getFieldValue('ID')
        const TEXT = block.getFieldValue('TEXT')
        const TYPE = block.getFieldValue('TYPE')
        const BLOCKSHAPE = block.getFieldValue("BLOCKSHAPE")
        const ADAW = block.getFieldValue("ADAW").toLoweCase()
        const DISABLEMONITOR = block.getFieldValue('DISABLEMONITOR').toLoweCase()
        const HIDEFROMPALETTE = javascriptGenerator.valueToCode(block, 'HIDEFROMPALETTE', javascriptGenerator.ORDER_ATOMIC);
        const INPUTS = javascriptGenerator.statementToCode(block, 'INPUTS');
        const FUNC = javascriptGenerator.statementToCode(block, 'FUNC');
        
        const code = `blocks.push({
            opcode: \`${ID}\`,
            blockType: Scratch.BlockType.${TYPE},
            text: \`${TEXT}\`,` +
            ((TYPE != "COMMAND" && BLOCKSHAPE != "DEFAULT") ? `blockShape: Scratch.BlockShape.${BLOCKSHAPE},\n` : ``) +
            (TYPE == "REPORTER" ? `allowDropAnywhere: ${ADAW},` : ``) +
            ((TYPE == "REPORTER" || TYPE == "BOOLEAN") ? `disableMonitor: ${DISABLEMONITOR},\n` : ``) + `
            hideFromPalette: ${HIDEFROMPALETTE || `false`},
            arguments: { ${INPUTS} },` + 
        `});
        Extension.prototype[\`${ID}\`] = async (args, util) => { ${FUNC} };`;
        return `${code}\n`;
    })

    //object
    registerBlock(`${categoryPrefix}createobject`, {
        message0: 'create object %1 id: %2 %3 text: %4 %5 type: %6 %7 hide from palette?: %8 function: %9 %10',
        args0: [
            {
                "type": "input_dummy"
            },
            {
                "type": "field_input",
                "name": "ID",
                "text": "id",
                "spellcheck": false
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_input",
                "name": "TEXT",
                "text": "text",
                "spellcheck": false
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_dropdown",
                "name": "TYPE",
                "options": [
                    [ "label", "LABEL" ],
                    [ "button", "BUTTON" ],
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "HIDEFROMPALETTE",
                "check": "Boolean"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "FUNC"
            }
        ],
        nextStatement: null,
        inputsInline: false,
        colour: categoryColor,
    }, (block) => {
        const TEXT = block.getFieldValue('TEXT')
        const TYPE = block.getFieldValue('TYPE')
        const ID = TYPE === 'BUTTON' ? '\nopcode: \`' + block.getFieldValue('ID') + '\`,' : ''
        const HIDEFROMPALETTE = javascriptGenerator.valueToCode(block, 'HIDEFROMPALETTE', javascriptGenerator.ORDER_ATOMIC);
        const FUNC = TYPE === 'BUTTON' ? 'Extension.prototype[\`' + block.getFieldValue('ID') + '\`] = async (args, util) => { ' + javascriptGenerator.statementToCode(block, 'FUNC') + ' };' : '';
        
        const code = `blocks.push({${ID}
            blockType: Scratch.BlockType.${TYPE},
            text: \`${TEXT}\`,
            hideFromPalette:${HIDEFROMPALETTE || `false`},
        });
        ${FUNC}`;
        return `${code}\n`;
    })
    
    // gap
    registerBlock(`${categoryPrefix}gap`, {
        message0: 'create gap %1 gap height: %2',
        args0: [
            {
                "type": "input_dummy"
            },
            {
                "type": "field_number",
                "name": "GAP",
                "value": "48"
            },
        ],
        inputsInline: false,
        colour: categoryColor,
    }, (block) => {
        const GAP = block.getFieldValue('GAP')
        const code = `blocks.push({
            blockType: Scratch.BlockType.XML,
            xml: \`<sep gap='${GAP}'/>\`,
        });`;
        return `${code}\n`;
    })

    //input
    registerBlock(`${categoryPrefix}input`, {
        message0: 'create input %1 id: %2 %3 type: %4 %5 default: %6',
        args0: [
            {
                "type": "input_dummy"
            },
            {
                "type": "field_input",
                "name": "ID",
                "text": "ID",
                "spellcheck": false
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_dropdown",
                "name": "TYPE",
                "options": [
                    ["string", "STRING" ],
                    ["number", "NUMBER" ],
                    ["boolean", "BOOLEAN" ],
                    ["color", "COLOR" ],
                    ["costume", "COSTUME" ],
                    ["sound", "SOUND" ],
                    ["angle", "ANGLE" ],
                    ["matrix", "MATRIX" ],
                    ["note", "NOTE" ],
                    ["empty", "empty" ],
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "DEFAULT",
            }
        ],
        nextStatement: "BlockInput",
        previousStatement: "BlockInput",
        inputsInline: false,
        colour: categoryColor,
    }, (block) => {
        const ID = block.getFieldValue('ID')
        const TYPE = block.getFieldValue('TYPE')
        const DEFAULT = javascriptGenerator.valueToCode(block, 'DEFAULT', javascriptGenerator.ORDER_ATOMIC);
        
        const code = `"${ID}": {
            type: Scratch.ArgumentType.${TYPE},
            defaultValue: ${DEFAULT},
        },`;
        return `${code}\n`;
    })

    //IMAGE input
    registerBlock(`${categoryPrefix}inputIMAGE`, {
        message0: 'id: %1 %2 DataURI: %3',
        args0: [
            {
                "type": "field_input",
                "name": "ID",
                "text": "ID",
                "spellcheck": false
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "DATAURI",
            }
        ],
        nextStatement: "BlockInput",
        previousStatement: "BlockInput",
        inputsInline: false,
        colour: categoryColor,
    }, (block) => {
        const ID = block.getFieldValue('ID')
        const DATAURI = javascriptGenerator.valueToCode(block, 'DATAURI', javascriptGenerator.ORDER_ATOMIC);
        
        const code = `"${ID}": {
            type: Scratch.ArgumentType.IMAGE,
            dataURI: ${DATAURI},
        },`;
        return `${code}\n`;
    })

    //get input
    registerBlock(`${categoryPrefix}get`, {
        message0: 'get %1',
        args0: [
            {
                "type": "field_input",
                "name": "NAME",
                "text": "INPUTID",
                "spellcheck": false
            }
        ],
        output: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const NAME = block.getFieldValue('NAME')
        return [`args["${NAME}"]`, javascriptGenerator.ORDER_ATOMIC];
    })

    //return
    registerBlock(`${categoryPrefix}return`, {
        message0: 'return %1',
        args0: [
            {
                "type": "input_value",
                "name": "VALUE",
            }
        ],
        previousStatement: null,
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const VALUE = javascriptGenerator.valueToCode(block, 'VALUE', javascriptGenerator.ORDER_ATOMIC);
        const code = `return ${VALUE || ''}`;
        return `${code}\n`;
    })
}
export default register;
