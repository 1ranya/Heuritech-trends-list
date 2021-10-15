export class Trends {
    async getTrendsByParms(gender, growth, zone) {
        const response = await fetch(`/api/trends?gender=${gender}&sort_by=${growth}&geozone=${zone}`)
        let trends = await response.json()
        trends = trends ??  []
        return trends.trends;
    }

    async getTrends() {
        const response = await fetch('/api/trends')
        let trends = await response.json()
        trends = trends ??  []
        return trends;
    }

    async getFieldsSort() {
        let trends = await this.getTrends()
        trends = trends ??  []
        const fieldExemple = trends.trends[0]

        const fields = Object.keys(fieldExemple).filter(key => {
            return  key !== 'id' && key !== 'image' && key !== 'is_favorite'
        })
        return fields;
    }

    async getLoadedMoreData (gender, growth, zone, pageSize) {
        const response = await fetch(`/api/trends?gender=${gender}&sort_by=${growth}&geozone=${zone}&page_size=${pageSize}`)
        return await response.json()
    }

    async getFavorites (gender, sort, zone) {
        const response = await fetch(`/api/favorite_trends?gender=${gender}&sort_by=${sort}&geozone=${zone}`)
        const favorites = await response.json()
        return await favorites.trends
    }

    async addToFavorites (id) {
        const requestOptions = {
            method: 'PUT'
        }
        const response = await fetch(`/api/favorite_trends/${id}`, requestOptions)
        return response
    }

    async deleteFavorites (id) {
        const requestOptions = {
            method: 'DELETE'
        }
        const response = await fetch(`/api/favorite_trends/${id}`, requestOptions);
        return await response
    }

    async getImages(id) {
        const images = await fetch(`/api/moodboards/${id}`); 
        return await images.json()
    }
}
export const trends = new Trends();