import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';

const categoryPrefix = 'functions_';
const categoryColor = '#5531D6';

function register() {
    // function
    registerBlock(`${categoryPrefix}create`, {
        message0: 'function %1 | params %2 %3 %4',
        args0: [
            {
                "type": "field_input",
                "name": "ID",
                "text": "id",
                "spellcheck": false
            },
            {
                "type": "field_input",
                "name": "PARAMS",
                "text": "",
                "spellcheck": false
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "FUNC"
            },
        ],
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const ID = block.getFieldValue('ID')
        const PARAMS = block.getFieldValue('PARAMS')
        const FUNC = javascriptGenerator.statementToCode(block, 'FUNC');
        
        const code = `async function ${ID}(${PARAMS}) { ${FUNC} }`;
        return `${code}\n`;
    })

    // inline function
    registerBlock(`${categoryPrefix}inline`, {
        message0: 'inline function | params  %1 %2 %3',
        args0: [
            {
                "type": "field_input",
                "name": "PARAMS",
                "text": "",
                "spellcheck": false
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "FUNC"
            }
        ],
        output: "Function",
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const PARAMS = block.getFieldValue('PARAMS')
        const FUNC = javascriptGenerator.statementToCode(block, 'FUNC');
        return [`await (async (${PARAMS}) => { ${FUNC} })()`, javascriptGenerator.ORDER_ATOMIC];
    })

    // return
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

    // call
    registerBlock(`${categoryPrefix}call`, {
        message0: 'call %1 | params %2',
        args0: [
            {
                "type": "field_input",
                "name": "ID",
                "text": "id",
                "spellcheck": false
            },
            {
                "type": "field_input",
                "name": "PARAMS",
                "text": "",
                "spellcheck": false
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const ID = block.getFieldValue('ID')
        const PARAMS = block.getFieldValue('PARAMS')
        const code = `${ID}(${PARAMS})`;
        return `${code}\n`;
    })

    // call
    registerBlock(`${categoryPrefix}callreporter`, {
        message0: 'call %1 | params %2',
        args0: [
            {
                "type": "field_input",
                "name": "ID",
                "text": "id",
                "spellcheck": false
            },
            {
                "type": "field_input",
                "name": "PARAMS",
                "text": "",
                "spellcheck": false
            }
        ],
        output: null,
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const ID = block.getFieldValue('ID')
        const PARAMS = block.getFieldValue('PARAMS')
        return [`${ID}(${PARAMS})\n`, javascriptGenerator.ORDER_ATOMIC];
    })
}
export default register;
