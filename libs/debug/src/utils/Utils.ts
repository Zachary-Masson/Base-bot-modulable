const Type: object = {
    error: 124,
    success: 82,
    actions: 22,
    modules: 18,
    module: 171,
    api: 184,
    title: 21
}

export const VerifyTypeExist = (type: string) => {
    // @ts-ignore
    return !!Type[type];
}

export const ReturnColor = (type: "error" | "success" | "actions" | "modules" | "module" | "api" | "title") => {
    // @ts-ignore
    return Type[type];
}