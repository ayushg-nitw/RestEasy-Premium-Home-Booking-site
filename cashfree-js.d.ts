declare module '@cashfreepayments/cashfree-js' {
    const load: (options: { mode: "sandbox" | "production" }) => Promise<any>;
    export { load };
}
