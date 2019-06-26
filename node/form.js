var h=require("http");
var url=require("url");
var fs=require("fs");
var querystring=require("querystring");

function s(req,resp)
{
	var u=url.parse(req.url);	//convert URL into tokens like pathname,method,querystring,postno
	console.log(u.pathname);
	//alert("Hawaaaaa");	

	switch(u.pathname)
		{
			case '/':
			
			fs.readFile("form.html",function(err,data)
			{
				if(err)
				{
					resp.write("ERROR");
					console.log(err);
					resp.end();
				}
				else
				{
					resp.write(data);
					resp.end();
				}
			})
			break;

			case "/login":
			var str="";
			req.on("data",function(d)
			{
				str+=d;					//req.on read data from form body elements and stored it in str
			});

			req.on("end",function()		//to execute the above data
			{
				var q=querystring.parse(str);
				//resp.write(q.uname);
				fs.readFile("login.txt",function(err,data)
				{
					if(err)
					{
						resp.write("ERROR");
						console.log(err);
						resp.end();
					}
					else
					{
						var str1=data.toString();	//convert array data into string
						var flag=false;
						resp.write("file is opened");
						var str2=str1.replace(/(\r\n|\n|\r)/gm,",");	//all values in 'login.txt' will come without
																		//',' and 'space' in single line and saperated by ','
						var arr=str2.split(",");	//str2=ab,	 a,		cd,	   c,	  ef,	 e					
						for(var i=0;i<arr.length;i++)	//arr[0] arr[1] arr[2] arr[3] arr[4] arr[5]
						{
							resp.write(q.);
							if(q.uname==arr[i])
							{
								if(q.pass==arr[i+1])
								{
									flag=true;
									//break;
								}
							}
						}
						if(flag==true)
						{
							fs.readFile("calc.html",function(err,data)
							{
								if(err)
								{
									console.log(err);
									resp.write("ERROR");
									resp.end();
								}
								else
								{
									resp.write(data);
									resp.end();
								}
							});
						}
						else
						{
							resp.write("VALIDATION FAILED");
							resp.end();
						}

					}

				});
			});
			break;

			case "/login/calc":
			var str3="";
			req.on("data",function(d)
			{
				str3+=d;
			});
			req.on("end",function()
			{
				var p=querystring.parse(str3);
				var sum=parseInt(p.num1)+parseInt(p.num2);
				resp.write("Sum :: "+sum);
				resp.end();
			});
			break;
		}
	
}


function my(req,res)
{
	console.log("This is my first function..");
	var u=url.parse(req.url);
	console.log(u.pathname);
	//resp.write("Hello");

	switch(u)
	{
		case '/':fs.readFile("form.html"),function(err,data)
		{
			if(err)
			{
				console.log("Error");
				console.log(err);
			}	
			else
			{
				resp.write(data);
				resp.end();
			}
		}
		break;
	}

}


var server=h.createServer(s);
server.listen(2000);
console.log("Server started successfully, Running on PORT::2000");

