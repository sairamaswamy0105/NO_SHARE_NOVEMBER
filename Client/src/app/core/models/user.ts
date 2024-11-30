export interface UserLoginModel{
        userName:string;
        token:string;
}

export interface userModel{
        firstName:string| null;
        lastName:string| null;
        pincode:string| null;
        street:string| null;
        city:string| null;
        mail:string| null;
        phone_Number:string| null;
        dateOfBirth:Date| null;
        language:string| null;
        roleId:number| null;
}