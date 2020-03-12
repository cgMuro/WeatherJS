class Weather {
    constructor(city, state){
        this.apiKey = '5aa609ee7e51538d4caf849e21780f6c';   //'4d83d5736e9dd0fd5f5f6be8e1663e15'
        this.city = city;
        this.state = state;
    }


    async getWeather() {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric,${this.state}&appid=${this.apiKey}`);

        const responseData = await response.json();

        return responseData;
    }
    
    async getWeatherByCoord(lat, long) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${this.apiKey}`);
    
        const responseData = await response.json();
    
        return responseData;
    }   

    async getMultipleWeather(){
        const response = await fetch(`https://api.openweathermap.org/data/2.5/group?id=5391959,5128581,2643743,3173435,2950159,4155751,5368361&appid=${this.apiKey}`);
    
        const responseData = await response.json();
    
        return responseData;
    }

    async getWeatherById(id){
        const response = await fetch(`https://api.openweathermap.org/data/2.5/group?id=${id}&appid=${this.apiKey}`);
    
        const responseData = await response.json();
    
        return responseData;
    }

    //Change weather location
    changeLocation(city, state) {
        this.city = city;
        this.state = state;
    }
}