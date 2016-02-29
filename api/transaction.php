
<body>
<?php
$selectedTab="Transaction";
	include("header.php");
	
	?>
	<div style="text-align: center;padding-top: 2%;color: #25A2DC;"><h1>Transaction API And Features</h1>
	</div>
<div id="accordion" style="width: 96%;float: left;padding: 2%;">
	<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;/secure/transactions</h3>
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
	
	"type" : "",
	  
	"number": 10,  
	  
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
						<td>type</td>
						<td></td>
						<td></td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>string</td>
					</tr>
					<tr>
						<td>number</td>
						<td>10</td>
						<td>number  of user</td>
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
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;/secure/getUsersTotalTransactions</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	

	"email" : "swanand@gmail.com",
	  
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
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;/secure/insertUserTransaction</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	 
	 "sender":"swanand@gmail.com",
	 
	"receiver" : "prashant@gmail.com",
	
	"amount": 10,
	
	"type" : "trade",
	
	"desc" : "Test",
	
	"keyword" : "search",
	
	"payment_mode" : "bitcoin",
	
	"discount" : "1",
	
	"app_id" : "8",
	
	"commision" : "0.01",
	
	"origin_ip" : "",
	
	"usd" : 12,
	
	"sgd" : 21  
	  
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
						<td>sender</td>
						<td></td>
						<td></td>
						<td style="text-align: center;"><i class="fa fa-check"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>reciever</td>
						<td>App Developer Email</td>
						<td>email of reciever</td>
						<td style="text-align: center;"><i class="fa fa-times"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>amount</td>
						<td>0.00000100</td>
						<td>amount of user</td>
						<td style="text-align: center;"><i class="fa fa-times"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>type</td>
						<td>search_earning</td>
						<td>search_earning of user</td>
						<td style="text-align: center;"><i class="fa fa-times"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>desc</td>
						<td></td>
						<td></td>
						<td style="text-align: center;"><i class="fa fa-times"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>keyword</td>
						<td>hangover</td>
						<td>keyword search by keyword</td>
						<td style="text-align: center;"><i class="fa fa-times"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>payment_mode</td>
						<td>bitcoin</td>
						<td></td>
						<td style="text-align: center;"><i class="fa fa-times"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>discount</td>
						<td></td>
						<td></td>
						<td style="text-align: center;"><i class="fa fa-times"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>app_id</td>
						<td>4</td>
						<td>app_id of user</td>
						<td style="text-align: center;"><i class="fa fa-times"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>commission</td>
						<td></td>
						<td></td>
						<td style="text-align: center;"><i class="fa fa-times"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>origin_ip</td>
						<td>203.122.55.114</td>
						<td></td>
						<td style="text-align: center;"><i class="fa fa-times"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>usd</td>
						<td>435.41</td>
						<td>usd of user</td>
						<td style="text-align: center;"><i class="fa fa-times"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>sgd</td>
						<td>611.027834</td>
						<td>sgd of user</td>
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
		
</div>