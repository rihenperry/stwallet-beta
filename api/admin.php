
<body>
<?php

	$selectedTab="Admin";
	include("header.php");
	
	?>
	<div style="text-align: center;padding-top: 2%;color: #25A2DC;"><h1>Admin API And Features</h1>
	</div>
	<div id="accordion" style="width: 96%;float: left;padding: 2%;">
	

<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;/secure/admin/paymentModeCount</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	

	"mode": "bitcoin"
	  
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
						<td>mode</td>
						<td>bitcoin</td>
						<td>bitcoin</td>
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

<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;/secure/search/recentSearches</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	

	"email" : "swanand@gmail.com",
	 
	"searches" : '
	
	"trans_id":"POOL_1456150879567_973",
	
	"trans_time":"2016:02:22 08:21:19",
	
	"sender":"POOL",
	
	"reciever":"searchUser@searchtrade.com",
	
	"type":"search_earning",
	
	"keyword":"hangover",
	
	"desc":"",
	
	"payMode":"",
	
	"discount":"",
	
	"commission":"",
	
	"origin_ip":"203.122.55.114",
	
	"amount":"0.00000100",
	
	"payout":"0.00000400",
	
	"usd":435.41,
	
	"sgd":611.027834,
	
	"app_id":4'
	  
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
						<td>searches</td>
						<td></td>
						<td></td>
						<td style="text-align: center;"><i class="fa fa-times"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>trans_id</td>
						<td>POOL_1456150879567_973</td>
						<td>Id of user</td>
						<td style="text-align: center;"><i class="fa fa-times"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>sender</td>
						<td>POOL</td>
						<td></td>
						<td style="text-align: center;"><i class="fa fa-times"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>reciever</td>
						<td>searchUser@searchtrade.com</td>
						<td>email of reciever</td>
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
						<td>keyword</td>
						<td>hangover</td>
						<td>searches keyword of user</td>
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
						<td>payMode</td>
						<td></td>
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
						<td>amount</td>
						<td>0.00000100</td>
						<td>amount of user</td>
						<td style="text-align: center;"><i class="fa fa-times"></i></td>
						<td>String</td>
					</tr>
					<tr>
						<td>payout</td>
						<td>0.00000400</td>
						<td>payout of user</td>
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
						<td>app_id</td>
						<td>4</td>
						<td>app_id of user</td>
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

<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;/secure/search/updateLastHourValue</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	

	"email" : "swanand@gmail.com"
	  
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
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;/secure/search/addunQualifiedSearches</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	"email": "prashant.bitstreet@gmail.com",
	
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
					
					</table>
					
				</div>
			</div>
		</div>			
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;/secure/search/deductQualifiedSearches</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	"email": "prashant.bitstreet@gmail.com",
	
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
					
					</table>
					
				</div>
			</div>
		</div>			
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;/secure/search/deductSearchEarning</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	"email": "prashant.bitstreet@gmail.com",
	
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
						<td>search Earning Amount (Deduct)</td>
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

<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;/secure/search/addSearchEarning</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	
	
	"email": "prashant.bitstreet@gmail.com",
	
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
						<td>Search earning amount (Add)</td>
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
		
	</div>	

</body>