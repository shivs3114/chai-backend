class ApiError extends Error {
  constructor(message="Something went Wrong", statusCode,
    errors=[],stack="") 
  

   {
    super(message);  //override
    this.statusCode = statusCode;
    this.data=null;
    this.message=message;
    this.success=false;
    this.errors=errors

    if(statck){
        this.stack=stack;
    }
    else{
        Error.captureStackTrace(this, this.constructor); // Capture the stack trace
    }
  }
}

export  {ApiError};