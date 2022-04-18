module.exports = (message) => {
    console.error(new Error(message))
    process.exit(1)
}