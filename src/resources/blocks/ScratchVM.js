import javascriptGenerator from "../javascriptGenerator";
import registerBlock from "../register";
import Blockly from "blockly/core";

const categoryPrefix = "ScratchVM_";
const TWColor = "#FF5050";
const PMColor = "#25CCFF";

function register() {
	//is mouse down?
	registerBlock(
		`${categoryPrefix}mousedown`,
		{
			message0: `is mouse down?`,
			args0: [],

			output: "Boolean",
			inputsInline: true,
			colour: TWColor,
		},
		(block) => {
			return [
				`Scratch.vm.runtime.ioDevices.mouse.getIsDown()`,
				javascriptGenerator.ORDER_ATOMIC,
			];
		}
	);

	//get username
	registerBlock(
		`${categoryPrefix}username`,
		{
			message0: `get username`,
			args0: [],

			output: "String",
			inputsInline: true,
			colour: TWColor,
		},
		(block) => {
			return [
				`Scratch.vm.runtime.ioDevices.userData.getUsername()`,
				javascriptGenerator.ORDER_ATOMIC,
			];
		}
	);

	//logged in?
	registerBlock(
		`${categoryPrefix}loggedin`,
		{
			message0: `logged in?`,
			args0: [],

			output: "Boolean",
			inputsInline: true,
			colour: PMColor,
		},
		(block) => {
			return [
				`Scratch.vm.runtime.ioDevices.userData.getLoggedIn()`,
				javascriptGenerator.ORDER_ATOMIC,
			];
		}
	);

	// is penguinmod?
	registerBlock(
		`${categoryPrefix}ispenguinmod`,
		{
			message0: "is penguinmod?",
			args0: [],
			output: "Boolean",
			inputsInline: true,
			colour: PMColor,
		},
		(block) => {
			return [
				`Boolean(Scratch.extensions.isPenguinMod)`,
				javascriptGenerator.ORDER_ATOMIC,
			];
		}
	);
}

export default register;
