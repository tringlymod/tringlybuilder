import javascriptGenerator from "../javascriptGenerator";
import registerBlock from "../register";

const categoryPrefix = "debug_";
const categoryColor = "#666666";

function register() {
	// console.log
	registerBlock(
		`${categoryPrefix}log`,
		{
			message0: "log %1",
			args0: [
				{
					type: "input_value",
					name: "LOG",
				},
			],
			previousStatement: null,
			nextStatement: null,
			inputsInline: true,
			colour: categoryColor,
		},
		(block) => {
			const LOG = javascriptGenerator.valueToCode(
				block,
				"LOG",
				javascriptGenerator.ORDER_ATOMIC
			);
			const code = `console.log(${LOG});`;
			return `${code}\n`;
		}
	);

	// console.warn
	registerBlock(
		`${categoryPrefix}warn`,
		{
			message0: "warn %1",
			args0: [
				{
					type: "input_value",
					name: "LOG",
				},
			],
			previousStatement: null,
			nextStatement: null,
			inputsInline: true,
			colour: categoryColor,
		},
		(block) => {
			const LOG = javascriptGenerator.valueToCode(
				block,
				"LOG",
				javascriptGenerator.ORDER_ATOMIC
			);
			const code = `console.warn(${LOG});`;
			return `${code}\n`;
		}
	);

	// console.error
	registerBlock(
		`${categoryPrefix}error`,
		{
			message0: "error %1",
			args0: [
				{
					type: "input_value",
					name: "LOG",
				},
			],
			previousStatement: null,
			nextStatement: null,
			inputsInline: true,
			colour: categoryColor,
		},
		(block) => {
			const LOG = javascriptGenerator.valueToCode(
				block,
				"LOG",
				javascriptGenerator.ORDER_ATOMIC
			);
			const code = `console.error(${LOG});`;
			return `${code}\n`;
		}
	);

	// join x y z
	registerBlock(
		`${categoryPrefix}join`,
		{
			message0: "join %1 %2 %3",
			args0: [
				{
					type: "input_value",
					name: "X",
					checks: "String",
				},
				{
					type: "input_value",
					name: "Y",
					checks: "String",
				},
				{
					type: "input_value",
					name: "Z",
					checks: "String",
				},
			],
			output: "String",
			inputsInline: true,
			colour: categoryColor,
		},
		(block) => {
			const X = javascriptGenerator.valueToCode(
				block,
				"X",
				javascriptGenerator.ORDER_ATOMIC
			);
			const Y = javascriptGenerator.valueToCode(
				block,
				"Y",
				javascriptGenerator.ORDER_ATOMIC
			);
			const Z = javascriptGenerator.valueToCode(
				block,
				"Z",
				javascriptGenerator.ORDER_ATOMIC
			);

			return [`${X}${Y}${Z}`, javascriptGenerator.ORDER_ATOMIC];
		}
	);

	// open group
	registerBlock(
		`${categoryPrefix}group`,
		{
			message0: "open group %1 label: %2 %3",
			args0: [
				{
					type: "input_dummy",
				},
				{
					type: "input_value",
					name: "LABEL",
				},
				{
					type: "input_statement",
					name: "BLOCKS",
				},
			],
			previousStatement: null,
			nextStatement: null,
			inputsInline: false,
			colour: categoryColor,
		},
		(block) => {
			const LABEL = javascriptGenerator.valueToCode(
				block,
				"LABEL",
				javascriptGenerator.ORDER_ATOMIC
			);
			const BLOCKS = javascriptGenerator.statementToCode(block, "BLOCKS");
			const code = `console.group(${
				LABEL || ""
			})\n${BLOCKS} console.groupEnd()`;
			return `${code}\n`;
		}
	);

	// collapsed group
	registerBlock(
		`${categoryPrefix}groupcollapsed`,
		{
			message0: "collapsed group %1 label: %2 %3",
			args0: [
				{
					type: "input_dummy",
				},
				{
					type: "input_value",
					name: "LABEL",
				},
				{
					type: "input_statement",
					name: "BLOCKS",
				},
			],
			previousStatement: null,
			nextStatement: null,
			inputsInline: false,
			colour: categoryColor,
		},
		(block) => {
			const LABEL = javascriptGenerator.valueToCode(
				block,
				"LABEL",
				javascriptGenerator.ORDER_ATOMIC
			);
			const BLOCKS = javascriptGenerator.statementToCode(block, "BLOCKS");
			const code = `console.groupCollapsed(${
				LABEL || ""
			})\n${BLOCKS} console.groupEnd()`;
			return `${code}\n`;
		}
	);

	// eval block
	registerBlock(
		`${categoryPrefix}evalblock`,
		{
			message0: "eval %1",
			args0: [
				{
					type: "field_input",
					name: "EVAL",
					spellcheck: false,
				},
			],
			previousStatement: null,
			nextStatement: null,
			inputsInline: true,
			colour: categoryColor,
		},
		(block) => {
			const EVAL = block.getFieldValue("EVAL");
			const code = `eval(${EVAL})`;
			return `${code}\n`;
		}
	);

	// raw block
	registerBlock(
		`${categoryPrefix}rawblock`,
		{
			message0: "raw %1",
			args0: [
				{
					type: "field_input",
					name: "RAW",
					spellcheck: false,
				},
			],
			previousStatement: null,
			nextStatement: null,
			inputsInline: true,
			colour: categoryColor,
		},
		(block) => {
			const RAW = block.getFieldValue("RAW");
			const code = `${RAW}`;
			return `${code}\n`;
		}
	);

	// eval reporter
	registerBlock(
		`${categoryPrefix}eval`,
		{
			message0: "eval %1",
			args0: [
				{
					type: "field_input",
					name: "EVAL",
					spellcheck: false,
				},
			],
			output: null,
			inputsInline: true,
			colour: categoryColor,
		},
		(block) => {
			const EVAL = block.getFieldValue("EVAL");
			return [`eval(${EVAL})`, javascriptGenerator.ORDER_ATOMIC];
		}
	);

	// raw reporter
	registerBlock(
		`${categoryPrefix}raw`,
		{
			message0: "raw %1",
			args0: [
				{
					type: "field_input",
					name: "RAW",
					spellcheck: false,
				},
			],
			output: null,
			inputsInline: true,
			colour: categoryColor,
		},
		(block) => {
			const RAW = block.getFieldValue("RAW");
			return [RAW, javascriptGenerator.ORDER_ATOMIC];
		}
	);

	// comment
	registerBlock(
		`${categoryPrefix}comment`,
		{
			message0: "// %1",
			args0: [
				{
					type: "field_input",
					name: "COMMENT",
					spellcheck: false,
				},
			],
			previousStatement: null,
			nextStatement: null,
			inputsInline: true,
			colour: categoryColor,
		},
		(block) => {
			const COMMENT = block.getFieldValue("COMMENT");
			const code = `// ${COMMENT}`;
			return `${code}\n`;
		}
	);

	// comment stack
	registerBlock(
		`${categoryPrefix}commentstack`,
		{
			message0: "/* %1 %2 */",
			args0: [
				{
					type: "input_dummy",
				},
				{
					type: "input_statement",
					name: "BLOCKS",
				},
			],
			previousStatement: null,
			nextStatement: null,
			inputsInline: true,
			colour: categoryColor,
		},
		(block) => {
			const BLOCKS = javascriptGenerator.statementToCode(block, "BLOCKS");
			const code = `/*
${BLOCKS}*/`;
			return `${code}\n`;
		}
	);

	// jsDoc comment stack
	registerBlock(
		`${categoryPrefix}JSDocCommentstack`,
		{
			message0: "/** %1 %2 */",
			args0: [
				{
					type: "input_dummy",
				},
				{
					type: "input_statement",
					name: "BLOCKS",
					check: ["JSDoc"],
				},
			],
			previousStatement: null,
			nextStatement: null,
			inputsInline: true,
			colour: categoryColor,
		},
		(block) => {
			const BLOCKS = javascriptGenerator.statementToCode(block, "BLOCKS");
			const code = `/**
${BLOCKS}*/`;
			return `${code}\n`;
		}
	);

	// JSDoc comment
	registerBlock(
		`${categoryPrefix}JSDocComment`,
		{
			message0: "* %1",
			args0: [
				{
					type: "field_input",
					name: "COMMENT",
					spellcheck: false,
					check: ["JSDoc"],
				},
			],
			previousStatement: null,
			nextStatement: null,
			inputsInline: true,
			colour: categoryColor,
		},
		(block) => {
			const COMMENT = block.getFieldValue("COMMENT");
			const code = `* ${COMMENT}`;
			return `${code}\n`;
		}
	);

	// code ran?
	registerBlock(
		`${categoryPrefix}catch`,
		{
			message0: "code finished successfully? (runs code) %1 %2",
			args0: [
				{
					type: "input_dummy",
				},
				{
					type: "input_statement",
					name: "FUNC",
				},
			],
			output: "Boolean",
			inputsInline: true,
			colour: categoryColor,
		},
		(block) => {
			const FUNC = javascriptGenerator.statementToCode(block, "FUNC");
			return [
				`await (async () => { try { ${FUNC} return true; } catch { return false; } })()`,
				javascriptGenerator.ORDER_ATOMIC,
			];
		}
	);
}

export default register;
