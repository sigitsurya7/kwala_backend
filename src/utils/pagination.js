export function getPaginationParams(query) {
    const page = parseInt(query.page) || 1
    const perPage = parseInt(query.perPage) || 10
    const offset = (page - 1) * perPage
    return { page, perPage, offset }
}  