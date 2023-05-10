import { createSignal } from "solid-js";

export const Counter = () => {
    const [count, setCount] = createSignal(0);
    const incrCount = () => setCount((count) => count + 1);

    return (
        <div>
            <h1>Counter</h1>
            <p>Count: {count()}</p>
            <button onClick={incrCount}>Increment</button>
        </div>
    );
};
