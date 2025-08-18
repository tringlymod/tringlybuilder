import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';

const categoryPrefix = 'map_';
const categoryColor = '#FF661A';

function register() {
    // create Map
    registerBlock(`${categoryPrefix}create`, {
        message0: 'create empty Map %1',
        args0: [
            {
                "type": "input_value",
                "name": "NAME"
            },
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const NAME = javascriptGenerator.valueToCode(block, 'NAME', javascriptGenerator.ORDER_ATOMIC);
        const code = `const ${NAME || `map`} = new Map();`;
        
        return `${code}\n`;
    })

    // set Map
    registerBlock(`${categoryPrefix}set`, {
        message0: 'Map %1 set %2 to %3',
        args0: [
            {
                "type": "input_value",
                "name": "NAME"
            },
            {
                "type": "input_value",
                "name": "KEY"
            },
            {
                "type": "input_value",
                "name": "VALUE"
            },
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const NAME = javascriptGenerator.valueToCode(block, 'NAME', javascriptGenerator.ORDER_ATOMIC);
        const KEY = javascriptGenerator.valueToCode(block, 'KEY', javascriptGenerator.ORDER_ATOMIC);
        const VALUE = javascriptGenerator.valueToCode(block, 'VALUE', javascriptGenerator.ORDER_ATOMIC);
        const code = `${NAME || `map`}.set(${KEY || `\'key\'`}, ${VALUE || `\'value\'`})`;
        
        return `${code}\n`;
    })

    // has Map
    registerBlock(`${categoryPrefix}has`, {
        message0: 'Map %1 has %2 ?',
        args0: [
            {
                "type": "input_value",
                "name": "NAME"
            },
            {
                "type": "input_value",
                "name": "KEY"
            },
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const NAME = javascriptGenerator.valueToCode(block, 'NAME', javascriptGenerator.ORDER_ATOMIC);
        const KEY = javascriptGenerator.valueToCode(block, 'KEY', javascriptGenerator.ORDER_ATOMIC);
        
        return [`${NAME || `map`}.has(${KEY || `\'key\'`})`, javascriptGenerator.ORDER_ATOMIC];
    })

    // get Map
    registerBlock(`${categoryPrefix}get`, {
        message0: 'Map %1 get %2',
        args0: [
            {
                "type": "input_value",
                "name": "NAME"
            },
            {
                "type": "input_value",
                "name": "KEY"
            },
        ],
        output: "String",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const NAME = javascriptGenerator.valueToCode(block, 'NAME', javascriptGenerator.ORDER_ATOMIC);
        const KEY = javascriptGenerator.valueToCode(block, 'KEY', javascriptGenerator.ORDER_ATOMIC);
        
        return [`${NAME || `map`}.get(${KEY || `\'key\'`})`, javascriptGenerator.ORDER_ATOMIC];
    })

    // delete Map
    registerBlock(`${categoryPrefix}delete`, {
        message0: 'delete %1 from Map %2',
        args0: [
            {
                "type": "input_value",
                "name": "KEY"
            },
            {
                "type": "input_value",
                "name": "NAME"
            },
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const NAME = javascriptGenerator.valueToCode(block, 'NAME', javascriptGenerator.ORDER_ATOMIC);
        const KEY = javascriptGenerator.valueToCode(block, 'KEY', javascriptGenerator.ORDER_ATOMIC);
        
        return `${NAME || `map`}.delete(${KEY || `\'key\'`})`;
    })

    // clear Map
    registerBlock(`${categoryPrefix}clear`, {
        message0: 'clear Map %1',
        args0: [
            {
                "type": "input_value",
                "name": "NAME"
            },
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const NAME = javascriptGenerator.valueToCode(block, 'NAME', javascriptGenerator.ORDER_ATOMIC);
        
        return `${NAME || `map`}.clear()`;
    })
}
export default register;