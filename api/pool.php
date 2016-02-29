
<body>
<?php
$selectedTab="Pool";
	include("header.php");
	
	?>
	<div style="text-align: center;padding-top: 2%;color: #25A2DC;"><h1>Pool API And Features</h1>
	</div>
<div id="accordion" style="width: 96%;float: left;padding: 2%;">
	<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;/secure/getPoolStats</h3>
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
							<th>No Parameters</th>
							<th>No Value</th>
							<th>No Description</th>
							<th>No Mandatory</th>
							<th>No Data type</th>
						</tr>
					</thead>					

					</table>
					
				</div>
			</div>
		</div>		

<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;/secure/addUnsoldKwdRefund</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	

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
					
					</table>
					
				</div>
			</div>
		</div>		

<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;/secure/deductSearchTradePayout</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	

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
					
					</table>
					
				</div>
			</div>
		</div>				
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;/secure/addSearchTradePayout</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	

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
						<td>amount</td>
						<td>10</td>
						<td>Search Trade Payout (Add)</td>
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
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;/secure/addAppPayout</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	

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
						<td>amount</td>
						<td>10</td>
						<td>App payout</td>
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
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;/secure/addAnonymousSearches</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	

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
					
					</table>
					
				</div>
			</div>
		</div>		
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;/secure/deductNoOfunQualifeidSearches</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	

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
					
					</table>
					
				</div>
			</div>
		</div>				
		
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;/secure/addNoOfunQualifeidSearches</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	

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
					
					</table>
					
				</div>
			</div>
		</div>				
		
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;/secure/deductNoOfQualifeidSearches</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	

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
					
					</table>
					
				</div>
			</div>
		</div>				
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;/secure/addNoOfQualifeidSearches</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	

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
					
					</table>
					
				</div>
			</div>
		</div>	

<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;/secure/deductTotalKeywordOwnerPayout</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	

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
					
					</table>
					
				</div>
			</div>
		</div>				
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;/secure/addTotalKeywordOwnerPayout</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	

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
					
					</table>
					
				</div>
			</div>
		</div>				
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;/secure/creditPoolAmountKeywords</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	

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
					
					</table>
					
				</div>
			</div>
		</div>				
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;/secure/deductPoolAmountKeywords</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	

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
					
					</table>
					
				</div>
			</div>
		</div>				
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;/secure/addTocashbackOutflow</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	

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
					
					</table>
					
				</div>
			</div>
		</div>				
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;/secure/deductcashbackOutflow</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	

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
					
					</table>
					
				</div>
			</div>
		</div>				
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;/secure/decreaseTotalFeesEarning</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	

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
					
					</table>
					
				</div>
			</div>
		</div>				
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;/secure/increaseTotalFeesEarning</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	

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
					
					</table>
					
				</div>
			</div>
		</div>				
		
<h3><i class="fa fa-arrow-right"></i> post &nbsp;&nbsp;&nbsp;&nbsp;/secure/addToaffiliateOutflow</h3>
		<div>
			<div>
				<div class="codearea">
					<div class="codearea2">
<pre>
<code>						
	{	

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
					
					</table>
					
				</div>
			</div>
		</div>				
		
		
</div>