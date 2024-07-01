import citiesRepository from '../repository/worldCitiesRespository'

exports.getAllCitiesUseCase = (ctx) => {
    ctx.body = citiesRepository.getAllCitiesRepository()
    return ctx
}

exports.getCitiesByCountryUseCase = (ctx) => {
    const cities = citiesRepository.searchCitiesByCountryName(ctx.params.country)
    if(!cities){
        ctx.body = {
            "message": "No se encontraron ciudades para el país ingresado"
        }
        return ctx
    }
    else{ctx.body = cities
        return ctx
    }
    
}

exports.getCitiesByCityNameAndCountryUseCase = (ctx) => {
    ctx.body = citiesRepository.searchCityByCityNameAndCountry(ctx.params.city, ctx.params.country)
    return ctx
}