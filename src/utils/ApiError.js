class ApiError extends Error {
  constructor(message="Something went Wrong", statusCode,
    errors=[],statck="") 
    

   {
    super(message);  //override
    this.statusCode = statusCode;
    this.data=null;
    this.message=message;
    this.success=false;
    this.errors=errors

    if(statck){
        this.stack=statck;
    }
    else{
        Error.captureStackTrace(this, this.constructor); // Capture the stack trace
    }
  }
}

export default ApiError;