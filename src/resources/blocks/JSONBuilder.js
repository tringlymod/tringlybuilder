import javascriptGenerator from "../javascriptGenerator";
import registerBlock from "../register";

const categoryPrefix = {
	both: "jsonBuilder_",
	array: "jsonBuilder_array_",
	object: "jsonBuilder_object_",
};
const categoryColor = "#FF661A";

function register() {
	// array builder
	registerBlock(
		`${categoryPrefix.array}builder`,
		{
			message0: "array builder %1 %2",
			args0: [
				{
					type: "input_dummy",
				},
				{
					type: "input_statement",
					name: "arrayInfo",
					check: "arrayBuilder",
				},
			],
			output: "JSONArray",
			colour: categoryColor,
		},
		(block) => {
			const arrayInfo = javascriptGenerator.statementToCode(block, "arrayInfo");

			const code = new Function(
				`return (function(){ class ARRAYBUILDER { array = []\n\n modifyArray() { ${arrayInfo} \nreturn this.array } }\n\n return new ARRAYBUILDER().modifyArray() })()`
			);
			return [`${JSON.stringify(code())}`, javascriptGenerator.ORDER_ATOMIC];
		}
	);

	// append value to builder
	registerBlock(
		`${categoryPrefix.array}append`,
		{
			message0: "append %1 to builder",
			args0: [
				{
					type: "input_value",
					name: "VALUE",
				},
			],
			previousStatement: "arrayBuilder",
			nextStatement: "arrayBuilder",
			colour: categoryColor,
		},
		(block) => {
			const VALUE = javascriptGenerator.valueToCode(
				block,
				"VALUE",
				javascriptGenerator.ORDER_ATOMIC
			);

			const code = `this.array.push(${VALUE})`;
			return VALUE ? `${code}\n` : ``;
		}
	);

	//set array builder
	registerBlock(
		`${categoryPrefix.array}setBuilder`,
		{
			message0: "set builder to %1",
			args0: [
				{
					type: "input_value",
					name: "BUILDER",
					check: ["arrayBuilder", "JSONArray"],
				},
			],
			previousStatement: "arrayBuilder",
			nextStatement: "arrayBuilder",
			colour: categoryColor,
		},
		(block) => {
			const BUILDER = javascriptGenerator.valueToCode(
				block,
				"BUILDER",
				javascriptGenerator.ORDER_ATOMIC
			);

			const code = `this.array = ${BUILDER ?? `[]`}`;

			return `${code}\n`;
		}
	);

	// object builder
	registerBlock(
		`${categoryPrefix.object}builder`,
		{
			message0: "object builder %1 %2",
			args0: [
				{
					type: "input_dummy",
				},
				{
					type: "input_statement",
					name: "objectInfo",
					check: "objectBuilder",
				},
			],
			output: "JSONObject",
			colour: categoryColor,
		},
		(block) => {
			const objectInfo = javascriptGenerator.statementToCode(
				block,
				"objectInfo"
			);
			const code = new Function(
				`return (function(){ class OBJECTBUILDER { object = {}\n\n modifyObject() { ${objectInfo} \nreturn this.object } }\n\n return new OBJECTBUILDER().modifyObject() })()`
			);
			return [`${JSON.stringify(code())}`, javascriptGenerator.ORDER_ATOMIC];
		}
	);

	// append key to builder
	registerBlock(
		`${categoryPrefix.object}appendKey`,
		{
			message0: "append key %1 to builder",
			args0: [
				{
					type: "input_value",
					name: "KEY",
				},
			],
			previousStatement: "objectBuilder",
			nextStatement: "objectBuilder",
			colour: categoryColor,
		},
		(block) => {
			const KEY = javascriptGenerator.valueToCode(
				block,
				"KEY",
				javascriptGenerator.ORDER_ATOMIC
			);

			const code = `this.object[${KEY}] = null`;
			return KEY ? `${code}\n` : ``;
		}
	);

	// append key value to builder
	registerBlock(
		`${categoryPrefix.object}appendKeyValue`,
		{
			message0: "append key %1 value %2 to builder",
			args0: [
				{
					type: "input_value",
					name: "KEY",
				},
				{
					type: "input_value",
					name: "VALUE",
				},
			],
			previousStatement: "objectBuilder",
			nextStatement: "objectBuilder",
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

			const code = `this.object[${KEY}] = ${VALUE}`;
			return KEY && VALUE ? `${code}\n` : ``;
		}
	);

	//set object builder
	registerBlock(
		`${categoryPrefix.object}setBuilder`,
		{
			message0: "set builder to %1",
			args0: [
				{
					type: "input_value",
					name: "BUILDER",
					check: ["objectBuilder", "JSONObject"],
				},
			],
			previousStatement: "objectBuilder",
			nextStatement: "objectBuilder",
			colour: categoryColor,
		},
		(block) => {
			const BUILDER = javascriptGenerator.valueToCode(
				block,
				"BUILDER",
				javascriptGenerator.ORDER_ATOMIC
			);

			const code = `this.object = ${BUILDER ?? `{}`}`;

			return `${code}\n`;
		}
	);

	// get current array/object
	registerBlock(
		`${categoryPrefix.both}current`,
		{
			message0: "current %1",
			args0: [
				{
					type: "field_dropdown",
					name: "CURRENT",
					options: [
						["array", "ARRAY"],
						["object", "OBJECT"],
					],
				},
			],
			output: null,
			colour: categoryColor,
		},
		(block) => {
			const CURRENT = block.getFieldValue("CURRENT");
			return [
				CURRENT === "ARRAY" ? `this.array` : `this.object`,
				javascriptGenerator.ORDER_ATOMIC,
			];
		}
	);
}
export default register;
