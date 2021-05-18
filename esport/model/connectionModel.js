class Connection{

    constructor(connectionId, connectionName, connectionTopic,img,host, date, time, location, details) {
        this.connectionId = connectionId;
        this.connectionName = connectionName;
        this.connectionTopic = connectionTopic;
        this.img = img;
        this.host = host;
        this.date = date;
        this.time = time;
        this.location = location;
        this.details = details;
    }

    getHost(){
        return this.host;
    }
    
    setHost(value){
        this.host = value;
    }
    getImg(){
        return this.img;
    }
    setImg() {
        this.img = value;
    }
    getConnectionID() {
        return this.connectionId;
    }
    setConnectionID(value) {
        this.connectionId = value;
    }
    getConnectionName() {
        return this.connectionName;
    }
    setConnectionName(value) {
        this.connectionName = value;
    }
    getConnectionTopic() {
        return this.connectionTopic;
    }
    setConnectionTopic(value) {
        this.connectionTopic = value;
    }
    getDetails() {
        return this.details;
    }
    setDetails(value) {
        this.details = value;
    }
    getDate() {
        return this.date;
    }
    setDate(value) {
        this.date = value;
    }
    getTime() {
        return this.time;
    }
    setTime(value) {
        this.time = value;

    }
    getLocation() {
        return this.location;
    }
    setLocation(value){
        this.location = value;
    }
}

module.exports = Connection;