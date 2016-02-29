
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="shortcut icon" href="https://www.searchtrade.com/wp-content/uploads/2015/09/searchtrade-icon.png" type="image/x-icon" />	
<title>STwallet -API-</title>	



<link rel="stylesheet" href="style2.css">	
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
<link rel="stylesheet" href="API.css">
<link href="http://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic,700italic" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">	


<div class="topheader">
	<div class="mainheader">
		<div class="mainfield">
			<a href=""><img src="wallet.jpg" alt="STwallet"></a>
		</div>	
		<div class="container3" style="float: right;">				
			<div  class="fields <?php if($selectedTab=="User Interface") {?> field1 <?php } ?>"><a href="API.php"><i class="fa fa-bars"></i> User Interface</a></div>							
					
			<div class="fields <?php if($selectedTab=="Admin") {?> field1 <?php } ?>"><a href="admin.php"><i class="fa fa-bars"></i> Admin</a></div>
					
			<div class="fields <?php if($selectedTab=="Transaction") {?> field1 <?php } ?>"><a href="Transaction.php"><i class="fa fa-bars"></i> Transaction</a></div>
					
			<div class="fields <?php if($selectedTab=="Pool") {?> field1 <?php } ?>"><a href="Pool.php"><i class="fa fa-bars"></i> Pool</a></div>

			<div class="fields <?php if($selectedTab=="Global") {?> field1 <?php } ?>"><a href="Global.php"><i class="fa fa-bars"></i> Global</a></div>

		</div>
	</div>		
</div>

	<script src="API.js"></script>
	<script src="API2.js"></script>		
	<script>
	$(function() {
		$( "#accordion" ).accordion();
	});
	</script>



