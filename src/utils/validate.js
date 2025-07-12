export const checkValidData = (email, passowrd)=>{
    const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(passowrd);

    if(!isEmailValid){
        return "Please enter a valid email address";
    }
    if(!isPasswordValid){
        return "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number";
    }
}