<script>
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	export let fileName = "";
	export let id = "extensionID";
	export let name = "Extension";
	export let by = {
		name: "BY",
		url: "https://www.example.com?author=by",
	};
	export let original = {
		name: "ORIGINAL",
		url: "https://www.example.com?author=original",
	};
	export let description = "";
	export let license = "MIT";

	function event() {
		dispatch("completed", {
			fileName,
			id,
			name,
			description,
			by,
			original,
			license,
		});
	}
	function cancel() {
		dispatch("cancel");
	}
</script>

<div class="bg">
	<div class="modal">
		<div class="modal-title">
			<p>Extension Info</p>
		</div>
		<div class="modal-content">
			<div
				style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%"
			>
				<div>
					<label>
						File name
						<input type="text" bind:value={fileName} />
					</label>
					<br /><br />
					<label>
						ID
						<input type="text" bind:value={id} />
					</label>
					<br />
					<label>
						NAME
						<input type="text" bind:value={name} />
					</label>
					<br />
					<label>
						DESCRIPTION
						<input type="text" bind:value={description} />
					</label>
					<br />
					<label>
						BY
						<div>
							<input type="text" bind:value={by.name} />
							<br />
							<input type="text" bind:value={by.url} />
						</div>
					</label>
					<br />
					<label>
						ORIGINAL
						<div>
							<input type="text" bind:value={original.name} />
							<br />
							<input type="text" bind:value={original.url} />
						</div>
					</label>
					<br />
					<label for="license">
						LICENSE
						<input type="text" list="license" bind:value={license} />
						<datalist id="license" name="license">
							<option value="Apache 2.0">Apache 2.0</option>
							<option value="CC 0">CC 0</option>
							<option value="CC BY 2.5">CC BY 2.5</option>
							<option value="CC BY 4.0">CC BY 4.0</option>
							<option value="CC BY SA 4.0">CC BY SA 4.0</option>
							<option value="GPL 3.0">GPL 3.0</option>
							<option value="LGPL 3.0">LGPL 3.0</option>
							<option value="MIT">MIT</option>
							<option value="MPL 2.0">MPL 2.0</option>
							<option value="OFL Lobster">OFL Lobster</option>
						</datalist>
					</label>
				</div>
				<div style="display:flex;flex-direction:row;align-items:center;"></div>
			</div>
		</div>
		<div class="modal-buttons">
			<button class="button-cancel" on:click={cancel}>Cancel</button>
			<div style="margin-left:6px" />
			<button class="button-accept" on:click={event}>OK</button>
			<div style="margin-left:24px" />
		</div>
	</div>
</div>

<style>
	.button-cancel {
		border: 1px solid rgba(0, 0, 0, 0.15);
		background: white;
		color: black;
		font-weight: bold;
		padding: 0.75rem 1rem;
		border-radius: 0.25rem;
		font-size: 0.85rem;
		cursor: pointer;
	}
	.button-accept {
		border: 1px solid #777777;
		background: #666666;
		color: white;
		font-weight: bold;
		padding: 0.75rem 1rem;
		border-radius: 0.25rem;
		font-size: 0.85rem;
		cursor: pointer;
	}

	label {
		font-weight: bold;
		font-size: 0.625rem;
		user-select: none;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.bg {
		position: fixed;
		left: 0px;
		top: 0px;
		width: 100%;
		height: 100%;
		background: #555555b0;
		z-index: 999999;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.modal {
		width: 60%;
		height: 50%;
		outline: 4px solid hsla(0, 100%, 100%, 0.25);
		border-radius: 0.5rem;
		background: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;
	}
	:global(body.dark) .bg {
		background-color: #333333b0;
	}
	:global(body.dark) .modal {
		background-color: #111;
	}

	.modal-title {
		width: 100%;
		height: 10%;
		background: #666666;
		color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	:global(body.dark) .modal-title {
		background-color: #333;
	}
	.modal-content {
		width: 100%;
		height: 75%;
		overflow: auto;
	}
	.modal-buttons {
		width: 100%;
		height: 15%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: right;
	}
</style>
