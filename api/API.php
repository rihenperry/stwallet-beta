
<?php
		
	$selectedTab="User Interface";
	include("header.php");

?>

	
<div style="text-align: center;padding-top: 2%;color: #25A2DC;"><h1>User Interface API And Features</h1>
	</div>
	<div id="accordion" style="width: 96%;float: left;padding: 2%;">
	
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/register</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{
		
	"first_name" :"test" ,
							  
	"last_name" :"test1" ,
							  
	"email" :"test@gmail.com" ,
							  
	"password" :"123456" ,
							  
	"confirm_new_password" :"123456" ,
							  
	"country" :"India" ,
							  
	"flag" :1 ,
							  
	"referral" :test ,
							  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Data type</th>
						</tr>
					</thead>
					<tr>
						<td>first_name</td>
						<td>test</td>
						<td>first_name of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>last_name</td>
						<td>test</td>
						<td>last_name of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>password</td>
						<td>123456</td>
						<td>six char of password</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>confirm_new_password</td>
						<td>123456</td>
						<td>six char of password</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>country</td>
						<td>India</td>
						<td>country</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>flag</td>
						<td>1</td>
						<td>flag</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>Number</td>
					</tr>
					<tr>
						<td>mobile_number</td>
						<td>123456789</td>
						<td>mobile_number</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>Number</td>
					</tr>
					<tr>
						<td>referral</td>
						<td>abc</td>
						<td>referral</td>
						<td style="text-align: center;"><i class="fa fa-times"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
					</table>
					
				</div>
			</div>
		</div>



<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/login</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{
		
	"password": "123456",
	  
	"email": "test@gmail.com",
							  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>
					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>password</td>
						<td>123456</td>
						<td>six char of password</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>					
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
					</table>
					
				</div>
			</div>
		</div>	


<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/setUserDetails</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{			
	  
	"email": "test@gmail.com",

	"first_name": "test",
	
	"last_name": "test",

	"gender": "male/female",
	
	"address1": "test....",

	"address2": "test....",

	"country": "India",
	
	"state": "Maharashtra",

	"zip": "123456",

	"city": "Mumbai",
	
	"mobile_number": "123456789",

	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>		
					<tr>
						<td>first_name</td>
						<td>test</td>
						<td>first name of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>					
					<tr>
						<td>last_name</td>
						<td>test</td>
						<td>Last name of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>	
					<tr>
						<td>gender</td>
						<td>male/female</td>
						<td>Gender of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>		
					<tr>
						<td>address1</td>
						<td>test.....</td>
						<td>Address of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>	
					<tr>
						<td>address2</td>
						<td>test...</td>
						<td>Address of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>	
					<tr>
						<td>country</td>
						<td>India</td>
						<td>country of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>	
					<tr>
						<td>state</td>
						<td>Maharashtra</td>
						<td>state of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>	
					<tr>
						<td>city</td>
						<td>Mumbai</td>
						<td>city of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>	
					<tr>
						<td>zip</td>
						<td>123456</td>
						<td>zip code of user's city</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>Number</td>
					</tr>	
					<tr>
						<td>mobile_number</td>
						<td>123456789</td>
						<td>Mobile no of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>Number</td>
					</tr>	
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
					</table>
					
				</div>
			</div>
		</div>	
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/UserDetails</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{			
	  
	"email": "test@gmail.com",
							  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>								
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
					</table>
					
				</div>
			</div>
		</div>
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/currencyPrefrence</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{			
	  
	"email": "test@gmail.com",
	
	 "currency_code":"INR/Indian Rupee",
							  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>currency_code</td>
						<td>INR/Indian Rupee</td>
						<td>Rupee of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>								
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
					</table>
					
				</div>
			</div>
		</div>	
		


<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/forgotPassword</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{			
	  
	"email": "test@gmail.com",
	
	"flag":"1",
							  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>	
					<tr>
						<td>flag</td>
						<td>1</td>
						<td>flag</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>Number</td>
					</tr>
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
					</table>
					
				</div>
			</div>
		</div>

<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/resetpassword</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{			
	  
	"email": "test@gmail.com",
	
	 "flag":"1",
	  
	"confirm_password":"123456",
  
	"password":"123456",
  
	"auth":"123",
							  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>	
					<tr>
						<td>flag</td>
						<td>1</td>
						<td>flag</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>Number</td>
					</tr>
					<tr>
						<td>password</td>
						<td>123456</td>
						<td>six char of password</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>confirm_new_password</td>
						<td>123456</td>
						<td>six char of password</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>auth</td>
						<td>123</td>
						<td>generate from server</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
					</table>
					
				</div>
			</div>
		</div>

<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/changePassword</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{			
	 "email": "test@gmail.com",
	 
	"old_password":"1234561",
	  
	"new_password":"123456",
	  
	"confirm_password":"123456",
							  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>	
					
					<tr>
						<td>old_password</td>
						<td>123456</td>
						<td>six char of password</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>new_password</td>
						<td>123456</td>
						<td>six char of password</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>confirm_password</td>
						<td>123456</td>
						<td>six char of password</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
					</table>
					
				</div>
			</div>
		</div>
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/setAppId</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	"email": "test@gmail.com",
	  
	"appId":"asd",
							  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>	
					
					<tr>
						<td>appId</td>
						<td>asd</td>
						<td>take from user </td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>

					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
					</table>
					
				</div>
			</div>
		</div>
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/getAppId</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	"email": "test@gmail.com",
	  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>	
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
					</table>
					
				</div>
			</div>
		</div>
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/creditAmount</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	"email": "test@gmail.com",
	
	 "amount": "10",
	  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>amount</td>
						<td>10</td>
						<td>amount of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>number</td>
					</tr>	
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
					</table>
					
				</div>
			</div>
		</div>
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/editProfilePic</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	"email": "test@gmail.com",
	
	"profile_pic": "fsadfwfcwdxs132ed",
	 
	"extension": "jpg",
	  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>profile_pic</td>
						<td>fsadfwfcwdxs132ed</td>
						<td>base64 string</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>extension</td>
						<td>jpg, png, etc</td>
						<td>extension of the image</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>	
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
					</table>
					
				</div>
			</div>
		</div>
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/deductAmount</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	"email": "test@gmail.com",
	
	 "amount": "10",
	  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>amount</td>
						<td>10</td>
						<td>amount of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>number</td>
					</tr>	
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
					</table>
					
				</div>
			</div>
		</div>
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/addPurchases</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	"email": "test@gmail.com",
	
	 "amount": "10",
	  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>amount</td>
						<td>10</td>
						<td>purchase amount(Add)</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>number</td>
					</tr>	
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
					</table>
					
				</div>
			</div>
		</div>
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/deductPurchases</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	"email": "test@gmail.com",
	
	 "amount": "10",
	  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>amount</td>
						<td>10</td>
						<td>purchase amount(Deduct)</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>number</td>
					</tr>	
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
					</table>
					
				</div>
			</div>
		</div>
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/addCashback</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	"email": "test@gmail.com",
	
	 "amount": "10",
	  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>amount</td>
						<td>10</td>
						<td>cashback amount (Add)</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>number</td>
					</tr>	
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
					</table>
					
				</div>
			</div>
		</div>

<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/deductCashback</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	"email": "test@gmail.com",
	
	 "amount": "10",
	  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>amount</td>
						<td>10</td>
						<td>cashback amount (Deduct)</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>number</td>
					</tr>	
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
					</table>
					
				</div>
			</div>
		</div>
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/addAffEarning</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	"email": "test@gmail.com",
	
	 "amount": "10",
	  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>amount</td>
						<td>10</td>
						<td>Affiliate earning (Add)</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>number</td>
					</tr>	
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
					</table>
					
				</div>
			</div>
		</div>
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/deductAffEarning</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	"email": "test@gmail.com",
	
	 "amount": "10",
	  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>amount</td>
						<td>10</td>
						<td>Affiliate earning (Deduct)</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>number</td>
					</tr>	
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
					</table>
					
				</div>
			</div>
		</div>
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/addSales</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	"email": "test@gmail.com",
	
	 "amount": "10",
	  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>amount</td>
						<td>10</td>
						<td>Sales (Add)</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>number</td>
					</tr>	
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
					</table>
					
				</div>
			</div>
		</div>
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/deductSales</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	"email": "test@gmail.com",
	
	 "amount": "10",
	  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>amount</td>
						<td>10</td>
						<td>Sales (Deduct)</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>number</td>
					</tr>	
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
					</table>
					
				</div>
			</div>
		</div>
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/addTrade</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	"email": "test@gmail.com",
	
	 "amount": "10",
	  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>amount</td>
						<td>10</td>
						<td>Trade fees (Add)</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>number</td>
					</tr>	
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
					</table>
					
				</div>
			</div>
		</div>
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/deductTrade</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	"email": "test@gmail.com",
	
	 "amount": "10",
	  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>amount</td>
						<td>10</td>
						<td>Trade fees (Deduct)</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>number</td>
					</tr>	
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
					</table>
					
				</div>
			</div>
		</div>
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/addTotalKeywordIncome</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	"email": "test@gmail.com",
	
	 "amount": "10",
	  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>amount</td>
						<td>10</td>
						<td>Total keywork income (Add)</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>number</td>
					</tr>	
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
					</table>
					
				</div>
			</div>
		</div>
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/deductTotalKeywordIncome</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	"email": "test@gmail.com",
	
	 "amount": "10",
	  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>amount</td>
						<td>10</td>
						<td>Total keyword income (Deduct)</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>number</td>
					</tr>	
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
					</table>
					
				</div>
			</div>
		</div>
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/addBlockedPendingWithdrawals</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	"email": "test@gmail.com",
	
	 "amount": "10",
	  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>amount</td>
						<td>10</td>
						<td>blocked Pending Withdrawal (Add)</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>number</td>
					</tr>	
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
					</table>
					
				</div>
			</div>
		</div>
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/deductBlockedPendingWithdrawals</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	"email": "test@gmail.com",
	
	 "amount": "10",
	  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>amount</td>
						<td>10</td>
						<td>blocked Pending Withdrawal (Deduct)</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>number</td>
					</tr>	
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
					</table>
					
				</div>
			</div>
		</div>
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/addApprovedWithdrawals</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	"email": "test@gmail.com",
	
	 "amount": "10",
	  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>amount</td>
						<td>10</td>
						<td>Approved Withdrawals (Add)</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>number</td>
					</tr>	
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
					</table>
					
				</div>
			</div>
		</div>
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/deductApprovedWithdrawals</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	"email": "test@gmail.com",
	
	 "amount": "10",
	  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>amount</td>
						<td>10</td>
						<td>Approved Withdrawals (Deduct)</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>number</td>
					</tr>	
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
					</table>
					
				</div>
			</div>
		</div>
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/addTotalAppIncome</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	"email": "test@gmail.com",
	
	 "amount": "10",
	  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>amount</td>
						<td>10</td>
						<td>App income (Add)</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>number</td>
					</tr>	
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
					</table>
					
				</div>
			</div>
		</div>
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/addBlockedForBids</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	"email": "test@gmail.com",
	
	 "amount": "10",
	  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>amount</td>
						<td>10</td>
						<td>Blocked For Bids (Add)</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>number</td>
					</tr>	
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
					</table>
					
				</div>
			</div>
		</div>
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/deductBlockedForBids</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	"email": "test@gmail.com",
	
	 "amount": "10",
	  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>amount</td>
						<td>10</td>
						<td>Blocked For Bids (Deduct)</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>number</td>
					</tr>	
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
					</table>
					
				</div>
			</div>
		</div>
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/firstBuy</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	"email": "test@gmail.com",
	
	 "amount": "10",
	  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>amount</td>
						<td>1</td>
						<td>Status of first buy</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>number</td>
					</tr>	
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
			
					</table>
					
				</div>
			</div>
		</div>
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/allTransactions</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	"email": "test@gmail.com",
		 	  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					
					</table>
					
				</div>
			</div>
		</div>

<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/admin/addQualifiedSearchesPending</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	"email": "test@gmail.com",
	
	 "amount": "10",
	  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>amount</td>
						<td>1</td>
						<td>No of Qualifeid Searches (Add)</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>number</td>
					</tr>	
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					
					</table>
					
				</div>
			</div>
		</div>		

<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;    /secure/admin/resetQualifiedSearches</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	No data
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>No Parameters</td>
						<td>No Value</td>
						<td>No Description</td>
						<td style="text-align: center;"></td>
						<td>No Datatype</td>
					</tr>
				
					
					</table>
					
				</div>
			</div>
		</div>		

<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/admin/deductunQualifiedSearches</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	"email": "test@gmail.com",
	
	 "amount": "10",
	  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>amount</td>
						<td>1</td>
						<td>No of unQualifeid Searches (Deduct)</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>number</td>
					</tr>	
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					
					</table>
					
				</div>
			</div>
		</div>			
		
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/admin/getExpenceTransactions</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	 "email": "retestringdemoapp@gmail.com",
	 
	 "to": '',
		
	"from": '1/1/2016',
		
	"number":"10",
		
	"type":"All",
	  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-times"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>to</td>
						<td>1/1/2016</td>
						<td>date of user</td>
						<td style="text-align: center;"><i class="fa fa-times"></i></td>
						<td>date</td>
					</tr>	
					<tr>
						<td>from</td>
						<td>1/1/2016</td>
						<td>date of user</td>
						<td style="text-align: center;"><i class="fa fa-times"></i></td>
						<td>date</td>
					</tr>
					<tr>
						<td>number</td>
						<td>10</td>
						<td>number  of user</td>
						<td style="text-align: center;"><i class="fa fa-times"></i></td>
						<td>number</td>
					</tr>
					<tr>
						<td>type</td>
						<td>all</td>
						<td></td>
						<td style="text-align: center;"><i class="fa fa-times"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					
					</table>
					
				</div>
			</div>
		</div>		

<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/admin/getIncomeTransactions</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	 "email": "retestringdemoapp@gmail.com",
	 
	 "to": '',
		
	"from": '1/1/2016',
		
	"number":"10",
		
	"type":"All",
	  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-times"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>to</td>
						<td>1/1/2016</td>
						<td>date of user</td>
						<td style="text-align: center;"><i class="fa fa-times"></i></td>
						<td>date</td>
					</tr>	
					<tr>
						<td>from</td>
						<td>1/1/2016</td>
						<td>date of user</td>
						<td style="text-align: center;"><i class="fa fa-times"></i></td>
						<td>date</td>
					</tr>
					<tr>
						<td>number</td>
						<td>10</td>
						<td>number  of user</td>
						<td style="text-align: center;"><i class="fa fa-times"></i></td>
						<td>number</td>
					</tr>
					<tr>
						<td>type</td>
						<td>all</td>
						<td></td>
						<td style="text-align: center;"><i class="fa fa-times"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					
					</table>
					
				</div>
			</div>
		</div>					
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;    /secure/admin/getActiveEmails</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	"flag": "1",
	  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>flag</td>
						<td>1</td>
						<td>flag</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>Number</td>
					</tr>
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					
					</table>
					
				</div>
			</div>
		</div>	

<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/admin/userManage</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	"email": "test@gmail.com",
	  
	"order": "1",
	  
	"column": "1",
	  
	"skip": "1",
	  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>					
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-times"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>order</td>
						<td>1/1/2016</td>
						<td>number  of order</td>
						<td style="text-align: center;"><i class="fa fa-times"></i></td>
						<td>number</td>
					</tr>	
					<tr>
						<td>column</td>
						<td>1</td>
						<td>column  of user</td>
						<td style="text-align: center;"><i class="fa fa-times"></i></td>
						<td>number</td>
					</tr>
					<tr>
						<td>skip</td>
						<td>1</td>
						<td>skip  of user</td>
						<td style="text-align: center;"><i class="fa fa-times"></i></td>
						<td>number</td>
					</tr>
					
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					
					</table>
					
				</div>
			</div>
		</div>	

<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;   /secure/admin/userKwdPurchaseTrans</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	 "email": "retestringdemoapp@gmail.com",
	 
	"from": "1/1/2016",
	  
	"to": "",
	  
	"number": 10,
	  
	"mode":"All",
	  
	"publicKey":"###############" ,
							  
	"signature" :"##############" ,
							
	}

</code>
</pre>
					</div>		
				</div>		
			<div class="api-area">
				<table class="table table-hover" style="width: 74%;">
					<thead style="background-color: #B0AAAA;">
						<tr>
							<th>Parameters</th>
							<th>Value</th>
							<th>Description</th>
							<th>Mandatory</th>
							<th>Datatype</th>
						</tr>
					</thead>	
					<tr>
						<td>email</td>
						<td>test@fmail.com</td>
						<td>email of user</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>from</td>
						<td>1/1/2016</td>
						<td>date of user</td>
						<td style="text-align: center;"><i class="fa fa-times"></i></td>
						<td>date</td>
					</tr>	
					<tr>
						<td>to</td>
						<td>1/1/2016</td>
						<td>date of user</td>
						<td style="text-align: center;"><i class="fa fa-times"></i></td>
						<td>date</td>
					</tr>	
					<tr>
						<td>number</td>
						<td>10</td>
						<td>number  of user</td>
						<td style="text-align: center;"><i class="fa fa-times"></i></td>
						<td>number</td>
					</tr>
					<tr>
						<td>mode</td>
						<td>all</td>
						<td>all</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>Number</td>
					</tr>
					<tr>
						<td>publicKey</td>
						<td>######</td>
						<td>publicKey</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					
					<tr>
						<td>signature</td>
						<td>######</td>
						<td>signature</td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					
					</table>
					
				</div>
			</div>
		</div>	
</div>	

