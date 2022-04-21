export interface ModulesManifestOptions {
    name: string,
    tag: string,
    config?: object,
    useDatabase?: boolean
    interactions?: {
        commands?: [],
        buttons?: []
    },
    packages?: []
}