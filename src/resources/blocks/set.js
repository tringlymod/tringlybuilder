import javascriptGenerator from "../javascriptGenerator";
import registerBlock from "../register";

const categoryPrefix = "set_";
const categoryColor = "#FF661A";

function register() {
	// create Set
	registerBlock(
		`${categoryPrefix}create`,
		{
			message0: "create empty Set %1",
			args0: [
				{
					type: "input_value",
					name: "NAME",
				},
			],
			previousStatement: null,
			nextStatement: null,
			inputsInline: true,
			colour: categoryColor,
		},
		(block) => {
			const NAME = javascriptGenerator.valueToCode(
				block,
				"NAME",
				javascriptGenerator.ORDER_ATOMIC
			);
			const code = `const ${NAME || `set`} = new Set();`;

			return `${code}\n`;
		}
	);

	// set Set
	registerBlock(
		`${categoryPrefix}set`,
		{
			message0: "Set %1 add %2",
			args0: [
				{
					type: "input_value",
					name: "NAME",
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
			const NAME = javascriptGenerator.valueToCode(
				block,
				"NAME",
				javascriptGenerator.ORDER_ATOMIC
			);
			const VALUE = javascriptGenerator.valueToCode(
				block,
				"VALUE",
				javascriptGenerator.ORDER_ATOMIC
			);
			const code = `${NAME || `set`}.add(${VALUE || `\'value\'`})`;

			return `${code}\n`;
		}
	);

	// has Set
	registerBlock(
		`${categoryPrefix}has`,
		{
			message0: "Set %1 has %2 ?",
			args0: [
				{
					type: "input_value",
					name: "NAME",
				},
				{
					type: "input_value",
					name: "VALUE",
				},
			],
			output: "Boolean",
			inputsInline: true,
			colour: categoryColor,
		},
		(block) => {
			const NAME = javascriptGenerator.valueToCode(
				block,
				"NAME",
				javascriptGenerator.ORDER_ATOMIC
			);
			const VALUE = javascriptGenerator.valueToCode(
				block,
				"VALUE",
				javascriptGenerator.ORDER_ATOMIC
			);

			return [
				`${NAME || `set`}.has(${VALUE || `\'value\'`})`,
				javascriptGenerator.ORDER_ATOMIC,
			];
		}
	);

	// delete Set
	registerBlock(
		`${categoryPrefix}delete`,
		{
			message0: "delete %1 from Set %2",
			args0: [
				{
					type: "input_value",
					name: "VALUE",
				},
				{
					type: "input_value",
					name: "NAME",
				},
			],
			previousStatement: null,
			nextStatement: null,
			inputsInline: true,
			colour: categoryColor,
		},
		(block) => {
			const NAME = javascriptGenerator.valueToCode(
				block,
				"NAME",
				javascriptGenerator.ORDER_ATOMIC
			);
			const VALUE = javascriptGenerator.valueToCode(
				block,
				"VALUE",
				javascriptGenerator.ORDER_ATOMIC
			);

			return `${NAME || `set`}.delete(${VALUE || `\'value\'`})`;
		}
	);

	// clear Set
	registerBlock(
		`${categoryPrefix}clear`,
		{
			message0: "clear Set %1",
			args0: [
				{
					type: "input_value",
					name: "NAME",
				},
			],
			previousStatement: null,
			nextStatement: null,
			inputsInline: true,
			colour: categoryColor,
		},
		(block) => {
			const NAME = javascriptGenerator.valueToCode(
				block,
				"NAME",
				javascriptGenerator.ORDER_ATOMIC
			);

			return `${NAME || `set`}.clear()`;
		}
	);
}
export default register;
