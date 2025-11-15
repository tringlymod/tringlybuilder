import javascriptGenerator from "../javascriptGenerator";
import registerBlock from "../register";

const categoryPrefix = "literals_";
const categoryColor = "#59C08E";

function register() {
	// null
	registerBlock(
		`${categoryPrefix}null`,
		{
			message0: "null",
			args0: [],
			output: "Null",
			inputsInline: true,
			colour: categoryColor,
		},
		(block) => {
			return ["null", javascriptGenerator.ORDER_ATOMIC];
		}
	);

	// undefined
	registerBlock(
		`${categoryPrefix}undefined`,
		{
			message0: "undefined",
			args0: [],
			output: "Undefined",
			inputsInline: true,
			colour: categoryColor,
		},
		(block) => {
			return ["undefined", javascriptGenerator.ORDER_ATOMIC];
		}
	);

	// boolean
	registerBlock(
		`${categoryPrefix}boolean`,
		{
			message0: "%1",
			args0: [
				{
					type: "field_dropdown",
					name: "BOOLEAN",
					options: [
						["true", "TRUE"],
						["false", "FALSE"],
						["random", "RANDOM"],
					],
				},
			],
			output: "Boolean",
			inputsInline: false,
			colour: categoryColor,
		},
		(block) => {
			const BOOLEAN = block.getFieldValue("BOOLEAN");

			const code =
				BOOLEAN == "TRUE"
					? `true`
					: BOOLEAN === "FALSE"
					? `false`
					: `(Math.random() >= 0.5)`;

			return [`${code}`, javascriptGenerator.ORDER_ATOMIC];
		}
	);

	// number
	registerBlock(
		`${categoryPrefix}number`,
		{
			message0: "(%1)",
			args0: [
				{
					type: "field_number",
					name: "NUMBER",
					value: 0,
				},
			],
			output: "Number",
			inputsInline: true,
			colour: categoryColor,
		},
		(block) => {
			const NUMBER = block.getFieldValue("NUMBER");

			return [NUMBER, javascriptGenerator.ORDER_ATOMIC];
		}
	);

	// string
	registerBlock(
		`${categoryPrefix}string`,
		{
			message0: "text: %1 style: %2",
			args0: [
				{
					type: "field_input",
					name: "STRING",
					text: "string",
					spellcheck: false,
				},
				{
					type: "field_dropdown",
					name: "STRINGTYPE",
					options: [
						["singular", "'"],
						["double", '"'],
						["template", "`"],
					],
				},
			],
			output: "String",
			inputsInline: false,
			colour: categoryColor,
		},
		(block) => {
			const STRING = block.getFieldValue("STRING");
			const STRINGTYPE = block.getFieldValue("STRINGTYPE");

			return [
				`${STRINGTYPE}${STRING}${STRINGTYPE}`,
				javascriptGenerator.ORDER_ATOMIC,
			];
		}
	);

	// parenthesis
	registerBlock(
		`${categoryPrefix}parenthesis`,
		{
			message0: "( %1 )",
			args0: [
				{
					type: "input_value",
					name: "STRING",
					text: "string",
					checks: "String",
				},
			],
			output: "String",
			inputsInline: true,
			colour: categoryColor,
		},
		(block) => {
			const STRING = javascriptGenerator.valueToCode(
				block,
				"STRING",
				javascriptGenerator.ORDER_ATOMIC
			);

			return [`(${STRING})`, javascriptGenerator.ORDER_ATOMIC];
		}
	);

	// array
	registerBlock(
		`${categoryPrefix}array`,
		{
			message0: "[ %1 ]",
			args0: [
				{
					type: "input_value",
					name: "STRING",
					text: "string",
					checks: "String",
				},
			],
			output: "JSONArray",
			inputsInline: true,
			colour: categoryColor,
		},
		(block) => {
			const STRING = javascriptGenerator.valueToCode(
				block,
				"STRING",
				javascriptGenerator.ORDER_ATOMIC
			);

			return [`[${STRING}]`, javascriptGenerator.ORDER_ATOMIC];
		}
	);

	// object
	registerBlock(
		`${categoryPrefix}object`,
		{
			message0: "{ %1 }",
			args0: [
				{
					type: "input_value",
					name: "STRING",
					text: "string",
					checks: "String",
				},
			],
			output: "JSONObject",
			inputsInline: true,
			colour: categoryColor,
		},
		(block) => {
			const STRING = javascriptGenerator.valueToCode(
				block,
				"STRING",
				javascriptGenerator.ORDER_ATOMIC
			);

			return [`{${STRING}}`, javascriptGenerator.ORDER_ATOMIC];
		}
	);

	// color
	registerBlock(
		`${categoryPrefix}color`,
		{
			message0: "%1",
			args0: [
				{
					type: "field_colour_hsv_sliders",
					name: "COLOR",
					colour: "#ff0000",
				},
			],
			output: "Color",
			inputsInline: true,
			colour: categoryColor,
		},
		(block) => {
			const COLOR = block.getFieldValue("COLOR");

			return ["'" + COLOR + "'", javascriptGenerator.ORDER_ATOMIC];
		}
	);

	// new line
	registerBlock(
		`${categoryPrefix}newline`,
		{
			message0: "new line",
			args0: [],
			output: "String",
			inputsInline: true,
			colour: categoryColor,
		},
		() => {
			return ["\n", javascriptGenerator.ORDER_ATOMIC];
		}
	);

	// tabchar
	registerBlock(
		`${categoryPrefix}tabchar`,
		{
			message0: "tab character",
			args0: [],
			output: "String",
			inputsInline: true,
			colour: categoryColor,
		},
		() => {
			return ["\t", javascriptGenerator.ORDER_ATOMIC];
		}
	);

	// blank array
	registerBlock(
		`${categoryPrefix}blankarray`,
		{
			message0: "blank array",
			args0: [],
			output: "JSONArray",
			inputsInline: true,
			colour: categoryColor,
		},
		(block) => {
			return ["[]", javascriptGenerator.ORDER_ATOMIC];
		}
	);
	registerBlock(
		`${categoryPrefix}arraylength`,
		{
			message0: "array of length %1",
			args0: [
				{
					type: "input_value",
					name: "X",
					check: "Number",
				},
			],
			output: "JSONArray",
			inputsInline: true,
			colour: categoryColor,
		},
		(block) => {
			const X = javascriptGenerator.valueToCode(
				block,
				"X",
				javascriptGenerator.ORDER_ATOMIC
			);
			return [`Array(${X || 0})`, javascriptGenerator.ORDER_ATOMIC];
		}
	);

	// blank object
	registerBlock(
		`${categoryPrefix}blankobject`,
		{
			message0: "blank object",
			args0: [],
			output: "JSONObject",
			inputsInline: true,
			colour: categoryColor,
		},
		(block) => {
			return ["{}", javascriptGenerator.ORDER_ATOMIC];
		}
	);
}

export default register;
