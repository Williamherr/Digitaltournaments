class User{

    constructor(userId,fName,lName,email,pass) {
       this.userID = userId;
       this.fName = fName;
       this.lName = lName;
       this.email = email;
       this.pass = pass;

    }

    getUserID(){
        return this.userId;
    }
    setUserID(value){
        this.userId = value;
    }
    getfName(){
        return this.fName;
    }
    setfName(value){
        this.fName = value;
    }
    getlName() {
        return this.lName;
    }
    setlName(value){
        this.lName = value;
    }
    getEmail(){
        return this.email;
    }
    setEmail(value){
        this.email = value;
    }
    getPass(){
        return this.pass;
    }
    setPass(pass){
        this.pass = pass;
    }

    // Optional
    // getAddress1(){
    //     return this.address1;
    // }
    // setAddress1(value) {
    //     this.address1 = value;
    // }
    // getAddress2(){
    //     return this.address2;
    // }
    // setAddress2(value) {
    //     this.address2 = value;
    // }
    // getCity(){
    //     return this.city;
    // }
    // setCity(value) {
    //     this.city = value;
    // }
    // getState(){
    //     return this.state;
    // }
    // getState(value) {
    //     this.state = value;
    // }
    // getZipCode(){
    //     return this.zipCode;
    // }
    // setZipCode(value) {
    //     this.zipCode = value;
    // }
    // getCountry(){
    //     return this.country;
    // }
    // setCountry(value) {
    //     this.country = value;
    // }
}   

module.exports = User;
