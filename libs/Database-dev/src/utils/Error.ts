export default (message: string) => {
    console.error(new Error(message))
    process.exit(1)
}