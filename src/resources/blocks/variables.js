import javascriptGenerator from "../javascriptGenerator";
import registerBlock from "../register";

const categoryPrefix = "variable_";
const categoryColor = "#FF8C1A";

function register() {
	// set variable
	registerBlock(
		`${categoryPrefix}set`,
		{
			message0: "set %1 to %2",
			args0: [
				{
					type: "input_value",
					name: "KEY",
					checks: "String",
				},
				{
					type: "input_value",
					name: "VALUE",
				},
			],
			previousStatement: null,
			nextStatement: null,
			inputsInline: true,
			colour: categoryColor,
		},
		(block) => {
			const KEY = javascriptGenerator.valueToCode(
				block,
				"KEY",
				javascriptGenerator.ORDER_ATOMIC
			);
			const VALUE = javascriptGenerator.valueToCode(
				block,
				"VALUE",
				javascriptGenerator.ORDER_ATOMIC
			);
			const code = `variables[${KEY || '""'}] = ${VALUE || '""'}`;
			return `${code}\n`;
		}
	);

	// get variable
	registerBlock(
		`${categoryPrefix}get`,
		{
			message0: "get %1",
			args0: [
				{
					type: "input_value",
					name: "KEY",
					checks: "String",
				},
			],
			output: null,
			inputsInline: true,
			colour: categoryColor,
		},
		(block) => {
			const KEY = javascriptGenerator.valueToCode(
				block,
				"KEY",
				javascriptGenerator.ORDER_ATOMIC
			);
			return [`variables[${KEY || '""'}]`, javascriptGenerator.ORDER_ATOMIC];
		}
	);

	// variable exist
	registerBlock(
		`${categoryPrefix}exist`,
		{
			message0: "does %1 exist?",
			args0: [
				{
					type: "input_value",
					name: "KEY",
					checks: "String",
				},
			],
			output: "Boolean",
			inputsInline: true,
			colour: categoryColor,
		},
		(block) => {
			const KEY = javascriptGenerator.valueToCode(
				block,
				"KEY",
				javascriptGenerator.ORDER_ATOMIC
			);
			const code = `Boolean(variables[${KEY || '""'}])`;
			return [`${code}\n`, javascriptGenerator.ORDER_ATOMIC];
		}
	);

	// delete variable
	registerBlock(
		`${categoryPrefix}delete`,
		{
			message0: "delete %1",
			args0: [
				{
					type: "input_value",
					name: "KEY",
					checks: "String",
				},
			],
			previousStatement: null,
			nextStatement: null,
			inputsInline: true,
			colour: categoryColor,
		},
		(block) => {
			const KEY = javascriptGenerator.valueToCode(
				block,
				"KEY",
				javascriptGenerator.ORDER_ATOMIC
			);
			const code = `delete variables[${KEY || '""'}]`;
			return `${code}\n`;
		}
	);

	// set localStorage
	registerBlock(
		`${categoryPrefix}setls`,
		{
			message0: "set localstorage %1 to %2",
			args0: [
				{
					type: "input_value",
					name: "KEY",
					checks: "String",
				},
				{
					type: "input_value",
					name: "VALUE",
				},
			],
			previousStatement: null,
			nextStatement: null,
			inputsInline: true,
			colour: categoryColor,
		},
		(block) => {
			const KEY = javascriptGenerator.valueToCode(
				block,
				"KEY",
				javascriptGenerator.ORDER_ATOMIC
			);
			const VALUE = javascriptGenerator.valueToCode(
				block,
				"VALUE",
				javascriptGenerator.ORDER_ATOMIC
			);
			const code = `localStorage.setItem(${KEY || '""'}, ${VALUE || '""'})`;
			return `${code}\n`;
		}
	);

	// get localStorage
	registerBlock(
		`${categoryPrefix}getls`,
		{
			message0: "get localstorage %1",
			args0: [
				{
					type: "input_value",
					name: "KEY",
					checks: "String",
				},
			],
			output: null,
			inputsInline: true,
			colour: categoryColor,
		},
		(block) => {
			const KEY = javascriptGenerator.valueToCode(
				block,
				"KEY",
				javascriptGenerator.ORDER_ATOMIC
			);
			return [
				`(Boolean(localStorage.getItem(${
					KEY || '""'
				})) ? localStorage.getItem(${KEY || '""'}) : undefined)`,
				javascriptGenerator.ORDER_ATOMIC,
			];
		}
	);

	// localstorage variable exist
	registerBlock(
		`${categoryPrefix}existls`,
		{
			message0: "does localstorage %1 exist?",
			args0: [
				{
					type: "input_value",
					name: "KEY",
					checks: "String",
				},
			],
			output: "Boolean",
			inputsInline: true,
			colour: categoryColor,
		},
		(block) => {
			const KEY = javascriptGenerator.valueToCode(
				block,
				"KEY",
				javascriptGenerator.ORDER_ATOMIC
			);
			const code = `Boolean(localStorage.getItem(${KEY || '""'}))`;
			return [`${code}\n`, javascriptGenerator.ORDER_ATOMIC];
		}
	);

	// delete localstorage variable
	registerBlock(
		`${categoryPrefix}deletels`,
		{
			message0: "delete localstorage %1",
			args0: [
				{
					type: "input_value",
					name: "KEY",
					checks: "String",
				},
			],
			previousStatement: null,
			nextStatement: null,
			inputsInline: true,
			colour: categoryColor,
		},
		(block) => {
			const KEY = javascriptGenerator.valueToCode(
				block,
				"KEY",
				javascriptGenerator.ORDER_ATOMIC
			);
			const code = `localStorage.removeItem(${KEY || ""})`;
			return `${code}\n`;
		}
	);
}

export default register;
