export const global = {
    currentPage: window.location.pathname,
    search: {
        term: '',
        type: '',
        page: 1,
        totalPages: 1,
        totalResults: 0,
    },
    api: {
        apiUrl: 'https://api.themoviedb.org/3/',
        apiKey: '' // paste your API key here
    }
}
