import { Component, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { invoke } from "@tauri-apps/api/tauri";
import { Counter } from "./Counter";

import logo from "./logo.svg";

const App: Component = () => {
    const [fields, setFields] = createStore({ main: "", response: "" });

    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get("page");

    const handleHelloWorld = async () => {
        try {
            const response = await invoke("reverse_string", {
                event: fields.main || "nope",
            });
            setFields("response", `${response}`);
            console.log("response ", response);
        } catch (error) {
            console.log("error ", error);
        }
    };

    const openCounter = async () => {
        try {
            const response = await invoke("open_counter");
            console.log("response ", response);
        } catch (error) {
            console.log("error ", error);
        }
    };

    return (
        <div class="app">
            <Show when={page === null}>
                <header class="app-header">
                    <div class="component-wrapper">
                        <img src={logo} class="logo" alt="logo" />
                        <div class="inputs-container">
                            <input
                                onInput={(e) =>
                                    setFields("main", e.currentTarget.value)
                                }
                                placeholder="input for rust"
                                maxLength={48}
                            />
                            <button onClick={handleHelloWorld}>
                                Call Rust
                            </button>
                        </div>
                        <p>
                            response message:{" "}
                            {!!fields.response && `${fields.response}`}
                        </p>
                        <div>
                            <button onClick={openCounter}>Open counter</button>
                        </div>
                    </div>
                </header>
            </Show>

            <Show when={page === "counter"}>
                <div class="app-header component-wrapper">
                    <Counter />
                </div>
            </Show>
        </div>
    );
};

export default App;
