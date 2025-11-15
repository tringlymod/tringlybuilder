<script>
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher()

	export let fileName = "";
	export let id = "extensionID";
	export let name = "Extension";
	export let description = "";
	export let by = "BY <https://www.example.com?author=by>";
	export let original = "ORIGINAL <https://www.example.com?author=original>";
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
								<label >
									File name
									<br>
									<input type="text" bind:value={fileName}>
								</label>
								<label >
									ID
									<br>
									<input type="text" bind:value={id}>
								</label>
									<br>
								<label >
									NAME
									<br>
									<input type="text" bind:value={name}>
								</label>
									<br>
								<label >
									DESCRIPTION
									<br
									><input type="text" bind:value={description}>
								</label>
									<br>
								<label >
									BY
									<br>
									<input type="text" bind:value={by}>
								</label>
									<br>
								<label >
									ORIGINAL
									<br>
									<input type="text" bind:value={original}>
								</label>
									<br>
								<label >
									LICENSE
									<br>
									<input type="text" bind:value={license}>
								</label>
							</div>
							<div
									style="display:flex;flex-direction:row;align-items:center;"
							>
							</div>
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