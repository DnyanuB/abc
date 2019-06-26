var h = require("http");
var fs = require("fs");
var url = require("url");
var query = require("querystring");

console.log("Success");
//var url = u.parseurl()

function my(req,res)
{
	var u = url.parse(req.url);      //u.pathname,/u.method,
	console.log(u.pathname);
	res.write("Welcome Mr. mauli\n");
	switch(u.pathname)
	{
		case '/':
		fs.readFile("form.html",function(err,data)
			{
				if(err)
				{
					res.write("ERROR");
					console.log(err);
				}
				else
				{
					res.write(data);
					res.end();
				}
			})
			break;

		/*res.write("Hello........");
		//res.write(u.pathname);
		fs.readFile("form.html",function(err,data)
		{
			//res.write("Hello........");
			if(err)
			{
				res.write("Error");
				console.log(err);
			}
			else
			{	
				res.write(data);
				res.end();
			}
		})
		break;

		//case '/' :*/
		
		case "/login":
			var str="";
			req.on("data",function(d)
			{
				str+=d;					//req.on read data from form body elements and stored it in str
			});

			req.on("end",function()		//to execute the above data
			{
				var q=querystring.parse(str);
				fs.readFile("login.txt",function(err,data)
				{
					if(err)
					{
						resp.write("ERROR");
						console.log(err);
					}
					else
					{
						var str1=data.toString();	//convert array data into string
						var flag=false;

						var str2=str1.replace(/(\r\n|\n|\r)/gm,",");	//all values in 'login.txt' will come without
																		//',' and 'space' in single line and saperated by ','
						var arr=str2.split(",");	//str2=ab,	 a,		cd,	   c,	  ef,	 e					
						for(var i=0;i<arr.length;i++)	//arr[0] arr[1] arr[2] arr[3] arr[4] arr[5]
						{
							if(q.uname==arr[i])
							{
								if(q.pass==arr[i+1])
								{
									flag=true;
									break;
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

	}
	
}

var m = h.createServer(my);
m.listen(1000);
console.log("Server is listening on port number 1000");

